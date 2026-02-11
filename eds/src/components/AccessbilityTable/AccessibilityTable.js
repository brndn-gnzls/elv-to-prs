import React from "react";
import styles from "./AccessibilityTable.module.css";

export default function AccessibilityTable({ rows = [] }) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.accessTable}>
                <thead>
                <tr>
                    <th>Component</th>
                    <th>Accessibility Test</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx}>
                        <td>{row.component}</td>
                        <td>{row.test}</td>
                        <td>{row.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}