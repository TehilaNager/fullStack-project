function getRecentItems(items, limit = 4) {
    if (!Array.isArray(items)) return [];

    return [...items]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, limit);
};

export default getRecentItems;