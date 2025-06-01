import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useLanguage } from "../context/useLanguage";
import { authModalData } from "../components/data/authModalData";
import RemoveCourseButton from "../components/RemoveCourseButton";
const API_BASE = import.meta.env.VITE_API_BASE;

function Profile() {
  const { language } = useLanguage();
  const { common, profile, registerData } =
    authModalData[language] || authModalData.ua;

  const { user, authFetch, refreshUserData } = useAuth();
  const [profileData, setProfileData] = useState(user);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await authFetch(`${API_BASE}/api/users/profile`, {
        method: "POST",
        body: JSON.stringify(profileData),
      });
      if (res.success) {
        await refreshUserData(); // обновим данные в контексте
        setEditing(false);
      } else {
        setError(res.message || "Ошибка при сохранении данных");
      }
    } catch (err) {
      setError(err.message || "Ошибка при сохранении");
    }
  };

  if (!user)
    return <div className="text-center">Загрузка данных профиля...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mb-4">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">{profile.header}</h3>
        </div>
        <div className="card-body bg-ligth">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row mb-4">
            <div className="col-md-6 px-5 py-2">
              <h5>{registerData.nameInput}:</h5>
              <input
                type="text"
                disabled
                className="w-full border p-1 rounded text-dark"
                value={user.name || ""}
              />
            </div>
            <div className="col-md-6 px-5 py-2">
              <h5>{registerData.surnameInput}:</h5>
              <input
                type="text"
                disabled
                className="w-full border p-1 rounded text-dark"
                value={user.surname || ""}
              />
            </div>
            <div className="col-md-6 px-5 py-2">
              <h5>{common.emailInput}:</h5>
              <input
                type="email"
                disabled
                className="w-full border p-1 rounded text-dark"
                value={user.email || ""}
              />
            </div>
            <div className="col-md-6 px-5 py-2">
              <h5>{registerData.phoneInput}:</h5>
              <input
                type="text"
                name="phone"
                disabled={!editing}
                className={`w-full border p-1 rounded text-dark ${
                  editing ? "border-primary" : ""
                }`}
                value={profileData.phone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 px-5 py-2">
              <h5>{registerData.cityInput}:</h5>
              <input
                type="text"
                name="city"
                disabled={!editing}
                className={`w-full border p-1 rounded text-dark ${
                  editing ? "border-primary" : ""
                }`}
                value={profileData.city || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 px-5 py-2">
              <h5>{registerData.countryInput}:</h5>
              <input
                type="text"
                name="country"
                disabled={!editing}
                className={`w-full border p-1 rounded text-dark ${
                  editing ? "border-primary" : ""
                }`}
                value={profileData.country || ""}
                onChange={handleChange}
              />
            </div>
            {user?.paidCourses?.length > 0 && (
              <div className="col-12 px-5 py-2">
                <h5>My Courses:</h5>
                {user.paidCourses?.includes("brows") && (
                  <>
                    <button
                      className="btn btn-primary rounded mb-2 me-1"
                      disabled
                    >
                      BROWS
                    </button>
                    <RemoveCourseButton courseId="brows" />
                  </>
                )}
                {user.paidCourses?.includes("lips") && (
                  <>
                    <button
                      className="btn btn-primary rounded mb-2 me-1"
                      disabled
                    >
                      LIPS
                    </button>
                    <RemoveCourseButton courseId="lips" />
                  </>
                )}
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end px-5">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn btn-success rounded me-2"
                >
                  {profile.saveBtn}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="btn btn-danger rounded me-2"
                >
                  {profile.cancelBtn}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary rounded me-2"
              >
                {profile.editBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
