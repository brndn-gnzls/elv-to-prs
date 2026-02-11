// src/components/Accordion/Accordion.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Accordion.module.css";

export default function Accordion({
                                      label,
                                      links,
                                      defaultOpen = true,
                                      currentPath
                                  }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useEffect(() => {
        setIsOpen(defaultOpen);
    }, [defaultOpen]);

    const toggleAccordion = () => setIsOpen((o) => !o);

    // fallback scroll‐to‐top if no custom onClick
    const doScrollTop = () => {
        window.scrollTo(0, 0);
        const content = document.querySelector("[data-main-content]");
        if (content) content.scrollTop = 0;
    };

    return (
        <div className={styles.accordionWrapper}>
            <div className={styles.headerRow} onClick={toggleAccordion}>
                <p className={`${styles.headerLabel} ${isOpen ? styles.open : ""}`}>
                    {label}
                </p>
                <span
                    className={`${styles.caretIcon} ${
                        isOpen ? styles.caretDown : styles.caretRight
                    }`}
                />
            </div>

            {isOpen && (
                <div className={styles.linksContainer}>
                    {links.map(({ label: linkLabel, route, onClick }, idx) => {
                        const isActive = route === currentPath;
                        return (
                            <Link
                                key={idx}
                                to={route}
                                className={`${styles.navLink} ${
                                    isActive ? styles.activeLink : ""
                                }`}
                                onClick={(e) => {
                                    if (route === "#") {
                                        e.preventDefault();
                                    }
                                    // first your custom handler (if any)
                                    if (typeof onClick === "function") {
                                        onClick();
                                    }
                                    // then always scroll-to-top
                                    doScrollTop();
                                }}
                            >
                                &nbsp;&nbsp;{linkLabel}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}