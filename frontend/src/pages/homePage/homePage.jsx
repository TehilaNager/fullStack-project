import { Link } from "react-router";
import "./hero.css";
import "./latestItems.css";
import "./workflow.css";
import "./help-section.css";
import InspiringMessages from "../../components/InspiringMessages/InspiringMessages";
import { useRequest } from "../../context/requestContext";
import { useOffer } from "../../context/offerContext";
import getLatestItems from "../../helpers/getLatestItems";
import Carousel from "../../components/carousel/carousel";
import helpCards from "../../helpers/helpData";
import HelpCard from "../../components/helpCard/helpCard";

function HomePage() {
  const { requests } = useRequest();
  const { offers } = useOffer();
  const latestRequests = getLatestItems(requests);
  const latestOffers = getLatestItems(offers);

  return (
    <div className="home-page">
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

      <Carousel
        className="section-light"
        title="בקשות אחרונות"
        subtitle="חיילים ומילואימניקים שזקוקים לעזרתכם"
        linkText="כל הבקשות"
        linkUrl="/requests"
        items={latestRequests}
      />

      <Carousel
        className="section-muted"
        title="תרומות אחרונות"
        subtitle="אזרחים שרוצים לתרום ולעזור"
        linkText="כל התרומות"
        linkUrl="/offers"
        items={latestOffers}
      />

      <section className="workflow-section">
        <h2 className="workflow-title">איך זה עובד?</h2>
        <p className="workflow-subtitle">
          שני מסלולים פשוטים לחיבור בין מי שצריך עזרה למי שרוצה לתת
        </p>

        <div className="workflow-grid">
          <div className="workflow-card need">
            <div className="workflow-card-header">
              <div className="workflow-icon">
                <i className="bi bi-heart"></i>
              </div>
              <h3>מסלול 1 – צריך עזרה?</h3>
            </div>

            <div className="workflow-steps">
              <div className="workflow-step">
                <span className="step-index">1</span>
                <div>
                  <h4>בדקו אם יש תרומה מתאימה</h4>
                  <p>
                    חפשו באזור התרומות אם כבר יש מישהו שיכול לעזור.
                    <br /> מצאתם? לחצו על התרומה וצרו קשר.
                  </p>
                </div>
              </div>

              <div className="workflow-step">
                <span className="step-index">2</span>
                <div>
                  <h4>פרסמו בקשה חדשה</h4>
                  <p>תוכלו ליצור בקשה חדשה בכל זמן ולפנות בקלות לתורמים.</p>
                </div>
              </div>

              <div className="workflow-step">
                <span className="step-index">3</span>
                <div>
                  <h4>המתינו לעזרה</h4>
                  <p>מי שיכול לעזור עשוי ליצור איתכם קשר דרך מערכת ההודעות.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-card give">
            <div className="workflow-card-header">
              <div className="workflow-icon">
                <i className="bi bi-gift"></i>
              </div>
              <h3>מסלול 2 – רוצה לתת?</h3>
            </div>

            <div className="workflow-steps">
              <div className="workflow-step">
                <span className="step-index">1</span>
                <div>
                  <h4>בדקו אם יש בקשה מתאימה</h4>
                  <p>
                    חפשו באזור הבקשות של החיילים ואנשי מילואים אם מישהו זקוק למה
                    שאתם יכולים להציע.
                  </p>
                </div>
              </div>

              <div className="workflow-step">
                <span className="step-index">2</span>
                <div>
                  <h4>פרסמו תרומה חדשה</h4>
                  <p>
                    תוכלו ליצור תרומה חדשה בכל זמן ולהציע עזרה לחיילים ואנשי
                    מילואים.
                  </p>
                </div>
              </div>

              <div className="workflow-step">
                <span className="step-index">3</span>
                <div>
                  <h4>המתינו לקשר</h4>
                  <p>מי שזקוק לתרומה שלכם עשוי ליצור איתכם קשר דרך המערכת.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="help-section">
        <h2 className="help-section-title">איך אפשר לעזור?</h2>

        <p className="help-intro">
          הפלטפורמה מאפשרת מגוון רחב של דרכי סיוע לחיילים ולאנשי מילואים, בהתאם
          לצרכים שעולים מהשטח.
          <br />
          הרשימה שלהלן מציגה דוגמאות נפוצות לסוגי עזרה, אך אינה מוגבלת — כל
          תרומה, יוזמה או הצעה לעזרה מתקבלות בברכה.
          <br />
          <span className="help-intro-muted">
            ניתן לעיין בבקשות קיימות או לפרסם תרומה חדשה — גם אם אינה מופיעה
            ברשימה.
          </span>
        </p>

        <div className="help-options">
          {helpCards.map((card, index) => (
            <HelpCard
              key={index}
              title={card.title}
              items={card.items}
              text={card.text}
            />
          ))}
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
