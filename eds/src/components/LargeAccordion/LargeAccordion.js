import React, { useState } from "react";
import styles from "./LargeAccordion.module.css";

// fallback sample data for testing.
const PLACEHOLDER_DATA = [
    {
        label: "Test FAQ #1: Lorem question?",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Suspendisse eget eros hendrerit, porttitor risus in, interdum turpis. 
Aliquam non tempus metus, ac efficitur mi. 
Vestibulum consectetur erat non urna semper, at ultricies mauris tempus. 
Ut sit amet interdum dolor.`,
    },
    {
        label: "FAQ #2: More lorem details?",
        content: `Cras non ullamcorper ex, nec egestas lorem. 
Phasellus ornare, arcu id bibendum ultricies, quam tellus mollis nunc, 
quis posuere lacus nibh vel risus. 
Sed vel tempus nulla, eget pretium risus. 
Praesent ut arcu elementum, porta libero sed, lobortis libero.`,
    },
    {
        label: "FAQ #3: Implementation approach?",
        content: `Duis venenatis augue id ornare cursus. 
Curabitur pharetra risus et lorem convallis, nec aliquam odio dictum. 
Nam finibus libero eu tortor dictum, non feugiat sapien blandit. 
Etiam feugiat augue eget sem tincidunt aliquet. 
Proin sodales pharetra massa, eget auctor libero lobortis eget.`,
    },
    {
        label: "FAQ #4: Another question here?",
        content: `Mauris vitae orci nec lorem volutpat pellentesque. 
In faucibus lorem eget arcu convallis, sed cursus magna cursus. 
Integer a sapien a ipsum tempus consectetur. 
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. 
Vestibulum a dapibus neque, vel porta mauris.`,
    },
    {
        label: "FAQ #5: Last sample question?",
        content: `Sed iaculis justo et condimentum elementum. 
Morbi pretium, sapien in tempor tincidunt, ex ipsum tempus libero, 
a molestie leo massa nec mauris. 
Curabitur luctus massa sed sem vehicula, nec mattis sem aliquet. 
Sed risus quam, venenatis id diam eget, blandit porttitor ante. 
Phasellus nec ullamcorper dolor.`,
    },
];

export default function LargeAccordion({ items = [] }) {
    const data = items.length ? items : PLACEHOLDER_DATA;
    const [openIds, setOpenIds] = useState([]);

    const handleToggle = (idx) => {
        setOpenIds((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    };

    return (
        <div className={styles.accordionWrapper}>
            {data.map((item, idx) => {
                const isOpen = openIds.includes(idx);
                return (
                    <div key={idx} className={styles.accordionRow}>
                        <div
                            className={styles.labelRow}
                            onClick={() => handleToggle(idx)}
                        >
                            <span className={styles.labelText}>{item.label}</span>
                            <span className={styles.icon}>{isOpen ? "–" : "+"}</span>
                        </div>
                        <div
                            className={`${styles.contentArea} ${isOpen ? styles.open : ""}`}
                            style={{ maxHeight: isOpen ? "1000px" : "0px" }}
                        >
                            <p>{item.content}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}