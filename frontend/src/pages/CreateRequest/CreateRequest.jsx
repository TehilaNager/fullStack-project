import { useState } from "react";
import "./create-request.css";
import { useFormik } from "formik";

function CreateRequest() {
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const { handleSubmit } = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      requiredQuantity: "",
      region: "",
      city: "",
      priority: "",
      deadline: "",
      contactPhone: "",
      contactEmail: "",
    },
    validate: () => {},
    onSubmit: () => {},
  });

  return (
    <div className="create-request-page">
      <h1 className="create-request-title">צור בקשה חדשה</h1>

      <form className="create-request-form" onSubmit={handleSubmit}>
        {/* title */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            <span style={{ color: "red" }}>*</span> כותרת:
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="למשל: נעלי הליכה מידה 43"
            required
            id="title"
          />
        </div>
        {/* description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            <span style={{ color: "red" }}>*</span> תיאור:
          </label>
          <textarea
            className="form-textarea"
            placeholder="למשל: אני זקוק לנעלי הליכה מידה 43, נוחות ועמידות לשימוש יומיומי, צבע כהה מועדף. תודה!"
            required
            id="description"
          ></textarea>
        </div>
        <div className="form-row">
          {/* category */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ color: "red" }}>*</span> קטגוריה:
            </label>
            <select className="form-select" defaultValue="" required>
              <option value="" disabled>
                בחר קטגוריה
              </option>
              <option>ציוד צבאי</option>
              <option>ביגוד</option>
              <option>מזון</option>
              <option>תחבורה</option>
              <option>ציוד אלקטרוני</option>
              <option>ספרים וחומרי לימוד</option>
              <option>ציוד רפואי</option>
              <option>תמיכה נפשית וחברתית</option>
              <option>אחר</option>
            </select>
          </div>

          {/* requiredQuantity */}
          <div className="form-group">
            <label htmlFor="requiredQuantity" className="form-label">
              מספר האנשים הזקוקים לעזרה (לא חובה):
            </label>

            <input
              className="form-input"
              type="number"
              min="1"
              placeholder="הכנס מספר"
              id="requiredQuantity"
            />
          </div>
        </div>
        <div className="form-row">
          {/* region */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ color: "red" }}>*</span> אזור:
            </label>
            <select className="form-select" defaultValue="" required>
              <option value="" disabled>
                בחר אזור
              </option>
              <option>צפון</option>
              <option>מרכז</option>
              <option>דרום</option>
            </select>
          </div>

          {/* city */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ color: "red" }}>*</span> עיר:
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="למשל: עפולה"
              required
            />
          </div>
        </div>
        <div className="form-row">
          {/* priority */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ color: "red" }}>*</span> דחיפות:
            </label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="" disabled>
                בחר דחיפות
              </option>
              <option>נמוכה</option>
              <option>בינונית</option>
              <option>גבוהה</option>
              <option>דחופה</option>
            </select>
          </div>

          {/* deadline */}
          <div className="form-group">
            <label className="form-label">
              {priority === "דחופה" && <span style={{ color: "red" }}>* </span>}
              תאריך אחרון (שדה חובה לבקשות דחופות):
            </label>
            <input
              className="form-input"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required={priority === "דחופה"}
            />

            <small style={{ color: "#666" }}>
              הבקשה לא תוצג לאחר תאריך זה.
            </small>
          </div>
        </div>

        {/* דרך יצירת קשר מועדפת */}
        <div className="form-group">
          <label className="form-label">
            <span style={{ color: "red" }}>*</span> דרך יצירת קשר מועדפת:
          </label>
          <select
            className="form-select"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            required
          >
            <option value="" disabled>
              בחר
            </option>
            <option value="site">דרך מערכת ההודעות בלבד</option>
            <option value="details">
              השאר טלפון, אימייל, או את שניהם (בנוסף למערכת ההודעות)
            </option>
          </select>
        </div>
        {contactMethod === "details" && (
          <div className="form-row">
            {/* contactPhone */}
            <div className="form-group">
              <label className="form-label">טלפון (לא חובה):</label>
              <input
                className="form-input"
                type="tel"
                placeholder="למשל: 0501234567"
              />
            </div>

            {/* contactEmail */}
            <div className="form-group">
              <label className="form-label">אימייל (לא חובה):</label>
              <input
                className="form-input"
                type="email"
                placeholder="למשל: example@mail.com"
              />
            </div>
          </div>
        )}
        <button type="submit" className="submit-btn">
          שלח בקשה
        </button>
      </form>
    </div>
  );
}

export default CreateRequest;
