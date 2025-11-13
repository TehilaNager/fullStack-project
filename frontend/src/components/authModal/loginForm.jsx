import { useFormik } from "formik";
import Input from "../common/inputs/input";
import InputPassword from "../common/inputs/inputPassword";
import "./loginRegisterForms.css";

function LoginForm({ switchToRegister }) {
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Login data:", values);
    },
  });

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <h2 className="form-title">ברוך הבא</h2>

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

      <div className="forgot">שכחתי סיסמה</div>

      <button type="submit" className="submit-btn">
        התחבר
      </button>

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
