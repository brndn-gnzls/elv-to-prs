import React from "react";
import styles from "./NotificationBox.module.css";

export default function NotificationBox({ color = "#000", children }) {
    return (
        <div
            className={styles.notificationBox}
            style={{ borderColor: color }}
        >
            {children}
        </div>
    );
}