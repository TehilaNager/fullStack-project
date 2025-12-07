import "./homePage.css";

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
              שרוצים לתת
            </strong>
            <br />
            חיבור נעים ומכבד שמייצר קהילה חמה ופועלת יום-יום למען הלוחמים שלנו
          </p>
          <button className="requests-btn">צפו בבקשות</button>
          <button className="donations-btn">צפו בתרומות</button>
        </div>
      </section>

      {/* מדריך בשלבים */}
      <section></section>
    </div>
  );
}

export default HomePage;
