import { Link } from "react-router";
import "./hero.css";
import "./latestItems.css";
import "./workflow.css";
import InspiringMessages from "../../components/InspiringMessages/InspiringMessages";
import { useRequest } from "../../context/requestContext";
import { useOffer } from "../../context/offerContext";
import getLatestItems from "../../helpers/getLatestItems";
import Carousel from "../../components/carousel/carousel";
import CardHome from "../../components/cardHome/cardHome";

function HomePage() {
  const { requests } = useRequest();
  const { offers } = useOffer();
  const latestRequests = getLatestItems(requests);
  const latestOffers = getLatestItems(offers);

  return (
    <div className="home-page">
      {/* חלק עליון */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="bi bi-heart-fill"></i> קהילה אזרחית תומכת
          </div>

          <h1 className="hero-title">חבר ללוחם</h1>

          <p className="hero-subtitle">
            פלטפורמה שמחברת בין חיילים ומילואימניקים הזקוקים לעזרה לבין אזרחים
            שרוצים לתת — <br />
            בצורה פשוטה, מכבדת ובטוחה
          </p>

          <div className="hero-actions">
            <Link to="/requests" className="hero-btn primary">
              צפו בבקשות
            </Link>
            <Link to="/offers" className="hero-btn secondary">
              צפו בתרומות
            </Link>
          </div>
        </div>
      </section>

      {/* אזור בקשות אחרונות */}

      <Carousel
        // id="requestsCarousel"
        title="בקשות אחרונות"
        subtitle="חיילים ומילואימניקים שזקוקים לעזרתכם"
        linkText="כל הבקשות"
        linkUrl="/requests"
        items={latestRequests}
      />

      {/* אזור תרומות אחרונות */}

      <Carousel
        // id="offersCarousel"
        title="תרומות אחרונות"
        subtitle="אזרחים שרוצים לתרום ולעזור"
        linkText="כל התרומות"
        linkUrl="/offers"
        items={latestOffers}
      />

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

      {/* אזור איך אפשר לעזור */}

      <section className="help-section">
        <h2>איך אפשר לעזור?</h2>

        <p className="help-intro">
          הפלטפורמה מאפשרת מגוון רחב של דרכי סיוע לחיילים ולאנשי מילואים, בהתאם
          לצרכים שעולים מהשטח.
          <br />
          הרשימה שלהלן מציגה דוגמאות נפוצות לסוגי עזרה, אך אינה מוגבלת — כל
          תרומה, יוזמה או הצעה לעזרה מתקבלות בברכה.
          <br />
          ניתן לעיין בבקשות קיימות או לפרסם תרומה חדשה — גם אם אינה מופיעה
          ברשימה.
        </p>

        <div className="help-options">
          <div className="help-card">
            <h3>תרומות וציוד</h3>
            <ul>
              <li>ציוד צבאי</li>
              <li>ביגוד</li>
              <li>מזון</li>
              <li>ציוד אלקטרוני</li>
              <li>ספרים וחומרי לימוד</li>
              <li>ציוד רפואי</li>
            </ul>
            <p>
              כל דבר שתוכלו לתרום — גם אם אינו מופיע ברשימה — יתקבל בברכה ויעזור
              מאוד.
            </p>
          </div>

          <div className="help-card">
            <h3>תמיכה נפשית וחברתית</h3>
            <ul>
              <li>תמיכה נפשית וחברתית</li>
              <li>ליווי אישי ושיחות</li>
              <li>סיוע רגשי בהתאם לצורך שעולה</li>
            </ul>
            <p>גם תרומה של זמן, הקשבה ונוכחות היא בעלת ערך משמעותי.</p>
          </div>

          <div className="help-card">
            <h3>תחבורה וסיוע נוסף</h3>
            <ul>
              <li>הסעות</li>
              <li>הובלת ציוד</li>
              <li>סיוע לוגיסטי</li>
              <li>עזרה כללית מכל סוג</li>
            </ul>
            <p>אם יש ברשותכם אפשרות לעזור — סביר להניח שיש מי שזקוק לה.</p>
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

        <Link className="about-btn" to="/aboutPage">
          עוד קצת עלינו <i className="bi bi-arrow-left-short"></i>
        </Link>
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
      <InspiringMessages />
    </div>
  );
}

export default HomePage;
