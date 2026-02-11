// src/components/ComponentDetailBestPractices/ComponentDetailBestPractices.js

import React from "react";
import styles from "./ComponentDetailBestPractices.module.css";

export default function ComponentDetailBestPractices({
                                                         heading = "Best Practices",
                                                         introParagraph = "",
                                                         doItems = [],    // 3 “Do” objects
                                                         dontItems = [],  // 3 “Don’t” objects
                                                         brandPrefix = "anthem-",
                                                     }) {
    /**
     * Example usage:
     * {
     *   type: "bestPracticesSection",
     *   heading: "Best Practices",
     *   introParagraph: "Ensuring that buttons ...",
     *   doItems: [
     *     {
     *       title: "Use Clear and Concise Labeling",
     *       color: "#007032",
     *       symbol: "✓",
     *       paragraph: "Do use actionable, precise language...",
     *       imageSrc: "img-button-best-practices-desktop-light-001.svg"
     *     },
     *     ... 2 more
     *   ],
     *   dontItems: [
     *     {
     *       title: "Avoid Using Vague or Long Labeling",
     *       color: "#BF1722",
     *       symbol: "✗",
     *       paragraph: "Don't use ambiguous terms or lengthy ...",
     *       imageSrc: "img-button-best-practices-desktop-light-002.svg"
     *     },
     *     ... 2 more
     *   ]
     * }
     *
     * We'll map each array's 3 items: row1 => doItems[0], dontItems[0], etc.
     */

        // For safety, only map up to min length of 3. If there's exactly 3 each, perfect.
    const rowCount = Math.min(doItems.length, dontItems.length, );

    return (
        <div className={styles.bestWrapper}>
            <h2 className={styles.bestHeading}>{heading}</h2>
            <p>{introParagraph}</p>
            {/* 64px space */}
            <div style={{ height: "64px" }} />

            {/* We'll render row by row => each row has a DO item (left) + a DONT item (right) */}
            <div className={styles.bpGrid}>
                {Array.from({ length: rowCount }).map((_, rowIndex) => {
                    const doItem = doItems[rowIndex];
                    const dontItem = dontItems[rowIndex];
                    return (
                        <div key={rowIndex} className={styles.bpRow}>
                            {/* Left col => do item */}
                            <PracticeCell
                                brandPrefix={brandPrefix}
                                item={doItem}
                                defaultColor="#007032"
                                defaultSymbol="✓"
                            />
                            {/* Right col => dont item */}
                            <PracticeCell
                                brandPrefix={brandPrefix}
                                item={dontItem}
                                defaultColor="#BF1722"
                                defaultSymbol="✗"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Simple markdown-to-HTML (bold only)
function markdownBold(input) {
    return input.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function PracticeCell({
                          brandPrefix = "anthem-",
                          item = {},
                          defaultColor = "#007032",
                          defaultSymbol = "✓",
                      }) {
    const color = item.color || defaultColor;
    const symbol = defaultSymbol;
    const finalSrc = `/images/componentDetailAssets/button/overview/${brandPrefix}${item.imageSrc || ""}`;

    // Apply the bold markdown transformation
    const htmlContent = markdownBold(item.paragraph || "");

    return (
        <div className={styles.practiceCell}>
            <div className={styles.headingRow}>
                <div className={styles.iconCircle} style={{ backgroundColor: color }}>
                    {symbol}
                </div>
                <p className={styles.cellTitle} style={{ color }}>
                    {item.title}
                </p>
            </div>

            {/* Safely inject transformed HTML */}
            <p
                className={styles.cellParagraph}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {item.imageSrc && (
                <img
                    src={finalSrc}
                    alt="best practice"
                    className={styles.practiceImage}
                />
            )}
        </div>
    );
}