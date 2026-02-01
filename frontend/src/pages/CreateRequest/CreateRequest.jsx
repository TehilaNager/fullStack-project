import "./create-request.css";
import { useFormik } from "formik";
import FormButtons from "../../components/common/FormButtons/FormButtons";
import requestSchema from "../../helpers/requestValidation";
import { useRequest } from "../../context/requestContext";
import { useNavigate } from "react-router";
import FormField from "../../components/common/FormField/FormField";

function CreateRequest() {
  const navigate = useNavigate();
  const { createRequest } = useRequest();
  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    values,
    isValid,
    resetForm,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      description: "",
      category: "",
      requiredQuantity: "",
      region: "",
      city: "",
      priority: "",
      deadline: "",
      contactMethod: "",
      contactPhone: "",
      contactEmail: "",
    },
    validationSchema: requestSchema,
    onSubmit: async (values) => {
      try {
        await createRequest(values);
        resetForm();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="create-request-page">
      <h1 className="create-request-title">צור בקשה חדשה</h1>

      <form className="create-request-form" onSubmit={handleSubmit}>
        <FormField
          label="כותרת"
          name="title"
          placeholder="למשל: נעלי הליכה מידה 43"
          touched={touched}
          errors={errors}
          values={values}
          getFieldProps={getFieldProps}
          required={true}
        />

        <FormField
          label="תיאור"
          name="description"
          as="textarea"
          placeholder="למשל: אני זקוק לנעלי הליכה מידה 43, נוחות ועמידות לשימוש יומיומי, צבע כהה מועדף. תודה!"
          touched={touched}
          errors={errors}
          values={values}
          getFieldProps={getFieldProps}
          required={true}
        />

        <div className="form-row">
          <FormField
            label="קטגוריה"
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
            required={true}
          />

          <FormField
            label="מספר האנשים הזקוקים לעזרה (לא חובה)"
            name="requiredQuantity"
            type="number"
            placeholder="הכנס מספר"
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
            required={false}
          />
        </div>

        <div className="form-row">
          <FormField
            label="אזור"
            name="region"
            as="select"
            placeholder="בחר אזור"
            options={["צפון", "מרכז", "דרום"]}
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
            required={true}
          />

          <FormField
            label="עיר"
            name="city"
            placeholder="למשל: עפולה"
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
            required={true}
          />
        </div>

        <div className="form-row">
          <FormField
            label="דחיפות"
            name="priority"
            placeholder="בחר דחיפות"
            as="select"
            options={["נמוכה", "בינונית", "גבוהה", "דחופה"]}
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
            required={true}
          />

          <FormField
            label="תאריך אחרון (שדה חובה לבקשות דחופות)"
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
            { value: "site", label: "דרך מערכת ההודעות בלבד" },
            {
              value: "details",
              label: "השאר טלפון, אימייל, או את שניהם (בנוסף למערכת ההודעות)",
            },
          ]}
          touched={touched}
          errors={errors}
          values={values}
          getFieldProps={getFieldProps}
          required={true}
        />

        {values.contactMethod === "details" && (
          <div className="form-row">
            {/* contactPhone */}
            {/* <div className="form-group">
              <label className="form-label">טלפון (לא חובה):</label>
              <input
                {...getFieldProps("contactPhone")}
                className="form-input"
                type="tel"
                placeholder="למשל: 0501234567"
              />

              {touched.contactPhone && errors.contactPhone && (
                <div className="error-text">{errors.contactPhone}</div>
              )}
            </div> */}
            <FormField
              label="טלפון (לא חובה):"
              name="contactPhone"
              type="tel"
              placeholder="למשל: 0501234567"
              touched={touched}
              errors={errors}
              values={values}
              getFieldProps={getFieldProps}
            />

            {/* contactEmail */}
            {/* <div className="form-group">
              <label className="form-label">אימייל (לא חובה):</label>
              <input
                {...getFieldProps("contactEmail")}
                className="form-input"
                type="email"
                placeholder="למשל: example@mail.com"
              />

              {touched.contactEmail && errors.contactEmail && (
                <div className="error-text">{errors.contactEmail}</div>
              )}
            </div> */}

            <FormField
              label="אימייל (לא חובה):"
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
          textBtn="שלח"
          disabled={!isValid}
          onReset={resetForm}
          aria-disabled={!isValid}
        />
      </form>
    </div>
  );
}

export default CreateRequest;
