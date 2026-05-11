import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "./edit-user.css";
import Input from "../../components/common/Inputs/Input";
import InputPassword from "../../components/common/Inputs/InputPassword";
import FormButtons from "../../components/common/FormButtons/FormButtons";
import { useAuth } from "../../context/AuthContext";
import { validateUpdate } from "../../helpers/userValidation";
import { useNavigate, useParams } from "react-router";
import NotFound from "../../components/common/NotFound/NotFound";
import LoadingState from "../../components/common/LoadingState/LoadingState";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, updateUser, updateUserById, getUserById } = useAuth();

  const [apiError, setApiError] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [status, setStatus] = useState("loading");

  const userIdToLoad = id ?? user?._id;
  const isSelfEdit = !id && user?._id === userIdToLoad;

  useEffect(() => {
    if (!userIdToLoad) return;

    async function fetchUser() {
      setStatus("loading");

      try {
        const fullUser = await getUserById(userIdToLoad);

        if (!fullUser || !fullUser._id) {
          setStatus("not-found");
          return;
        }

        setUserDetails(fullUser);
        setStatus("success");
      } catch (err) {
        const statusCode = err.response?.status;

        if (statusCode === 400) setStatus("invalid");
        else if (statusCode === 404) setStatus("not-found");
        else if (statusCode === 403) setStatus("forbidden");
        else setStatus("error");
      }
    }

    fetchUser();
  }, [userIdToLoad, getUserById]);

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

        if (id) {
          await updateUserById(userIdToLoad, payload);
        } else {
          await updateUser(payload);
        }

        navigate(id ? `/users/${userIdToLoad}` : "/details-user");
      } catch (err) {
        const backendMessage =
          err.response?.data || "אירעה שגיאה בעדכון המשתמש";

        setApiError(backendMessage);
      }
    },
  });

  if (status === "loading") return <LoadingState text="טוען פרטי משתמש..." />;

  if (status === "invalid")
    return <NotFound message="לא ניתן למצוא את המשתמש המבוקש" />;

  if (status === "not-found") return <NotFound message="משתמש לא קיים" />;

  if (status === "forbidden")
    return <NotFound message="אין לך הרשאה לגשת לפרטי המשתמש הזה" />;

  if (status === "error") return <NotFound message="שגיאה בטעינת משתמש" />;

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <h2 className="form-title">
        {isSelfEdit ? "עריכת הפרופיל שלי" : "עריכת משתמש"}
      </h2>

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

      {isSelfEdit && (
        <>
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
        </>
      )}

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
