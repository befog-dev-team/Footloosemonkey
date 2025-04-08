"use client";

import React, { useEffect } from "react";

type AdBannerTypes = {
    dataAdSlot: string;
    dataAdFormat: string;
    dataFullWidthResponsive: boolean;
};

const AdBanner: React.FC<AdBannerTypes> = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {
    useEffect(() => {
        const initializeAds = () => {
            if (typeof window !== "undefined" && (window as any).adsbygoogle) {
                try {
                    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                } catch (error: any) {
                    console.error(error.message);
                }
            }
        };

        initializeAds();

    }, []);

    return (
        <div style={{overflow: 'hidden', margin: '5px'}}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-3599405412984531"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            />
        </div>
    );
};

export default AdBanner;
