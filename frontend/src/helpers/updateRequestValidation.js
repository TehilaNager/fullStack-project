import * as Yup from "yup";

const phoneRegex = /^0\d{8,9}$/;

const updateRequestSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "כותרת חייבת להיות לפחות 2 תווים")
        .max(100, "כותרת לא יכולה לעלות על 100 תווים")
        .required("אנא הכנס כותרת לבקשה (שדה חובה)"),

    description: Yup.string()
        .min(5, "תיאור חייב להיות לפחות 5 תווים")
        .max(1024, "תיאור לא יכול לעלות על 1024 תווים")
        .required("אנא הכנס תיאור מפורט לבקשה (שדה חובה)"),

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
            "קטגוריה לא תקינה"
        )
        .required("אנא בחר את הקטגוריה המתאימה (שדה חובה)"),

    region: Yup.string()
        .oneOf(["צפון", "מרכז", "דרום"], "אזור לא תקין")
        .required("אנא בחר אזור (שדה חובה)"),

    city: Yup.string()
        .min(2, "שם העיר חייב להיות לפחות 2 תווים")
        .max(256, "שם העיר לא יכול לעלות על 256 תווים")
        .required("אנא הכנס שם עיר (שדה חובה)"),

    priority: Yup.string()
        .oneOf(["נמוכה", "בינונית", "גבוהה", "דחופה"], "דחיפות לא תקינה")
        .required("אנא בחר את רמת הדחיפות של הבקשה (שדה חובה)"),

    requiredQuantity: Yup.number()
        .transform((value, originalValue) => {
            if (originalValue === "") return null;
            if (isNaN(Number(originalValue))) return NaN;
            return Number(originalValue);
        })
        .typeError("שדה זה חייב להכיל מספר")
        .nullable()
        .notRequired()
        .min(1, "מספר האנשים חייב להיות לפחות 1"),

    deadline: Yup.mixed()
        .test(
            "deadline-required-if-urgent",
            "חובה למלא תאריך לבקשה דחופה",
            function (value) {
                const { priority } = this.parent;

                if (priority === "דחופה") {
                    return value !== null && value !== undefined && value !== "";
                }

                return true;
            }
        )
        .test(
            "deadline-valid-date",
            "חובה לבחור תאריך חוקי",
            function (value) {
                if (!value) return true;
                const date = new Date(value);
                return !isNaN(date.getTime());
            }
        )
        .test(
            "deadline-future",
            "תאריך חייב להיות היום או בעתיד",
            function (value) {
                if (!value) return true;
                const date = new Date(value);
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                return date >= now;
            }
        )
        .optional(),

    contactMethod: Yup.string()
        .oneOf(["site", "details"], "דרך יצירת קשר לא תקינה")
        .required("אנא בחר את דרך יצירת הקשר המועדפת (שדה חובה)"),

    contactPhone: Yup.string()
        .transform((value) => (value === "" ? null : value))
        .matches(phoneRegex, {
            message: "מספר הטלפון חייב להתחיל ב-0 ולהכיל 9–10 ספרות",
            excludeEmptyString: true,
        })
        .nullable()
        .optional(),

    contactEmail: Yup.string()
        .transform((value) => (value === "" ? null : value))
        .email("אימייל חייב להיות תקין")
        .nullable()
        .optional(),
});

export default updateRequestSchema;