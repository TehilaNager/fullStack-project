export function toggleFilter(filtersState, filterType, value) {
    const current = filtersState[filterType];
    return current.includes(value)
        ? { ...filtersState, [filterType]: current.filter((v) => v !== value) }
        : { ...filtersState, [filterType]: [...current, value] };
}

export function clearFilters() {
    return {
        region: [],
        status: [],
        category: [],
    };
}

export function filterOffers(
    allOffers,
    search,
    filters,
    quantityOption,
    minQuantity,
    maxQuantity,
    includeUnknownQuantity = true
) {
    const searchText = search.toLowerCase().trim();

    return allOffers.filter((offer) => {
        const matchesSearch =
            offer.title?.toLowerCase().includes(searchText) ||
            offer.description?.toLowerCase().includes(searchText) ||
            offer.city?.toLowerCase().includes(searchText);

        const matchesRegion =
            filters.region.length === 0 || filters.region.includes(offer.region);
        const matchesStatus =
            filters.status.length === 0 || filters.status.includes(offer.status);
        const matchesCategory =
            filters.category.length === 0 || filters.category.includes(offer.category);

        let matchesQuantity = true;
        const qty = offer.availableQuantity;

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
            matchesStatus &&
            matchesCategory &&
            matchesQuantity
        );
    });
}

export function countActiveFilters(filters) {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
}
