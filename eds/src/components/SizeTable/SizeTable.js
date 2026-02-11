// src/components/SizeTable/SizeTable.js

import React from "react";
import styles from "./SizeTable.module.css";

export default function SizeTable({
                                      brandPrefix = "anthem-",
                                      heading = "Size",
                                      introParagraph = "",
                                      imageSrc = "",
                                      italicParagraph = "",
                                      tableHead = ["Size", "Description", "Metrics"],
                                      tableRows = [],
                                  }) {
    /**
     * Example tableRows item:
     * {
     *   size: "Large",
     *   description: "Large buttons are designed for ...",
     *   metrics: "Height: 44px\nFont Size: 14px\nInternal Padding: 48px"
     * }
     *
     * We show metrics in a dedicated 3rd column on large screens,
     * but on small screens we hide that entire 3rd column and
     * place metrics below the size label in the 1st column.
     */

    const finalImagePath = `/images/componentDetailAssets/button/overview/${brandPrefix}${imageSrc}`;

    return (
        <div className={styles.sizeWrapper}>
            {/* Heading (bold) + normal paragraph */}
            <p className={styles.boldHeading}>{heading}</p>
            <p>{introParagraph}</p>
            <div style={{ height: "16px" }} />

            {/* Brand-based image */}
            <img
                src={finalImagePath}
                alt="Size illustration"
                className={styles.sizeImage}
            />
            <div style={{ height: "16px" }} />

            {/* Italic paragraph */}
            <p className={styles.italicPara}>{italicParagraph}</p>
            <div style={{ height: "24px" }} />

            {/* The 3-column table on large screens, but effectively 2-col on mobile */}
            <table className={styles.sizeTable}>
                <thead>
                <tr>
                    {tableHead.map((colName, idx) => (
                        <th key={idx}>{colName}</th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {tableRows.map((row, idx) => (
                    <tr key={idx}>
                        {/* Size Column */}
                        <td className={styles.sizeColumn}>
                            <div>
                                <strong>{row.size}</strong>
                            </div>

                            {/* On small screens, show metrics below the size label */}
                            <div className={styles.sizeColumnMobileMetrics}>
                                {row.metrics.split("\n").map((line, i2) => (
                                    <div key={i2}>{line}</div>
                                ))}
                            </div>
                        </td>

                        {/* Description Column */}
                        <td className={styles.descriptionColumn}>
                            {row.description}
                        </td>

                        {/* Metrics Column (hidden on small) */}
                        <td className={styles.metricsColumn}>
                            {row.metrics.split("\n").map((line, i2) => (
                                <div key={i2}>{line}</div>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}