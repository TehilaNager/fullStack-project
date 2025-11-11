import { useState } from "react";
import "./loginRegisterForms.css";

function LoginForm({ switchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="form">
      <h2 className="form-title">ברוך הבא</h2>

      <div className="form-group">
        <input type="email" placeholder="אימייל" />
      </div>

      <div className="form-group password-group">
        <input type={showPassword ? "text" : "password"} placeholder="סיסמה" />
        <i
          className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>

      <div className="forgot">שכחתי סיסמה</div>
      <button className="submit-btn">התחבר</button>

      <div className="no-account">
        אין לך חשבון עדיין?{" "}
        <span className="link-text" onClick={switchToRegister}>
          הירשם עכשיו
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
