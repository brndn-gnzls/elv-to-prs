// src/components/GlobalNav/GlobalNav.js

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./GlobalNav.module.css";
import MobileDrawer from "../MobileDrawer/MobileDrawer";
import { useLoading } from "../../LoadingContext";

const BRAND_ICONS = {
    Anthem: "/images/brandSwitcher/anthem-global-img-brand.svg",
    "Healthy Blue": "/images/brandSwitcher/healthyblue-global-img-brand.svg",
    Wellpoint: "/images/brandSwitcher/wellpoint-global-img-brand.svg",
};

const COMPONENT_NAME = "GlobalNav";

const GlobalNav = ({
                       showBrandSwitcher = false,
                       currentBrand = "Anthem",
                       onBrandChange = () => {},
                   }) => {
    const [isLight, setIsLight] = useState(true);
    const handleToggle = () => setIsLight(!isLight);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Check route => use conditional logo
    const location = useLocation();
    const logoText =
        location.pathname === "/" ? "Enterprise Digital Design System" : "eDS";

    const githubIcon = "/images/globalNav/github.svg";
    const figmaIcon = "/images/globalNav/figma.svg";
    const lightIcon = "/images/globalNav/light.svg";
    const darkIcon = "/images/globalNav/dark.svg";

    const {startLoading, stopLoading} = useLoading();

    useEffect(() => {
        startLoading(COMPONENT_NAME);
        stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    return (
        <>
            <header className={styles.navWrapper}>
                <div className={`container ${styles.navInner}`}>
                    {/* Left side => conditional logo */}
                    <div className={styles.navLeft}>
                        <span className={styles.brandTitle}>
                            <Link to="/">
                            {logoText}
                            </Link>
                        </span>
                    </div>

                    <div className={styles.navRight}>
                        {showBrandSwitcher && (
                            <BrandSwitcherDropdown
                                currentBrand={currentBrand}
                                onBrandChange={onBrandChange}
                            />
                        )}

                        {/* Hamburger => triggers mobile drawer */}
                        <div
                            className={`${styles.hamburger} ${
                                isDrawerOpen ? styles.open : ""
                            }`}
                            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        {/* <a href="https://github.com/" className={styles.iconLink}>
                            <img src={githubIcon} alt="GitHub" />
                        </a> */}
                        <a href="https://www.figma.com/design/ba5zjxivV4dOt9E7APGMlm/eDS---Member-Library?node-id=17569-2465&t=g0UvOhY1idhxK0G9-0" target="_blank" rel="noreferrer" className={styles.iconLink}>
                            <img src={figmaIcon} alt="Figma" />
                        </a>
                        {/* <span className={styles.pipe}>|</span>

                        <button className={styles.toggleBtn} onClick={handleToggle}>
                            <img
                                src={isLight ? lightIcon : darkIcon}
                                alt={isLight ? "Light Mode" : "Dark Mode"}
                            />
                        </button> */}
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <MobileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                isLight={isLight}
                githubIcon={githubIcon}
                figmaIcon={figmaIcon}
                lightIcon={lightIcon}
                darkIcon={darkIcon}
            />
        </>
    );
};

export default GlobalNav;

/**
 * Brand switcher purely visual, but now we do a CSS caret
 */
const BrandSwitcherDropdown = ({ currentBrand, onBrandChange }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);

    const brandIconSrc = BRAND_ICONS[currentBrand] || BRAND_ICONS["Anthem"];

    return (
        <div className={styles.brandSwitcher}>
            <button className={styles.brandButton} onClick={toggleOpen}>
                <img
                    src={brandIconSrc}
                    alt={currentBrand}
                    className={styles.brandButtonIcon}
                />
                {currentBrand}
                {/* The CSS-based chevron icon, pointing down or up */}
                <span
                    className={`${styles.chevronIcon} ${
                        open ? styles.chevronUp : styles.chevronDown
                    }`}
                ></span>
            </button>

            {open && (
                <div className={styles.dropdownBox}>
                    <div
                        className={`${styles.brandRow} ${
                            currentBrand === "Anthem" ? styles.selectedBrand : ""
                        }`}
                        onClick={() => {
                            onBrandChange("Anthem");
                            setOpen(false);
                        }}
                    >
                        <img
                            src={BRAND_ICONS["Anthem"]}
                            alt="Anthem"
                            className={styles.brandRowIcon}
                        />
                        <span className={styles.brandRowText}>Anthem</span>
                    </div>

                    <hr className={styles.brandRowDivider} />
                    <p className={styles.medicaidLabel}>Medicaid</p>

                    <div
                        className={`${styles.brandRow} ${
                            currentBrand === "Healthy Blue" ? styles.selectedBrand : ""
                        }`}
                        onClick={() => {
                            onBrandChange("Healthy Blue");
                            setOpen(false);
                        }}
                    >
                        <img
                            src={BRAND_ICONS["Healthy Blue"]}
                            alt="Healthy Blue"
                            className={styles.brandRowIcon}
                        />
                        <span className={styles.brandRowText}>Healthy Blue</span>
                    </div>

                    <div
                        className={`${styles.brandRow} ${
                            currentBrand === "Wellpoint" ? styles.selectedBrand : ""
                        }`}
                        onClick={() => {
                            onBrandChange("Wellpoint");
                            setOpen(false);
                        }}
                    >
                        <img
                            src={BRAND_ICONS["Wellpoint"]}
                            alt="Wellpoint"
                            className={styles.brandRowIcon}
                        />
                        <span className={styles.brandRowText}>Wellpoint</span>
                    </div>
                </div>
            )}
        </div>
    );
};
