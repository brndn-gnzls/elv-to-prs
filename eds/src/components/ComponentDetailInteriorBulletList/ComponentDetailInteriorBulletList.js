// src/components/ComponentDetailInteriorBulletList/ComponentDetailInteriorBulletList.js

import React from "react";
import styles from "./ComponentDetailInteriorBulletList.module.css";

/**
 * bullets: an array of strings, each containing a colon, e.g. "Height: 45px"
 * We'll split at the first colon, bold the left side, and keep the right side normal.
 *
 * Example usage:
 * <ComponentDetailInteriorBulletList
 *   bullets={[
 *     "Height: 45px",
 *     "Width: Minimum 130px",
 *     "Padding: 48px ↔; 11.5px ↕",
 *     "Font Size: 14px"
 *   ]}
 * />
 */
// export default function ComponentDetailInteriorBulletList({ bullets = [] }) {
//     return (
//         <ul className={styles.bulletList}>
//             {bullets.map((item, idx) => {
//                 // Attempt to split at the first colon
//                 const colonIndex = item.indexOf(":");
//                 if (colonIndex > -1) {
//                     // left part (bold), right part (normal)
//                     const leftPart = item.slice(0, colonIndex).trim();
//                     const rightPart = item.slice(colonIndex + 1).trim();
//                     return (
//                         <li key={idx} className={styles.bulletItem}>
//                             <span className={styles.boldLead}>{leftPart}:</span>
//                             {" "}{rightPart}
//                         </li>
//                     );
//                 } else {
//                     // If no colon found, just show the entire item as normal
//                     return (
//                         <li key={idx} className={styles.bulletItem}>
//                             {item}
//                         </li>
//                     );
//                 }
//             })}
//         </ul>
//     );
// }
export default function ComponentDetailInteriorBulletList({ bullets = [] }) {
    return (
        <ul className={styles.bulletList}>
            {bullets.map((item, idx) => {
                // If item is an object, do something like:
                if (typeof item === "object") {
                    const leftPart = item.boldLead || "";
                    const rightPart = item.body || "";
                    return (
                        <li key={idx} className={styles.bulletItem}>
                            <span className={styles.boldLead}>{leftPart}:</span>{" "}
                            {rightPart}
                        </li>
                    );
                } else if (typeof item === "string") {
                    // fallback for plain strings
                    const colonIndex = item.indexOf(":");
                    if (colonIndex > -1) {
                        const leftPart = item.slice(0, colonIndex).trim();
                        const rightPart = item.slice(colonIndex + 1).trim();
                        return (
                            <li key={idx} className={styles.bulletItem}>
                                <span className={styles.boldLead}>{leftPart}:</span>{" "}
                                {rightPart}
                            </li>
                        );
                    }
                    return <li key={idx}>{item}</li>;
                } else {
                    // unknown
                    return <li key={idx}>{String(item)}</li>;
                }
            })}
        </ul>
    );
}
