import { useState } from "react";
import "./authModal.css";
import AuthModalImg from "../../images/authModalImg.png";
import AuthModalMobileImg from "../../images/AuthModalMobileImg.png";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";

function AuthModal({ closeModal }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          <i className="bi bi-x-circle-fill"></i>
        </span>

        <div className="body-modal">
          <div className="modal-image">
            <picture>
              <source media="(max-width: 900px)" srcSet={AuthModalMobileImg} />
              <img src={AuthModalImg} alt="Support" />
            </picture>
            <div className="image-caption">
              נרשמים, מבקשים, תורמים — <br />
              יחד עושים את ההבדל!
            </div>
          </div>

          <div className="modal-tabs">
            <div className="tab-buttons">
              <button
                className={activeTab === "register" ? "active" : ""}
                onClick={() => setActiveTab("register")}
              >
                הרשמה
              </button>
              <button
                className={activeTab === "login" ? "active" : ""}
                onClick={() => setActiveTab("login")}
              >
                התחברות
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "login" && <LoginForm />}
              {activeTab === "register" && <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
