import { useState } from "react";
import { useFormik } from "formik";
import "./login-register-forms.css";
import Input from "../common/inputs/input";
import InputPassword from "../common/inputs/inputPassword";
import { validateSignUp } from "../../helpers/userValidation";
import { useAuth } from "../../context/authContext";

function RegisterForm({ switchToLogin }) {
  const { createUser } = useAuth();
  const [apiError, setApiError] = useState("");

  const errorMessages = {
    "This email is already registered.":
      "משתמש עם כתובת אימייל זו כבר קיים במערכת",
    "Request body is missing.": "הבקשה ריקה",
    "Invalide email.": "האימייל לא תקין",
    "Invalide password.": "הסיסמה לא תקינה",
  };

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "",
    },
    validate: (values) => {
      const schema = validateSignUp;

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
      const { confirmPassword, ...userData } = values;
      setApiError("");
      try {
        await createUser(userData);
      } catch (err) {
        const backendMessage = err.response?.data || "אירעה שגיאה בהרשמה";
        const message = errorMessages[backendMessage] || "אירעה שגיאה בהרשמה";
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

      {apiError && <div className="server-error">{apiError}</div>}

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
