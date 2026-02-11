// src/components/BulletList/BulletList.js

import React from "react";
import styles from "./BulletList.module.css";

/**
 * bullets: an array of objects, each with:
 * {
 *   boldLead: "Consistency is Key:",
 *   body: "Maintain consistent use of ..."
 * }
 */
export default function BulletList({ bullets = [] }) {
    return (
        <ul className={styles.bulletList}>
            {bullets.map((item, i) => (
                <li key={i} className={styles.bulletItem}>
                    <span className={styles.boldLead}>{item.boldLead} </span>
                    {item.body}
                </li>
            ))}
        </ul>
    );
}