import "./create-offer.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useOffer } from "../../context/OfferContext";
import FormField from "../../components/common/FormField/FormField";
import FormButtons from "../../components/common/FormButtons/FormButtons";
import offerSchema from "../../helpers/offerValidation";

function CreateOffer() {
  const navigate = useNavigate();
  const { createOffer } = useOffer();
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
      region: "",
      city: "",
      availableQuantity: "",
      availableUntil: "",
      contactMethod: "",
      contactPhone: "",
      contactEmail: "",
    },
    validationSchema: offerSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          availableQuantity:
            values.availableQuantity === "" ||
            isNaN(Number(values.availableQuantity))
              ? undefined
              : Number(values.availableQuantity),
          availableUntil: values.availableUntil || undefined,
          contactPhone: values.contactPhone || undefined,
          contactEmail: values.contactEmail || undefined,
        };

        await createOffer(payload);
        resetForm();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="create-offer-page">
      <h1 className="create-offer-title">צור תרומה חדשה</h1>

      <form className="create-offer-form" onSubmit={handleSubmit}>
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
          placeholder="למשל: אני מציע נעלי הליכה מידה 43, נוחות ועמידות לשימוש יומיומי, צבע כהה מועדף. תודה!"
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
            label="כמות זמינה (לא חובה)"
            name="availableQuantity"
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
            label="זמין עד (תאריך אופציונלי)"
            name="availableUntil"
            type="date"
            placeholder=""
            as="input"
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
          >
            <small style={{ color: "#666" }}>
              התרומה לא תוצג לאחר תאריך זה.
            </small>
          </FormField>

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
            required={true}
          />
        </div>

        {values.contactMethod === "details" && (
          <div className="form-row">
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

export default CreateOffer;
