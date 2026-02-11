import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    // useLayoutEffect runs *before* the browser paints the new route
    useLayoutEffect(() => {
        // 1) reset window scroll
        window.scrollTo(0, 0);
        // 2) reset inner content container
        const main = document.querySelector("[data-main-content]");
        if (main) main.scrollTop = 0;
    }, [pathname]);

    return null;
}