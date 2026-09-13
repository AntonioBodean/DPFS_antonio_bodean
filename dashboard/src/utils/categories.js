export function getCategoryBreakdown(countByCategory = {}) {
    const categories = Object.entries(countByCategory ?? {}).map(([name, count]) => ({
        name,
        count: Number.isInteger(count) && count >= 0 ? count : 0
    }));
    const highestCount = Math.max(1, ...categories.map(category => category.count));

    return categories.map(category => ({
        ...category,
        share: category.count / highestCount
    }));
}
