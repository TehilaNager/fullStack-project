import "./loginRegisterForms.css";

function LoginForm({ switchToRegister }) {
  return (
    <div className="form">
      <h2 className="form-title">ברוך הבא</h2>

      <div className="form-group">
        <input type="email" placeholder="אימייל" />
      </div>
      <div className="form-group">
        <input type="password" placeholder="סיסמה" />
      </div>

      <div className="forgot">שכחתי סיסמה</div>
      <button className="submit-btn">התחבר</button>

      <div className="no-account">
        אין לך חשבון עדיין?{" "}
        <span className="link-text" onClick={switchToRegister}>
          הירשם עכשיו
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
