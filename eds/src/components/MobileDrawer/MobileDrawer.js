// src/components/MobileDrawer/MobileDrawer.js
import React, { useRef, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation, Link } from "react-router-dom";
import styles from "./MobileDrawer.module.css";

const GET_LEFT_RAIL_ACCORDIONS = gql`
    query LeftRailAccordions {
        leftRailAccordions {
            documentId
            label
            links
        }
    }
`;

const linkToPathMap = {
    // Components
    Overview: "/components",
    Accordion: "/components/accordion",
    Alert: "/components/alert",
    Badge: "/components/badge",
    Button: "/components/button",
    "Bar Graph": "/components/bar-graph",
    "Button Group": "/components/button-group",
    Checkbox: "/components/checkbox",
    Container: "/components/container",
    Divider: "/components/divider",
    Radio: "/components/radio",
    Dropdown: "/components/dropdown",
    "Left Hand Nav": "/components/left-hand-navigation",
    Link: "/components/link",
    "Page Header": "/components/page-header",
    "Progress Bar": "/components/progress-bar",
    "Radio Button": "/components/radio-button",
    "Section Header": "/components/section-header",
    "Slide In": "/components/slide-in",
    Tabs: "/components/tabs",
    "Text Field": "/components/text-field",
    Toggle: "/components/toggle",
    Tooltip: "/components/tooltip",

    // Get Started
    Overview: "/get-started",
    Design: "/get-started/design",
};

export default function MobileDrawer({
                                         isOpen,
                                         onClose,
                                         isLight,
                                         githubIcon,
                                         figmaIcon,
                                         lightIcon,
                                         darkIcon,
                                     }) {
    const MOBILE_MAX = 768;
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > MOBILE_MAX && isOpen) {
                onClose();
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen, onClose]);
    const { loading, error, data } = useQuery(GET_LEFT_RAIL_ACCORDIONS);
    const location = useLocation();
    const leftRailAccordions = data?.leftRailAccordions || [];
    const drawerRef = useRef({ startY: undefined });

    if (loading || error) return null;

    const handleTouchStart = (e) => {
        drawerRef.current.startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
        const endY = e.changedTouches[0].clientY;
        const startY = drawerRef.current.startY;
        if (startY !== undefined && startY - endY > 50) {
            onClose();
        }
    };

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.showOverlay : ""}`}
                onClick={onClose}
            />

            <div
                ref={drawerRef}
                className={`${styles.drawer} ${isOpen ? styles.openDrawer : ""}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className={styles.accordionWrapper}>
                    {leftRailAccordions.map((accData) => {
                        const labelText = accData.label.trim();
                        let linkRoutes = accData.links
                            ?.split("\\n")
                            .map((raw) => {
                                const label = raw.replace(/\\n/g, "").trim();
                                let route;
                                if (label === "Overview") {
                                    route =
                                        labelText === "Components"
                                            ? "/components"
                                            : labelText === "Get Started"
                                                ? "/get-started"
                                                : "#";
                                } else {
                                    route = linkToPathMap[label] || "#";
                                }
                                if (route === "#") {
                                    console.warn("Unmapped label:", label, "in section:", labelText);
                                }
                                return { label, route };
                            }) || [];

                        const overviewLink = linkRoutes.find((l) => l.label === "Overview");
                        const otherLinks = linkRoutes.filter((l) => l.label !== "Overview");
                        otherLinks.sort((a, b) => a.label.localeCompare(b.label));
                        linkRoutes = overviewLink ? [overviewLink, ...otherLinks] : otherLinks;

                        return (
                            <AccordionSection
                                key={accData.documentId}
                                label={labelText}
                                links={linkRoutes}
                                currentPath={location.pathname}
                                onClose={onClose}
                            />
                        );
                    })}
                </div>

                <div className={styles.bottomRow}>
                    <div className={styles.bottomLeft}>
                        {/* <a href="https://github.com/" className={styles.iconLink}>
                            <img src={githubIcon} alt="GitHub" />
                        </a> */}
                        <a href="https://www.figma.com/design/ba5zjxivV4dOt9E7APGMlm/eDS---Member-Library?node-id=17569-2465&t=g0UvOhY1idhxK0G9-0" target="_blank" rel="noreferrer" className={styles.iconLink}>
                            <img src={figmaIcon} alt="Figma" />
                        </a>
                    </div>
                    {/* <button className={styles.toggleBtn}>
                        <img
                            src={isLight ? lightIcon : darkIcon}
                            alt={isLight ? "Light Mode" : "Dark Mode"}
                        />
                    </button> */}
                </div>
            </div>
        </>
    );
}

function AccordionSection({ label, links, currentPath, onClose }) {
    return (
        <div className={styles.mobileAccordionWrapper}>
            <p className={styles.accordionLabel}>{label}</p>
            <div className={styles.mobileLinks}>
                {links.map((link, i) => {
                    const isActive = link.route === currentPath;
                    return (
                        <Link
                            key={i}
                            to={link.route}
                            onClick={onClose}
                            className={`${styles.mobileLink} ${isActive ? styles.activeLink : ""}`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}