import "./edit-offer.css";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { useOffer } from "../../context/OfferContext";
import FormField from "../../components/common/FormField/FormField";
import FormButtons from "../../components/common/FormButtons/FormButtons";
import offerSchema from "../../helpers/offerValidation";

function EditOffer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { offers, updateOffer } = useOffer();

  const offer = offers.find((o) => o._id === id);
  const safeOffer = offer || {};

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
      title: safeOffer.title || "",
      description: safeOffer.description || "",
      category: safeOffer.category || "",
      region: safeOffer.region || "",
      city: safeOffer.city || "",
      availableQuantity:
        safeOffer.availableQuantity !== undefined
          ? String(safeOffer.availableQuantity)
          : "",
      availableUntil: safeOffer.availableUntil
        ? safeOffer.availableUntil.split("T")[0]
        : "",
      contactMethod: safeOffer.contactMethod || "",
      contactPhone: safeOffer.contactPhone || "",
      contactEmail: safeOffer.contactEmail || "",
    },
    validationSchema: offerSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          availableQuantity:
            values.availableQuantity === "" ||
            isNaN(Number(values.availableQuantity))
              ? null
              : Number(values.availableQuantity),

          availableUntil:
            values.availableUntil === "" ? null : values.availableUntil,
          contactPhone: values.contactPhone === "" ? null : values.contactPhone,
          contactEmail: values.contactEmail === "" ? null : values.contactEmail,
        };

        await updateOffer(id, payload);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (!offers.length) {
    return <div className="offer-loading">טוען נתונים...</div>;
  }

  if (!offer) {
    return <div className="offer-loading">תרומה לא נמצאה</div>;
  }

  return (
    <div className="edit-offer-page">
      <h1 className="edit-offer-title">עריכת תרומה</h1>

      <form className="edit-offer-form" onSubmit={handleSubmit}>
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
          placeholder="למשל: אני מציע נעלי הליכה..."
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
            label="כמות זמינה:"
            name="availableQuantity"
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
            label="זמין עד:"
            name="availableUntil"
            type="date"
            as="input"
            touched={touched}
            errors={errors}
            values={values}
            getFieldProps={getFieldProps}
          />

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
        </div>

        {values.contactMethod === "details" && (
          <div className="form-row">
            <FormField
              label="טלפון (לא חובה):"
              name="contactPhone"
              type="tel"
              placeholder="0501234567"
              touched={touched}
              errors={errors}
              values={values}
              getFieldProps={getFieldProps}
            />

            <FormField
              label="אימייל (לא חובה):"
              name="contactEmail"
              type="email"
              placeholder="example@mail.com"
              touched={touched}
              errors={errors}
              values={values}
              getFieldProps={getFieldProps}
            />
          </div>
        )}

        <FormButtons textBtn="עדכן" disabled={!isValid} onReset={resetForm} />
      </form>
    </div>
  );
}

export default EditOffer;
