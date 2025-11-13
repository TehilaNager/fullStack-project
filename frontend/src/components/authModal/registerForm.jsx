import { useFormik } from "formik";
import Input from "../common/inputs/input";
import InputPassword from "../common/inputs/inputPassword";
import "./loginRegisterForms.css";

function RegisterForm({ switchToLogin }) {
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      console.log("Register data:", values);
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

      <Input
        placeholder="שם מלא"
        fieldProps={getFieldProps("fullName")}
        error={touched.fullName && errors.fullName}
      />

      <Input
        type="email"
        placeholder="אימייל"
        fieldProps={getFieldProps("email")}
        error={touched.email && errors.email}
      />

      <InputPassword
        placeholder="סיסמה"
        fieldProps={getFieldProps("password")}
        error={touched.password && errors.password}
      />

      <InputPassword
        placeholder="אימות סיסמה"
        fieldProps={getFieldProps("confirmPassword")}
        error={touched.confirmPassword && errors.confirmPassword}
      />

      <Input
        type="text"
        placeholder="טלפון"
        fieldProps={getFieldProps("phone")}
        error={touched.phone && errors.phone}
      />

      <Input
        type="text"
        placeholder="עיר מגורים"
        fieldProps={getFieldProps("city")}
        error={touched.city && errors.city}
      />

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
