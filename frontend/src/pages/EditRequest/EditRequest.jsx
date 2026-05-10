import "./edit-request.css";
import { useNavigate, useParams } from "react-router";
import { useRequest } from "../../context/RequestContext";
import { useFormik } from "formik";
import updateRequestSchema from "../../helpers/updateRequestValidation";
import FormButtons from "../../components/common/FormButtons/FormButtons";
import FormField from "../../components/common/FormField/FormField";

function EditRequest() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { requests, updateRequest } = useRequest();

  const request = requests.find((r) => r._id === id);
  const safeRequest = request || {};

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    values,
    isValid,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      title: safeRequest.title || "",
      description: safeRequest.description || "",
      category: safeRequest.category || "",
      requiredQuantity:
        safeRequest.requiredQuantity != null
          ? String(safeRequest.requiredQuantity)
          : "",
      region: safeRequest.region || "",
      city: safeRequest.city || "",
      priority: safeRequest.priority || "",
      deadline: safeRequest.deadline ? safeRequest.deadline.split("T")[0] : "",
      contactMethod: safeRequest.contactMethod || "",
      contactPhone: safeRequest.contactPhone || "",
      contactEmail: safeRequest.contactEmail || "",
    },
    validationSchema: updateRequestSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          requiredQuantity:
            values.requiredQuantity === ""
              ? null
              : Number(values.requiredQuantity),
          deadline: values.deadline || null,
          contactPhone: values.contactPhone === "" ? null : values.contactPhone,
          contactEmail: values.contactEmail === "" ? null : values.contactEmail,
        };

        await updateRequest(id, payload);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (!requests.length) {
    return <div className="request-loading">טוען נתונים...</div>;
  }

  if (!request) {
    return <div className="request-loading">בקשה לא נמצאה</div>;
  }

  return (
    <div className="edit-request-page">
      <h1 className="edit-request-title">עריכת בקשה</h1>

      <form className="edit-request-form" onSubmit={handleSubmit}>
        <FormField
          label="כותרת:"
          name="title"
          placeholder="למשל: נעלי הליכה מידה 43"
          touched={touched}
          errors={errors}
          values={values}
          getFieldProps={getFieldProps}
        />

        <FormField
          label="תיאור:"
          name="description"
          as="textarea"
          placeholder="למשל: אני זקוק לנעלי הליכה מידה 43, נוחות ועמידות לשימוש יומיומי, צבע כהה מועדף. תודה!"
          touched={touched}
          errors={errors}
          values={values}
          getFieldProps={getFieldProps}
        />

        <div className="form-row">
          <FormField
            label="קטגוריה:"
            name="category"
            as="select"
            placeholder="בחר קטגוריה"
            options={[
              "ציוד צבאי",
              "ביגוד",
              "מזון",
              "תחבורה",
              "ציוד אלקטרוני",
              "ספרים וחומרי לימוד",
              "ציוד רפואי",
              "תמיכה נפשית וחברתית",
              "אחר",
            ]}
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
          />

          <FormField
            label="מספר האנשים הזקוקים לעזרה:"
            name="requiredQuantity"
            type="number"
            placeholder="הכנס מספר"
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
          />
        </div>

        <div className="form-row">
          <FormField
            label="אזור:"
            name="region"
            as="select"
            placeholder="בחר אזור"
            options={["צפון", "מרכז", "דרום"]}
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
          />

          <FormField
            label="עיר:"
            name="city"
            placeholder="למשל: עפולה"
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
          />
        </div>

        <div className="form-row">
          <FormField
            label="דחיפות:"
            name="priority"
            placeholder="בחר דחיפות"
            as="select"
            options={["נמוכה", "בינונית", "גבוהה", "דחופה"]}
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
          />

          <FormField
            label="תאריך אחרון (שדה חובה לבקשות דחופות):"
            name="deadline"
            type="date"
            placeholder=""
            as="input"
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
            required={values.priority === "דחופה"}
          >
            <small style={{ color: "#666" }}>
              הבקשה לא תוצג לאחר תאריך זה.
            </small>
          </FormField>
        </div>

        <FormField
          label="דרך יצירת קשר מועדפת:"
          name="contactMethod"
          as="select"
          placeholder="בחר"
          options={[
            { value: "site", label: "דרך מערכת ההודעות של האתר בלבד" },
            {
              value: "details",
              label: "השאר טלפון, אימייל, או את שניהם (בנוסף למערכת ההודעות)",
            },
          ]}
          touched={touched}
          errors={errors}
          values={values}
          getFieldProps={getFieldProps}
        />

        {values.contactMethod === "details" && (
          <div className="form-row">
            <FormField
              label="טלפון:"
              name="contactPhone"
              type="tel"
              placeholder="למשל: 0501234567"
              touched={touched}
              errors={errors}
              values={values}
              getFieldProps={getFieldProps}
            />

            <FormField
              label="אימייל:"
              name="contactEmail"
              type="email"
              placeholder="למשל: example@mail.com"
              touched={touched}
              errors={errors}
              values={values}
              getFieldProps={getFieldProps}
            />
          </div>
        )}

        <FormButtons
          textBtn="עדכן"
          disabled={!isValid}
          onReset={resetForm}
          aria-disabled={!isValid}
        />
      </form>
    </div>
  );
}

export default EditRequest;
