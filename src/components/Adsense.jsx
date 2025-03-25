"use client";

import { useEffect } from "react";

export default function AdSense() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        script.setAttribute("data-ad-client", "ca-pub-3599405412984531");
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
    }, []);

    return null; // No UI needed, just loads script
}
