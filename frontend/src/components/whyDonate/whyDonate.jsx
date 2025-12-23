import { useState, useEffect } from "react";

export default function WhyDonate() {
  const messages = [
    "תרומה קטנה יכולה לעשות הבדל גדול בחיי חיילים ומילואים.",
    "כל תרומה מקרבת אותנו למען הקהילה ולתמיכה בלוחמים שלנו.",
    "ביחד אנחנו יוצרים אחדות, חיזוק וקשר אמיתי עם המשרתים.",
    "נתינה פותחת את הלב ומגבירה את תחושת השייכות.",
    "כל תרומה מגיעה למקום הנכון ומסייעת למי שצריך באמת.",
    "תמיכה שלכם מראה לחיילים שמישהו חושב עליהם ודואג להם.",
    "לא עליך המלאכה לגמור, ואין אתה פטור ממנה – משנה, ספר אבות",
    "מי ששומר על עמו – שומר עליו – חז",
    'ואהבת לרעך כמוך – ויקרא י"ט, יח',
    'טוב שם טוב משמן טוב – משלי כ"ד, י"ז',
    "מי שמציל נפש אחת – כאילו הציל עולם ומלואו – תלמוד בבלי, מסכת סנהדרין",
    "חסד עושה חייל – אמרי חכמים",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000); // כל 4 שניות
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="donate-section">
      <h2>למה כדאי לתרום?</h2>
      <p className="donate-message">{messages[currentMessage]}</p>

      <div className="donate-buttons">
        <button className="donate-btn requests-btn">
          צפו בבקשות <i className="bi bi-gift"></i>
        </button>
        <button className="donate-btn donations-btn">
          צפו בתרומות <i className="bi bi-people"></i>
        </button>
      </div>
    </section>
  );
}
