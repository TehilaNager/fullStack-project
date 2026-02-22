import * as Yup from "yup";

const offerSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "כותרת חייבת להיות לפחות 2 תווים")
        .max(100, "כותרת לא יכולה לעלות על 100 תווים")
        .required("אנא הכנס כותרת לתרומה (שדה חובה)"),

    description: Yup.string()
        .min(5, "תיאור חייב להיות לפחות 5 תווים")
        .max(1024, "תיאור לא יכול לעלות על 1024 תווים")
        .required("אנא הכנס תיאור מפורט לתרומה (שדה חובה)"),

    category: Yup.string()
        .oneOf(
            [
                "ציוד צבאי",
                "ביגוד",
                "מזון",
                "תחבורה",
                "ציוד אלקטרוני",
                "ספרים וחומרי לימוד",
                "ציוד רפואי",
                "תמיכה נפשית וחברתית",
                "אחר",
            ],
            "אנא בחר את הקטגוריה המתאימה (שדה חובה)"
        )
        .required("אנא בחר את הקטגוריה המתאימה (שדה חובה)"),

    region: Yup.string()
        .oneOf(["צפון", "מרכז", "דרום"], "אנא בחר אזור תקין לתרומה")
        .required("אנא בחר אזור (שדה חובה)"),

    city: Yup.string()
        .min(2, "שם העיר חייב להיות לפחות 2 תווים")
        .max(256, "שם העיר לא יכול לעלות על 256 תווים")
        .required("אנא הכנס שם עיר (שדה חובה)"),

    availableQuantity: Yup.number()
        .typeError("שדה זה חייב להכיל מספר")
        .min(1, "כמות זמינה חייבת להיות לפחות 1")
        .max(100000, "הכמות גבוהה במיוחד, אנא בדוק שהזנת נכון")
        .nullable(true)
        .notRequired()
        .test(
            "is-number-or-empty",
            "שדה זה חייב להכיל מספר",
            function (value) {
                if (value === null || value === undefined || value === "") return true;
                return !isNaN(value);
            }
        ),

    availableUntil: Yup.mixed()
        .test(
            "valid-date",
            "חובה לבחור תאריך חוקי",
            function (value) {
                if (!value) return true;
                const date = new Date(value);
                return !isNaN(date.getTime());
            }
        )
        .test(
            "future-date",
            "תאריך חייב להיות היום או בעתיד",
            function (value) {
                if (!value) return true;
                const date = new Date(value);
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                return date >= now;
            }
        ),

    contactMethod: Yup.string()
        .oneOf(["site", "details"], "אנא בחר את דרך יצירת הקשר המועדפת (שדה חובה)")
        .required("אנא בחר את דרך יצירת הקשר המועדפת (שדה חובה)"),

    contactPhone: Yup.string()
        .matches(/^\d*$/, "מספר הטלפון יכול להכיל ספרות בלבד (לדוגמה: 031234567 או 0501234567)")
        .matches(/^0\d*$/, "מספר הטלפון חייב להתחיל ב-0 (לדוגמה: 031234567 או 0501234567)")
        .min(9, "מספר הטלפון חייב להיות בן 9–10 ספרות (לדוגמה: 031234567 או 0501234567)")
        .max(10, "מספר הטלפון חייב להיות בן 9–10 ספרות (לדוגמה: 031234567 או 0501234567)")
        .nullable(true)
        .notRequired(),

    contactEmail: Yup.string()
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            "אימייל חייב להיות תקין (לדוגמה: example@mail.com)"
        )
        .nullable(true)
        .notRequired(),

});

export default offerSchema;
