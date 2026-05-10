export const formatDate = (date) => {
    if (!date) return "לא צוין";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "לא צוין";

    return d.toLocaleDateString("he-IL");
};

export const formatChatTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffInMs = startOfToday.getTime() - startOfDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) {
        return date.toLocaleDateString("he-IL");
    }

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
        return date.toLocaleDateString("he-IL", { weekday: "long" });
    }

    return date.toLocaleDateString("he-IL");
};

export const formatDateTimeWithSeconds = (date) => {
    if (!date) return "לא צוין";

    const d = new Date(date);

    if (isNaN(d.getTime())) return "לא צוין";

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
};

export const formatTimeAgo = (date) => {
    if (!date) return "לא צוין";

    const now = new Date();
    const target = new Date(date);
    const diff = Math.floor((now - target) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (diff < 60) return "לפני כמה שניות";

    if (minutes < 60)
        return minutes === 1 ? "לפני דקה" : `לפני ${minutes} דקות`;

    if (hours < 24) return hours === 1 ? "לפני שעה" : `לפני ${hours} שעות`;

    if (days === 1) return "אתמול";

    if (days < 7) {
        return target.toLocaleDateString("he-IL", { weekday: "long" });
    }

    if (days < 30) return `לפני ${days} ימים`;

    return target.toLocaleDateString("he-IL");
};

export const formatDateTime = (date) => {
    if (!date) return "לא צוין";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "לא צוין";

    return d.toLocaleString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};