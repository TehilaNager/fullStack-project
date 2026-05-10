export const statusMap = {
    פתוחה: "open",
    בטיפול: "in-progress",
    הושלמה: "completed",
};

export const priorityMap = {
    דחופה: "urgent",
    גבוהה: "high",
    בינונית: "medium",
    נמוכה: "low",
};

export const categoryMap = {
    "ציוד צבאי": "military-equipment",
    ביגוד: "clothing",
    מזון: "food",
    תחבורה: "transport",
    "ציוד אלקטרוני": "electronics",
    "ספרים וחומרי לימוד": "books",
    "ציוד רפואי": "medical",
    "תמיכה נפשית וחברתית": "emotional-support",
    אחר: "other",
};

export const getTagKey = (type, value) => {
    const maps = {
        status: statusMap,
        priority: priorityMap,
        category: categoryMap,
    };

    const cleanValue = typeof value === "string" ? value.trim() : value;

    return maps[type]?.[cleanValue] ?? "unknown";
};

