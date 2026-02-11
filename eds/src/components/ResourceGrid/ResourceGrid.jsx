// src/components/ResourceGrid/ResourceGrid.jsx
import React from 'react';
import styles from './ResourceGrid.module.css';

const ResourceGrid = ({ items = [] }) => {
    return (
        <div className={styles.grid}>
            {items.map((item, idx) => (
                <div key={idx} className={styles.card}>
                    <img
                        src={`/images/gettingStartedDesign/${item.logoFilename}`}
                        className={styles.logo}
                        alt={item.linkLabel}
                    />
                    <div className={styles.body}>
                        <a
                            href={item.linkUrl}
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.linkLabel}
                        </a>
                        <p className={styles.desc}>{item.description}</p>
                    </div>
                    <img
                        src={`/images/gettingStartedDesign/${item.iconFilename}`}
                        className={styles.icon}
                        alt=""
                    />
                </div>
            ))}
        </div>
    );
};

export default ResourceGrid;