import "./homePage.css";
import CardHome from "../../components/cardHome/cardHome";
import WhyDonate from "../../components/whyDonate/whyDonate";
import requestService from "../../services/requestService";

requestService.getAllRequests();

function HomePage() {
  return (
    <div className="home-page">
      {/* חלק עליון */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <i className="bi bi-heart-fill"></i> קהילה של תמיכה והערכה
          </div>
          <h1 className="hero-title">חבר ללוחם</h1>
          <p className="hero-subtitle">
            פלטפורמה שמחברת בין חיילים ומילואימניקים הזקוקים לעזרה לבין אזרחים
            שרוצים לתת
            <br />
            <span>
              חיבור נעים ומכבד שמייצר קהילה חמה ופועלת יום-יום למען הלוחמים שלנו
            </span>
          </p>
          <button className="requests-btn">
            <i className="bi bi-gift"></i> צפו בבקשות
          </button>
          <button className="donations-btn">
            <i className="bi bi-people"></i> צפו בתרומות
          </button>
        </div>
      </section>

      {/* אזור בקשות אחרונות */}
      <section className="home-section">
        <div className="requests-header d-flex justify-content-between align-items-center">
          <div>
            <h2>בקשות אחרונות</h2>
            <p>חיילים ומילואימניקים שזקוקים לעזרתכם</p>
          </div>

          <button>
            כל הבקשות <i className="bi bi-arrow-left-short"></i>
          </button>
        </div>

        <div className="cards">
          <CardHome
            title="מזון חם ליחידה בצפון"
            category="מזון"
            description="אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית."
            city="תל אביב"
            priority="גבוהה"
          />
          <CardHome
            title="מזון חם ליחידה בצפון"
            category="ציוד רפואי"
            description="יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית.  יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית."
            city="אילת"
            priority="נמוכה"
          />
          <CardHome
            title="מזון חם ליחידה בצפון"
            category="ספרים וחומרי לימוד"
            description="יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית.  יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית."
            city="טירת יהודה"
            priority="דחופה"
          />
          <CardHome
            title="מזון חם ליחידה בצפון"
            category="תחבורה"
            description="יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית.  יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית."
            city="יהוד"
            priority="בינונית"
          />
          <CardHome
            title="מזון חם ליחידה בצפון"
            category="ביגוד"
            description="יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית.  יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית."
            city="אלקנה"
            priority="דחופה"
          />
          <CardHome
            title="מזון חם ליחידה בצפון"
            category="ציוד צבאי"
            description="יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית.  יחידה של 15 לוחמים בצפון תשמח מאוד למזון חם או ארוחות מוכנות.  אנחנו בשטח כבר כמה שבועות והיינו מעריכים מאוד ארוחה ביתית."
            city="קרני שומרון"
            priority="גבוהה"
          />
        </div>
      </section>

      {/* אזור תרומות אחרונות */}
      <section className="home-section">
        <div className="requests-header d-flex justify-content-between align-items-center">
          {/* <div className="d-flex justify-content-between"> */}
          <div>
            <h2>תרומות אחרונות</h2>
            <p>אזרחים שרוצים לתרום ולעזור</p>
          </div>

          <button>
            כל התרומות <i className="bi bi-arrow-left-short"></i>
          </button>
        </div>

        <div className="cards">
          <CardHome
            title="אוזניות אלחוטיות סמסונג"
            category="ציוד אלקטרוני"
            description=" אוזניות Galaxy Buds במצב מצוין, כמעט לא בשימוש. כולל קייס טעינה.
              אשמח לתרום לחייל או מילואימניק.  אוזניות Galaxy Buds במצב מצוין, כמעט לא בשימוש. כולל קייס טעינה.
              אשמח לתרום לחייל או מילואימניק."
            city="תל אביב"
          />
          <CardHome
            title="אוזניות אלחוטיות סמסונג"
            category="ציוד רפואי"
            description=" אוזניות Galaxy Buds במצב מצוין, כמעט לא בשימוש. כולל קייס טעינה.
              אשמח לתרום לחייל או מילואימניק."
            city="תל אביב"
          />
          <CardHome
            title="אוזניות אלחוטיות סמסונג"
            category="ציוד צבאי"
            description=" אוזניות Galaxy Buds במצב מצוין, כמעט לא בשימוש. כולל קייס טעינה.
              אשמח לתרום לחייל או מילואימניק."
            city="תל אביב"
          />
          <CardHome
            title="אוזניות אלחוטיות סמסונג"
            category="מזון"
            description=" אוזניות Galaxy Buds במצב מצוין, כמעט לא בשימוש. כולל קייס טעינה.
              אשמח לתרום לחייל או מילואימניק."
            city="תל אביב"
          />
          <CardHome
            title="אוזניות אלחוטיות סמסונג"
            category="תחבורה"
            description=" אוזניות Galaxy Buds במצב מצוין, כמעט לא בשימוש. כולל קייס טעינה.
              אשמח לתרום לחייל או מילואימניק."
            city="תל אביב"
          />
          <CardHome
            title="אוזניות אלחוטיות סמסונג"
            category="ציוד אלקטרוני"
            description=" אוזניות Galaxy Buds במצב מצוין, כמעט לא בשימוש. כולל קייס טעינה.
              אשמח לתרום לחייל או מילואימניק."
            city="תל אביב"
          />
        </div>
      </section>

      {/* אזור איך זה עובד */}
      <section className="workflow-section">
        <div className="workflow-card">
          <h3>
            <i className="bi bi-heart"></i> צריך עזרה?
          </h3>

          <div className="steps-row">
            <div className="step-card">
              <p className="step-number">1</p>
              <h4>
                <i className="bi bi-search"></i> בדקו אם יש תרומה מתאימה
              </h4>
              <p>
                חפשו באזור התרומות אם מישהו כבר פרסם משהו שיכול לתת לכם מענה. אם
                מצאתם, צרו קשר דרך מערכת ההודעות.
              </p>
            </div>

            <div className="step-card">
              <p className="step-number">2</p>
              <h4>
                <i className="bi bi-file-earmark-text"></i> פרסמו בקשה חדשה
              </h4>
              <p>
                תמיד אפשר לפרסם בקשה חדשה. פרטו מה בדיוק אתם צריכים, עבור מי
                ובאיזה מיקום.
              </p>
            </div>

            <div className="step-card">
              <p className="step-number">3</p>
              <h4>
                <i className="bi bi-chat"></i> המתינו לעזרה
              </h4>
              <p>
                מידי פעם עברו על רשימת התרומות. מי שיכול לעזור ייצור קשר איתכם
                דרך מערכת ההודעות.
              </p>
            </div>
          </div>
        </div>

        <div className="workflow-card">
          <h3>
            <i className="bi bi-gift"></i> רוצה לתת?
          </h3>

          <div className="steps-row">
            <div className="step-card">
              <p className="step-number">1</p>
              <h4>
                <i className="bi bi-search"></i> בדקו בקשות קיימות
              </h4>
              <p>
                חפשו אם מישהו זקוק בדיוק למה שאתם יכולים לתת. אם מצאתם בקשה
                מתאימה, צרו קשר דרך מערכת ההודעות.
              </p>
            </div>

            <div className="step-card">
              <p className="step-number">2</p>
              <h4>
                <i className="bi bi-file-earmark-text"></i> פרסמו תרומה חדשה
              </h4>
              <p>
                תמיד אפשר להציע תרומה בעצמכם. שתפו מה תוכלו להציע כדי לעזור
                לאחרים.
              </p>
            </div>

            <div className="step-card">
              <p className="step-number">3</p>
              <h4>
                <i className="bi bi-chat"></i> המתינו לקשר
              </h4>
              <p>
                מי שזקוק לתרומה ייצור איתכם קשר. כדאי מידי פעם לבדוק באזור
                הבקשות – אולי מישהו פרסם בקשה חדשה שתתאים לכם.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* אזור מי אנחנו */}
      <section className="about-section">
        <div className="about-icon">
          <i className="bi bi-heart"></i>
        </div>

        <h2 className="about-title">מי אנחנו?</h2>

        <p className="about-text">
          אנחנו קהילה שמטרתה לתמוך בחיילים ובמילואים, ליצור חיבור בין אזרחים
          לבין לוחמיהם ולוודא שכל תרומה מגיעה למקום הנכון.
        </p>

        <button className="about-btn">
          עוד קצת עלינו <i className="bi bi-arrow-left-short"></i>
        </button>
      </section>

      {/* אזור אמון וביטחון באתר */}
      <section className="trust-section">
        <h2 className="trust-title">אמון וביטחון באתר</h2>
        <p className="trust-subtitle">אנחנו דואגים לכם ולנתונים שלכם בכל רגע</p>

        <div className="trust-cards">
          <div className="trust-card">
            <i className="bi bi-shield"></i>
            <h3>שקיפות מלאה</h3>
            <p>כל התרומות מנוהלות בצורה שקופה וניתן לעקוב אחריהן בזמן אמת</p>
          </div>

          <div className="trust-card">
            <i className="bi bi-lock"></i>
            <h3>אבטחת מידע</h3>
            <p>המידע שלכם מאובטח ומוגן ברמה הגבוהה ביותר</p>
          </div>

          <div className="trust-card">
            <i className="bi bi-check2-circle"></i>
            <h3>טיפול מקצועי</h3>
            <p>אנחנו מבטיחים שכל בקשה תטופל במקצועיות וביעילות</p>
          </div>
        </div>
      </section>

      {/* אזור למה כדאי לתרום?*/}
      <WhyDonate />
    </div>
  );
}

export default HomePage;
