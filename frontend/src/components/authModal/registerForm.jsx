import "./loginRegisterForms.css";

function RegisterForm({ switchToLogin }) {
  return (
    <div className="form">
      <h2 className="form-title">צור חשבון חדש</h2>

      <div className="form-group">
        <input type="text" placeholder="שם מלא" />
      </div>
      <div className="form-group">
        <input type="email" placeholder="אימייל" />
      </div>
      <div className="form-group">
        <input type="password" placeholder="סיסמה" />
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
    </div>
  );
}

export default RegisterForm;
