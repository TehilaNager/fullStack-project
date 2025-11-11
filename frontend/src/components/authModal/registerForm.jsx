import { useState } from "react";
import "./loginRegisterForms.css";

function RegisterForm({ switchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="form">
      <h2 className="form-title">צור חשבון חדש</h2>

      <div className="form-group">
        <input type="text" placeholder="שם מלא" />
      </div>
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

      <div className="form-group password-group">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="אימות סיסמה"
        />
        <i
          className={`bi ${showConfirmPassword ? "bi-eye" : "bi-eye-slash"}`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        ></i>
      </div>

      <div className="form-group">
        <input type="text" placeholder="טלפון" />
      </div>
      <div className="form-group">
        <input type="text" placeholder="עיר מגורים" />
      </div>

      <button className="submit-btn register">הרשמה</button>

      <div className="no-account">
        כבר יש לך חשבון?{" "}
        <span className="link-text" onClick={switchToLogin}>
          התחבר כאן
        </span>
      </div>
    </form>
  );
}

export default RegisterForm;
