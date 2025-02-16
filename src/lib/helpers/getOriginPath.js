const { ORIGINS } = require("../constants");

export const getOriginPath = (key) => {
    if (!key || key === "/") return ""
    return key
};