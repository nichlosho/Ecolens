// Helper function to generate case-insensitive filter for documents
export function createCaseInsensitiveFilter(
    filter: object,
    propertyName: string,
    propertyValue: string
): object {
    filter[propertyName] = { $regex: new RegExp(propertyValue, 'i') };
    return filter;
}
