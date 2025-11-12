import { useState } from "react";
import { useFormik } from "formik";
import "./loginRegisterForms.css";

function RegisterForm({ switchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      console.log("Form data:", values);
    },
  });

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <h2 className="form-title">צור חשבון חדש</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="שם מלא"
          {...getFieldProps("fullName")}
        />
      </div>
      <div className="form-group">
        <input type="email" placeholder="אימייל" {...getFieldProps("email")} />
      </div>

      <div className="form-group password-group">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="סיסמה"
          {...getFieldProps("password")}
          autoComplete="new-password"
        />
        <i
          className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>

      <div className="form-group password-group">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="אימות סיסמה"
          {...getFieldProps("confirmPassword")}
          autoComplete="new-password"
        />
        <i
          className={`bi ${showConfirmPassword ? "bi-eye" : "bi-eye-slash"}`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        ></i>
      </div>

      <div className="form-group">
        <input type="text" placeholder="טלפון" {...getFieldProps("phone")} />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="עיר מגורים"
          {...getFieldProps("city")}
        />
      </div>

      <button type="submit" className="submit-btn register">
        הרשמה
      </button>

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
