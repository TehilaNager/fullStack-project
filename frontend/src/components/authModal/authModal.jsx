import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./auth-modal.css";

function AuthModal({ closeModal }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>

        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            התחברות
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            הרשמה
          </button>
        </div>

        <div className="auth-content">
          {activeTab === "login" ? (
            <LoginForm switchToRegister={() => setActiveTab("register")} />
          ) : (
            <RegisterForm switchToLogin={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
