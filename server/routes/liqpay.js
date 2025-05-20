const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/User");

const PUBLIC_KEY = "sandbox_i16331467522";
const PRIVATE_KEY = "sandbox_J5iejbYvC24yejq31JmCZhEVyzVdG034YQ0XHDNd";

function generateDataAndSignature(params) {
  const jsonString = JSON.stringify(params);
  const data = Buffer.from(jsonString).toString("base64");
  const signature = crypto
    .createHash("sha1")
    .update(PRIVATE_KEY + data + PRIVATE_KEY)
    .digest("base64");

  return { data, signature };
}

// Генерация HTML формы
router.post("/create-payment", (req, res) => {
  const { amount, description, orderId, courseId, userId } = req.body;
  console.log("userId:", userId);

  const params = {
    public_key: PUBLIC_KEY,
    action: "pay",
    amount,
    currency: "UAH",
    description,
    order_id: orderId,
    version: "3",
    sandbox: 1,
    result_url: `http://localhost:5173/courses/${courseId}`,
    server_url: "https://7602-79-132-4-62.ngrok-free.app/api/liqpay/callback",
  };

  const { data, signature } = generateDataAndSignature(params);

  const html = `
    <form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
      <input type="hidden" name="data" value="${data}" />
      <input type="hidden" name="signature" value="${signature}" />
      <input type="image" src="//static.liqpay.ua/buttons/p1ru.radius.png" />
    </form>
  `;

  res.send({ html });
});

// Обработка колбэка от LiqPay
router.post("/callback", async (req, res) => {
  console.log("CALLBACK RECEIVED");

  const { data, signature } = req.body;

  const expectedSignature = crypto
    .createHash("sha1")
    .update(PRIVATE_KEY + data + PRIVATE_KEY)
    .digest("base64");

  if (signature !== expectedSignature) {
    return res.status(400).send("Invalid signature");
  }

  const paymentData = JSON.parse(Buffer.from(data, "base64").toString("utf8"));

  console.log("Оплата подтверждена:", paymentData);

  if (paymentData.status === "success" || paymentData.status === "sandbox") {
    const [_, courseId, userId] = paymentData.order_id.split('_');

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { paidCourses: courseId } },
        { new: true }
      );

      if (!updatedUser) {
        console.error("Пользователь не найден");
        return res.status(404).send("User not found");
      }

      console.log("Курс добавлен пользователю:", updatedUser.email);
      return res.status(200).send("OK");
    } catch (err) {
      console.error("Ошибка при добавлении курса:", err);
      return res.status(500).send("Internal Server Error");
    }
  }

  res.status(200).send("OK");
});

module.exports = router;
