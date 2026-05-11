import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "./edit-user.css";
import Input from "../../components/common/Inputs/Input";
import InputPassword from "../../components/common/Inputs/InputPassword";
import FormButtons from "../../components/common/FormButtons/FormButtons";
import { useAuth } from "../../context/AuthContext";
import { validateUpdate } from "../../helpers/userValidation";
import { useNavigate } from "react-router";

function EditUser() {
  const navigate = useNavigate();
  const { user, updateUser, getUserById } = useAuth();

  const [apiError, setApiError] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const fullUser = await getUserById(user._id);
        setUserDetails(fullUser);
      } catch (err) {
        console.error(err);
      }
    }

    if (user?._id) {
      fetchUser();
    }
  }, [user?._id]);

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    isValid,
    dirty,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      fullName: userDetails?.fullName || "",
      email: userDetails?.email || "",
      password: "",
      confirmPassword: "",
      phone: userDetails?.phone || "",
      city: userDetails?.city || "",
    },
    validate: (values) => {
      const { error } = validateUpdate.validate(values, {
        abortEarly: false,
      });

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
        const payload = { ...values };

        if (!payload.password) {
          delete payload.password;
        }

        delete payload.confirmPassword;

        const updatedUser = await updateUser(payload);
        navigate(`/details-user/${updatedUser._id}`);
      } catch (err) {
        const backendMessage =
          err.response?.data || "אירעה שגיאה בעדכון המשתמש";

        setApiError(backendMessage);
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
      <h2 className="form-title">עריכת פרטי משתמש</h2>

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
        placeholder="סיסמה חדשה (לא חובה)"
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

      <FormButtons
        textBtn="עדכן פרטים"
        disabled={!dirty || !isValid}
        onReset={resetForm}
      />
    </form>
  );
}

export default EditUser;
