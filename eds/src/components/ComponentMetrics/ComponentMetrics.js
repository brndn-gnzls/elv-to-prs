// src/components/ComponentMetrics/ComponentMetrics.js

import React from "react";
import ComponentDetailInteriorBulletList from "../ComponentDetailInteriorBulletList/ComponentDetailInteriorBulletList";
import styles from "./ComponentMetrics.module.css";

export default function ComponentMetrics({
                                             brandPrefix = "anthem-",
                                             heading = "Metrics",
                                             introParagraph = "",
                                             row1Left = {},
                                             row1Right = {},
                                             row2Left = {},
                                             row2Right = {},
                                         }) {
    /**
     * Each "cell" prop (e.g. row1Left) might look like:
     * {
     *   imageSrc: "img-button-metrics-desktop-light-001.svg",
     *   boldTitle: "Large Button",
     *   description: "A paragraph describing large buttons ...",
     *   bulletList: [ // array of lines
     *     "Height(bold): 45px",
     *     "Width(bold): Minimum 130px",
     *     ...
     *   ],
     *   bulletSpacing: 16,  // optional vertical spacing
     *   postBulletParagraph: "Another paragraph about usage..."
     *   topSpacing: 24, // e.g. spacing before bullet list
     *   etc...
     * }
     *
     * We'll handle spacing in code for clarity. Customize as needed.
     */

    return (
        <div className={styles.metricsWrapper}>
            {/* Intro */}
            <h2 className={styles.metricsHeading}>{heading}</h2>
            <p>{introParagraph}</p>
            {/* 32px space */}
            <div style={{ height: "32px" }} />

            {/* 2×2 grid => row 1, row 2 */}
            <div className={styles.metricsGrid}>
                {/* Row 1 */}
                <div className={styles.gridRow}>
                    {/* Left cell */}
                    <Cell
                        brandPrefix={brandPrefix}
                        {...row1Left}
                    />
                    {/* Right cell */}
                    <Cell
                        brandPrefix={brandPrefix}
                        {...row1Right}
                    />
                </div>

                {/* Row 2 */}
                <div className={styles.gridRow}>
                    {/* Left cell */}
                    <Cell
                        brandPrefix={brandPrefix}
                        {...row2Left}
                    />
                    {/* Right cell */}
                    <Cell
                        brandPrefix={brandPrefix}
                        {...row2Right}
                    />
                </div>
            </div>
        </div>
    );
}

function Cell({
                  brandPrefix = "anthem-",
                  imageSrc = "",
                  boldTitle = "",
                  description = "",
                  topSpacing = 24,
                  bulletList = [],          // array of strings => "Height: 45px", etc.
                  postBulletParagraph = "",
              }) {
    const finalSrc = `/images/componentDetailAssets/button/overview/${brandPrefix}${imageSrc}`;

    return (
        <div className={styles.metricsCell}>
            {/* Image */}
            <img
                src={finalSrc}
                alt="Metrics illustration"
                className={styles.metricsImage}
            />

            {/* Bold subheading */}
            <div style={{ height: "16px" }} />
            <p style={{ fontWeight: "bold" }}>{boldTitle}</p>

            {/* Description paragraph */}
            <p>{description}</p>

            {/* topSpacing => e.g. 24px before bullet list */}
            <div style={{ height: `${topSpacing}px` }} />

            {/*
         Instead of manually mapping bulletList,
         let your new interior bullet list handle it:
      */}
            {bulletList.length > 0 && (
                <ComponentDetailInteriorBulletList bullets={bulletList} />
            )}

            {/* if there's a postBulletParagraph, show it below the bullet list */}
            {postBulletParagraph && (
                <>
                    <div style={{ height: "16px" }} />
                    <p>{postBulletParagraph}</p>
                </>
            )}
        </div>
    );
}
