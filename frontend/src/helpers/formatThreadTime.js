function formatThreadTime(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffInMs = startOfToday - startOfDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return date.toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    if (diffInDays === 1) {
        return "אתמול";
    }

    if (diffInDays >= 2 && diffInDays < 7) {
        const days = [
            "ראשון",
            "שני",
            "שלישי",
            "רביעי",
            "חמישי",
            "שישי",
            "שבת",
        ];

        return days[date.getDay()];
    }

    return date.toLocaleDateString("he-IL", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
}

export default formatThreadTime;