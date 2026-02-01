export const regions = ["צפון", "מרכז", "דרום"];
export const priorities = ["נמוכה", "בינונית", "גבוהה", "דחופה"];
export const statuses = ["פתוחה", "בטיפול", "הושלמה"];
export const categories = [
    "ציוד צבאי",
    "ביגוד",
    "מזון",
    "תחבורה",
    "ציוד אלקטרוני",
    "ספרים וחומרי לימוד",
    "ציוד רפואי",
    "תמיכה נפשית וחברתית",
    "אחר",
];

export const filterGroups = [
    { title: "אזור", options: regions, key: "region" },
    { title: "דחיפות", options: priorities, key: "priority" },
    { title: "סטטוס", options: statuses, key: "status" },
    { title: "קטגוריה", options: categories, key: "category" },
];
