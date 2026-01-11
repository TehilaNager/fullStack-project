import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./inspiring-messages.css";

function InspiringMessages() {
  const messages = [
    "תודה על המסירות וההקרבה שלכם – אתם הגאווה שלנו!",
    "כל יום שאתם בשטח, אתם נותנים לנו השראה – תודה על הכל.",
    "הלב שלנו איתכם, ותמיד נזכור להעריך את מה שאתם עושים.",
    "חיזוק קטן יכול לעשות שינוי גדול – אתם לא לבד.",
    "תרומה קטנה יכולה לעשות הבדל גדול בחיי חיילים ומילואים.",
    "כל תרומה מקרבת אותנו למען הקהילה ולתמיכה בלוחמים שלנו.",
    "ביחד אנחנו יוצרים אחדות, חיזוק וקשר אמיתי עם המשרתים.",
    "נתינה פותחת את הלב ומגבירה את תחושת השייכות.",
    "כל תרומה מגיעה למקום הנכון ומסייעת למי שצריך באמת.",
    "תמיכה שלכם מראה לחיילים שמישהו חושב עליהם ודואג להם.",
    "לא עליך המלאכה לגמור, ואין אתה פטור ממנה – משנה, ספר אבות",
    'ואהבת לרעך כמוך – ויקרא י"ט, יח',
    "מי שמציל נפש אחת – כאילו הציל עולם ומלואו – תלמוד בבלי, מסכת סנהדרין",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inspiring-container">
      <div className="inspiring-icon">
        <i className="bi bi-heart-fill"></i>
      </div>

      <p className="inspiring-message">{messages[currentMessage]}</p>

      <div className="inspiring-buttons">
        <Link to="/requests" className="inspiring-btn requests-btn">
          צפו בבקשות <i className="bi bi-gift"></i>
        </Link>
        <Link to="/offers" className="inspiring-btn offers-btn">
          צפו בתרומות <i className="bi bi-people"></i>
        </Link>
      </div>
    </div>
  );
}

export default InspiringMessages;
