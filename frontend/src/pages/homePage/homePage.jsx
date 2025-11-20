import "./homePage.css";
import Carousel from "../../components/common/carousel/carousel";

const requests = [
  { id: 1, title: "בקשה 1", description: "פרטים על הבקשה 1" },
  { id: 2, title: "בקשה 2", description: "פרטים על הבקשה 2" },
  { id: 3, title: "בקשה 3", description: "פרטים על הבקשה 3" },
  { id: 4, title: "בקשה 4", description: "פרטים על הבקשה 4" },
  { id: 5, title: "בקשה 5", description: "פרטים על הבקשה 5" },
  { id: 6, title: "בקשה 6", description: "פרטים על הבקשה 6" },
];

const donations = [
  { id: 1, title: "תרומה 1", description: "פרטים על התרומה 1" },
  { id: 2, title: "תרומה 2", description: "פרטים על התרומה 2" },
  { id: 3, title: "תרומה 3", description: "פרטים על התרומה 3" },
  { id: 4, title: "תרומה 4", description: "פרטים על התרומה 4" },
];

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">חבר ללוחם</h1>
          <p className="hero-subtitle">
            <strong>
              פלטפורמה שמחברת בין חיילים ומילואימניקים הזקוקים לעזרה לבין אזרחים
              שרוצים לתת.
            </strong>
            <br />
            חיבור נעים ומכבד שמייצר קהילה חמה ופועלת יום-יום למען הלוחמים שלנו.
          </p>
          <button className="cta-btn">צפו בבקשות ותרומות</button>
        </div>
      </section>

      {/*  קרוסלות */}
      <section>
        <Carousel title="בקשות אחרונות" items={requests} />
        <Carousel title="תרומות אחרונות" items={donations} />
      </section>
    </div>
  );
}

export default HomePage;
