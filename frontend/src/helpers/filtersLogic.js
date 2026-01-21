export function toggleFilter(filtersState, filterType, value) {
    const current = filtersState[filterType];
    return current.includes(value)
        ? { ...filtersState, [filterType]: current.filter((v) => v !== value) }
        : { ...filtersState, [filterType]: [...current, value] };
}

export function clearFilters() {
    return {
        region: [],
        priority: [],
        status: [],
        category: [],
    }
}

export function filterRequests(allRequests, search, filters) {
    const searchText = search.toLowerCase().trim();
    return allRequests.filter((req) => {
        const matchesSearch =
            req.title?.toLowerCase().includes(searchText) ||
            req.description?.toLowerCase().includes(searchText) ||
            req.city?.toLowerCase().includes(searchText);

        const matchesRegion = filters.region.length === 0 || filters.region.includes(req.region);
        const matchesPriority = filters.priority.length === 0 || filters.priority.includes(req.priority);
        const matchesStatus = filters.status.length === 0 || filters.status.includes(req.status);
        const matchesCategory = filters.category.length === 0 || filters.category.includes(req.category);

        return matchesSearch && matchesRegion && matchesPriority && matchesStatus && matchesCategory;
    });
}

export function countActiveFilters(filters) {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
}

