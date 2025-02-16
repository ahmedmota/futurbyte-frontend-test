"use client";

import { checkCountryOrigin } from "@/lib/helpers/checkCountryOrigin";
import { useEffect } from "react";

const GeoLocation = () => {

    const redirectToOrigin = () => {
        if (!navigator.geolocation) {
            return
        }
        navigator.geolocation?.getCurrentPosition(
            (position) => {
                let location = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                }
                const origin = checkCountryOrigin(location.lat, location.lon)
                const isCorrectOrigin = window.location.pathname.includes(origin)
                if (origin && !isCorrectOrigin) {
                    window.location.href = origin
                    localStorage.setItem('currentOrigin', origin || "/")
                }
            },
        );
    };
    useEffect(() => {
        redirectToOrigin()
    }, []);
};

export default GeoLocation;
