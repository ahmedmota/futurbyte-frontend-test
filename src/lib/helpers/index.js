export const getImageURL = (url) => url || "";
export const getFormattedDate = (dateString, options = { month: "short", day: "numeric", year: "numeric" }) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
}
export const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

