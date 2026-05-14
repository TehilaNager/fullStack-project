import { useFormik } from "formik";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import "./sign-in.css";
import Input from "../../components/common/Inputs/Input/Input";
import InputPassword from "../../components/common/Inputs/InputPassword/InputPassword";
import { validateSignIn } from "../../helpers/userValidation";
import { useAuth } from "../../context/AuthContext";
import FormButtons from "../../components/common/FormButtons/FormButtons";
import Swal from "sweetalert2";
import { useMessage } from "../../context/MessageContext";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { login } = useAuth();
  const [apiError, setApiError] = useState("");

  const { openThread } = useMessage();

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
          const loggedUser = await login(values);
          const chatState = location.state || {};

          if (chatState?.openChatAfterLogin) {
            const isOwnItem = loggedUser?._id === chatState.participantId;

            if (isOwnItem) {
              const itemLabel =
                chatState.relatedType === "SupportRequest" ? "הבקשה" : "התרומה";

              await Swal.fire({
                icon: "info",
                title: `זאת ${itemLabel} שלך 🙂`,
                text: "אי אפשר לפתוח צ'אט עם עצמך",
                confirmButtonText: "הבנתי",
              });

              navigate(chatState.from || "/", { replace: true });
              return;
            }

            const thread = await openThread({
              relatedType: chatState.relatedType,
              relatedId: chatState.relatedId,
              participants: [chatState.participantId],
            });

            navigate(`/messages/${thread._id}`, { replace: true });
            return;
          }
          navigate(from, { replace: true });
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
