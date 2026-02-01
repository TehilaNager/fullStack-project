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

export function filterRequests(
    allRequests,
    search,
    filters,
    quantityOption,
    minQuantity,
    maxQuantity,
    includeUnknownQuantity = true
) {
    const searchText = search.toLowerCase().trim();

    return allRequests.filter((req) => {
        const matchesSearch =
            req.title?.toLowerCase().includes(searchText) ||
            req.description?.toLowerCase().includes(searchText) ||
            req.city?.toLowerCase().includes(searchText);

        const matchesRegion =
            filters.region.length === 0 || filters.region.includes(req.region);
        const matchesPriority =
            filters.priority.length === 0 || filters.priority.includes(req.priority);
        const matchesStatus =
            filters.status.length === 0 || filters.status.includes(req.status);
        const matchesCategory =
            filters.category.length === 0 || filters.category.includes(req.category);

        let matchesQuantity = true;
        const qty = req.requiredQuantity;

        if (quantityOption === "range") {
            const minQ = minQuantity ? Number(minQuantity) : 0;
            const maxQ = maxQuantity ? Number(maxQuantity) : Infinity;
            matchesQuantity = qty !== null && qty >= minQ && qty <= maxQ;
        } else if (quantityOption) {
            const maxQ = Number(quantityOption);
            matchesQuantity = qty !== null && qty <= maxQ;
        }

        if (!includeUnknownQuantity && qty === null) {
            matchesQuantity = false;
        } else if (includeUnknownQuantity && qty === null) {
            matchesQuantity = true;
        }

        return (
            matchesSearch &&
            matchesRegion &&
            matchesPriority &&
            matchesStatus &&
            matchesCategory &&
            matchesQuantity
        );
    });
}

export function countActiveFilters(filters) {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
}

