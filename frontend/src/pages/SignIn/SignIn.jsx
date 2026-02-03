import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./sign-in.css";
import Input from "../../components/common/Inputs/Input";
import InputPassword from "../../components/common/Inputs/InputPassword";
import { validateSignIn } from "../../helpers/userValidation";
import { useAuth } from "../../context/AuthContext";
import FormButtons from "../../components/common/FormButtons/FormButtons";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [apiError, setApiError] = useState("");

  const errorMessages = {
    "Request body is missing.": "לא נשלחו פרטי התחברות. אנא נסה שוב.",
    "Invalide email.": "כתובת האימייל או הסיסמה שגויים",
    "Invalide password.": "כתובת האימייל או הסיסמה שגויים",
  };

  const { handleSubmit, getFieldProps, errors, touched, isValid, resetForm } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: (values) => {
        const schema = validateSignIn;
        const { error } = schema.validate(values, { abortEarly: false });

        if (!error) {
          return {};
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
          navigate("/");
        } catch (err) {
          const backendMessage = err.response?.data || "אירעה שגיאה בהתחברות";
          const message =
            errorMessages[backendMessage] || "אירעה שגיאה בהתחברות";
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

      {apiError && <div className="server-error">{apiError}</div>}

      <FormButtons textBtn="התחבר" disabled={!isValid} onReset={resetForm} />

      <div className="no-account">
        אין לך חשבון עדיין?{" "}
        <Link className="link-text" to="/sign-up">
          הירשם עכשיו
        </Link>
      </div>
    </form>
  );
}

export default SignIn;
