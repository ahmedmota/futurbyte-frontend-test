"use client";

import { ORIGINS } from "@/lib/constants";
import React, { useEffect, useState } from "react";

const OriginSelect = () => {
    const [selectedOrigin, setSelectedOrigin] = useState("/");
    const origins = Object.values(ORIGINS);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let path = window.location.pathname;

            const segments = path.split("/");
            const origin = `/${segments[1]}`;

            if (origins.includes(origin)) {
                setSelectedOrigin(origin);
            } else {
                setSelectedOrigin("/");
            }
        }
    }, []);

    const onOriginChange = (e) => {
        const newOrigin = e.target.value;

        if (typeof window !== "undefined") {
            let path = window.location.pathname;

            let pathWithoutOrigin = path;
            origins.forEach((origin) => {
                if (path.startsWith(origin)) {
                    pathWithoutOrigin = path.replace(origin, "");
                }
            });

            const newPath = newOrigin === "/" ? pathWithoutOrigin : newOrigin + pathWithoutOrigin;

            setSelectedOrigin(newOrigin);
            localStorage.setItem("currentOrigin", newOrigin);

            // not redirecting through client, as client side transition of same page does not fetch same components UI
            window.location.href = newPath
        }
    };

    return (
        <select value={selectedOrigin} onChange={onOriginChange} className="rounded p-3 mx-1">
            <option value="/">Global</option>
            <option value={ORIGINS.UAE}>UAE</option>
            <option value={ORIGINS.US}>US</option>
            <option value={ORIGINS.CA}>CA</option>
            <option value={ORIGINS.UK}>UK</option>
        </select >
    );
};

export default OriginSelect;
