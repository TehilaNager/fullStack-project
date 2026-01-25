import { useState } from "react";
import "./create-request.css";

function CreateRequest() {
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  return (
    <div className="create-request-page">
      <h1 className="create-request-title">צור בקשה חדשה</h1>

      <form className="create-request-form">
        <div className="form-group">
          <label htmlFor="title">
            <span style={{ color: "red" }}>*</span> כותרת
          </label>
          <input
            type="text"
            placeholder="למשל: נעלי הליכה מידה 43"
            required
            id="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            <span style={{ color: "red" }}>*</span> תיאור
          </label>
          <textarea
            placeholder="למשל: אני זקוק לנעלי הליכה מידה 43, נוחות ועמידות לשימוש יומיומי, צבע כהה מועדף. תודה!"
            required
            id="description"
          ></textarea>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              <span style={{ color: "red" }}>*</span> קטגוריה
            </label>
            <select defaultValue="" required>
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

          <div className="form-group">
            <label htmlFor="for">
              <span style={{ color: "red" }}>*</span> עבור (מספר יחידות/אנשים)
            </label>
            <input
              type="number"
              min="1"
              placeholder="למשל: 5"
              required
              id="for"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              <span style={{ color: "red" }}>*</span> אזור
            </label>
            <select defaultValue="" required>
              <option value="" disabled>
                בחר אזור
              </option>
              <option>צפון</option>
              <option>מרכז</option>
              <option>דרום</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <span style={{ color: "red" }}>*</span> עיר
            </label>
            <input type="text" placeholder="למשל: עפולה" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              <span style={{ color: "red" }}>*</span> דחיפות
            </label>
            <select
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

          <div className="form-group">
            <label>
              {priority === "דחופה" && <span style={{ color: "red" }}>* </span>}
              תאריך אחרון (שדה חובה לבקשות דחופות)
            </label>
            <input
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

        <div className="form-group">
          <label>
            <span style={{ color: "red" }}>*</span> דרך יצירת קשר מועדפת
          </label>
          <select
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
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
            <div className="form-group">
              <label>טלפון</label>
              <input type="tel" placeholder="למשל: 0501234567" />
            </div>
            <div className="form-group">
              <label>אימייל</label>
              <input type="email" placeholder="למשל: example@mail.com" />
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
