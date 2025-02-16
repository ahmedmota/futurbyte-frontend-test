const { ORIGINS } = require("../constants");

const countries = {
    [ORIGINS.UK]: { latMin: 49.9, latMax: 60.9, lonMin: -8.6, lonMax: 1.8 },
    [ORIGINS.UAE]: { latMin: 22.6, latMax: 26.1, lonMin: 51.6, lonMax: 56.5 },
    [ORIGINS.US]: { latMin: 24.5, latMax: 49.4, lonMin: -125.0, lonMax: -66.9 },
    [ORIGINS.CA]: { latMin: 41.7, latMax: 83.1, lonMin: -141.0, lonMax: -52.6 }
};
export const checkCountryOrigin = (lat, lon) => {
    for (const country in countries) {
        const { latMin, latMax, lonMin, lonMax } = countries[country];
        if (lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax) {
            return country;
        }
    }


    return;
};