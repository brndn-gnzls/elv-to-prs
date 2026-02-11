
import React, { useEffect, useState } from "react";

import styles from "./BackToTopButton.module.css";

const SCROLL_THRESHOLD = 300; // Show after 300px scroll

const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > SCROLL_THRESHOLD);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button className={styles.backToTopButton} onClick={handleClick} aria-label="Back to top">
            <span style={{ fontSize: "1.5em", lineHeight: 1 }}>↑</span>
        </button>
    );
};

export default BackToTopButton;