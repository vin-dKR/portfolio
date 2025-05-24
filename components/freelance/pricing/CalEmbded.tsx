"use client"
import { getCalApi } from "@calcom/embed-react";
import { ReactNode, useEffect, useState } from "react";

export default function CalPopup({ children }: { children: ReactNode }) {

    useEffect(() => {
        (async function() {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", { "cssVarsPerTheme": { "light": { "cal-brand": "#460a77" }, "dark": { "cal-brand": "#5c08a0" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])

    return (
        <>
            <div data-cal-namespace="30min"
                data-cal-link="vinod-kr/30min"

                data-cal-config='{"layout":"month_view"}'
            >{children}</div>;
        </>
    )
};

