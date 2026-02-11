// src/components/ComponentDetailIcons/ComponentDetailIcons.js

import React from "react";
import styles from "./ComponentDetailIcons.module.css";

export default function ComponentDetailIcons({
                                                 brandPrefix = "anthem-",
                                                 heading = "Icon",
                                                 introParagraph = "",
                                                 leftImageSrc = "",
                                                 leftBoldTitle = "",
                                                 leftParagraph = "",
                                                 rightImageSrc = "",
                                                 rightBoldTitle = "",
                                                 rightParagraph = "",
                                             }) {
    /**
     * We expect something like:
     * heading: "Icon"
     * introParagraph: "Icons in buttons enhance..."
     * leftImageSrc: "img-button-options-desktop-light-014.png"
     * leftBoldTitle: "Leading Icon"
     * leftParagraph: "Leading icons are positioned..."
     * rightImageSrc: "img-button-options-desktop-light-015.png"
     * rightBoldTitle: "External Link / Trailing Icon"
     * rightParagraph: "Trailing icons appear after..."
     *
     * We'll create a single row / 2-col layout:
     * left column => image + boldTitle + paragraph
     * right column => image + boldTitle + paragraph
     */

        // Final brand-based image paths
    const finalLeftSrc = `/images/componentDetailAssets/button/overview/${brandPrefix}${leftImageSrc}`;
    const finalRightSrc = `/images/componentDetailAssets/button/overview/${brandPrefix}${rightImageSrc}`;

    return (
        <div className={styles.iconsWrapper}>
            <p className={styles.iconsHeading}>{heading}</p>
            <p>{introParagraph}</p>
            <div style={{ height: "16px" }} />

            <div className={styles.iconsGrid}>
                {/* Left column */}
                <div className={styles.iconColumn}>
                    <img src={finalLeftSrc} alt="Left Icon" className={styles.iconImage} />
                    <p style={{ fontWeight: "bold", marginTop: "16px" }}>{leftBoldTitle}</p>
                    <p>{leftParagraph}</p>
                </div>

                {/* Right column */}
                <div className={styles.iconColumn}>
                    <img src={finalRightSrc} alt="Right Icon" className={styles.iconImage} />
                    <p style={{ fontWeight: "bold", marginTop: "16px" }}>{rightBoldTitle}</p>
                    <p>{rightParagraph}</p>
                </div>
            </div>
        </div>
    );
}