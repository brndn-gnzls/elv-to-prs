// src/components/ComponentDetailStates/ComponentDetailStates.js

import React from "react";
import styles from "./ComponentDetailStates.module.css";

export default function ComponentDetailStates({
                                                  brandPrefix = "anthem-",
                                                  heading = "Button States",
                                                  introParagraph = "",
                                                  leftImages = [],
                                                  rightStates = [],
                                              }) {
    /**
     * We expect:
     * - heading (string) => e.g. "Button States"
     * - introParagraph (string) => a short explanation
     * - leftImages => array of 5 image partial filenames
     * - rightStates => array of 5 objects => { boldTitle, paragraph }
     *
     * We'll ensure we only render up to the smaller of (leftImages.length, rightStates.length).
     */
    const numItems = Math.min(leftImages.length, rightStates.length);

    return (
        <div className={styles.statesWrapper}>
            {/* The heading + short paragraph */}
            <p className={styles.statesHeading}>{heading}</p>
            <p className={styles.statesIntro}>{introParagraph}</p>

            {/* 16px of space */}
            <div style={{ height: "16px" }} />

            <div className={styles.statesGrid}>
                <div className={styles.imagesColumn}>
                    {Array.from({ length: numItems }).map((_, i) => {
                        const finalSrc = `/images/componentDetailAssets/button/overview/${brandPrefix}${leftImages[i]}`;
                        return (
                            <div key={i} style={{ marginBottom: i < numItems - 1 ? "28px" : "0" }}>
                                <img
                                    src={finalSrc}
                                    alt={`Button State ${i}`}
                                    className={styles.stateImage}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className={styles.textColumn}>
                    {Array.from({ length: numItems }).map((_, i) => {
                        const stateBlock = rightStates[i];
                        return (
                            <div
                                key={i}
                                style={{ marginBottom: i < numItems - 1 ? "0" : "0" }}
                            >
                                <p style={{ fontWeight: "bold" }}>{stateBlock.boldTitle}</p>
                                <p>{stateBlock.paragraph}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
