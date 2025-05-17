import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Modal, Button } from "react-bootstrap";
import LiqPayButton from "../components/Payment/LiqPayButton";

const BuyCourseButton = ({ courseId, courseName }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  // Generate unique order ID
  const generateOrderId = () => {
    return `order_${courseId}_${user.id}_${Date.now()}`;
  };

  return (
    <div>
      {user?.paidCourses?.includes(courseId) ? (
        <button className="btn btn-primary rounded mb-3 me-2" disabled>
          Уже куплено
        </button>
      ) : (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary px-4 py-2 mb-2 me-2 rounded"
          >
            Купить курс
          </button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Подтверждение покупки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-center mb-4">
                Вы уверены, что хотите купить курс{" "}
                <strong>{courseName || "выбранный курс"}</strong>?
              </p>
              <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
                <LiqPayButton
                  amount={4000}
                  description="Покупка онлайн курсу з перманентного макіяжу"
                  orderId={generateOrderId()}
                  courseId={courseId}
                  userId={user.id}
                />
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline-danger"
                  className="mb-2 px-4 rounded"
                >
                  Отмена
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default BuyCourseButton;
