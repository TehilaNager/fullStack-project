import { useFormik } from "formik";
import { useState } from "react";
import "./loginRegisterForms.css";
import Input from "../common/inputs/input";
import InputPassword from "../common/inputs/inputPassword";
import { validateSignIn } from "../../helpers/userValidation";
import { useAuth } from "../../context/authContext";

function LoginForm({ switchToRegister }) {
  const { login } = useAuth();
  const [apiError, setApiError] = useState("");

  const errorMessages = {
    "Request body is missing.": "לא נשלחו פרטי התחברות. אנא נסה שוב.",
    "Invalide email.": "כתובת האימייל או הסיסמה שגויים",
    "Invalide password.": "כתובת האימייל או הסיסמה שגויים",
  };

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const schema = validateSignIn;
      const { error } = schema.validate(values, { abortEarly: false });

      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setApiError("");

      try {
        await login(values);
        console.log("login success");
      } catch (err) {
        const backendMessage = err.response?.data || "אירעה שגיאה בהתחברות";
        const message = errorMessages[backendMessage] || "אירעה שגיאה בהתחברות";
        setApiError(message);
      }
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

      {apiError && <div className="server-error">{apiError}</div>}

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
