import React from "react";
import styles from "./ComponentDetailAppearance.module.css";

function ComponentDetailAppearance({ brandPrefix = "anthem-", blocks = [] }) {

    return (
        <div className={styles.appearanceWrapper}>
            <div className={styles.appearanceGrid}>
                {blocks.map((block, index) => {
                    const finalSrc = `/images/componentDetailAssets/button/overview/${brandPrefix}${block.imageSrc}`;

                    return (
                        <div key={index} className={styles.appearanceBlock}>
                            <img
                                src={finalSrc}
                                alt="appearance block"
                                className={styles.appearanceImage}
                            />
                            <div style={{ height: "16px", marginBottom: "8px" }} />
                            <p style={{ fontWeight: "bold" }}>{block.heading}</p>
                            <p>{block.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ComponentDetailAppearance;