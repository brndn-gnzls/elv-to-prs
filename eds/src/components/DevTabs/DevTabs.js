// src/components/DevTabs/DevTabs.js

import React, { useState } from "react";
import styles from "./DevTabs.module.css";
import GettingHelpInternal from "../GettingHelpInteral/GettingHelpInternal";
import LargeAccordion from "../LargeAccordion/LargeAccordion";
import ResourceGrid from "../ResourceGrid/ResourceGrid";


/**
 * DevTabs expects 4 props:
 * - bannerHeading
 * - bannerBody
 * - bannerImage
 * - tabsData (array of 3 items: each { label, blocks })
 *
 * Example tabsData:
 * [
 *   { label: "Get Started", blocks: [ { type: "h2", content: "…" }, … ] },
 *   { label: "Developer Resources", blocks: […] },
 *   { label: "FAQs", blocks: […] }
 * ]
 */
const DevTabs = ({
                     bannerHeading,
                     bannerBody,
                     bannerImage,
                     tabsData = [],
                 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabClick = (i) => setActiveIndex(i);

    const currentTabBlocks = tabsData[activeIndex]?.blocks || [];

    return (
        <div className={styles.devTabsContainer}>
            <div className={styles.pinnedArea}>
                 <div
                    className={styles.banner}
                    style={{ backgroundImage: `url("${bannerImage}")` }}
                >
                    <h1>{bannerHeading}</h1>
                    <p>{bannerBody}</p>
                </div>          {/* pinned area => banner + tab bar */}
 

                <div className={styles.tabBar}>
                    {tabsData.map((tabItem, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleTabClick(idx)}
                                className={`${styles.tabButton} ${
                                    isActive ? styles.active : ""
                                }`}
                            >
                                {tabItem.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* content area */}
            <div className={styles.tabContent}>
                {currentTabBlocks.map((block, idx) => renderBlock(block, idx))}
            </div>
        </div>
    );
};

function renderBlock(block, idx) {
    switch (block.type) {
        case "h2":
            return <h2 key={idx}>{block.content}</h2>;

        case "h3":
            return <h3 key={idx}>{block.content}</h3>;

        case "h4":
            return <h4 key={idx}>{block.content}</h4>;

        case "p":
            return (
                <p
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: block.content }}
                />
            );

        case "pBold":
            return (
                <p
                    key={idx}
                    style={{ fontWeight: "bold" }}
                    dangerouslySetInnerHTML={{ __html: block.content }}
                />
            );

        case "pItalicSmall":
            return (
                <p
                    key={idx}
                    style={{ fontStyle: "italic", fontSize: "14px" }}
                    dangerouslySetInnerHTML={{ __html: block.content }}
                />
            );

        // (Keep all your existing cases unchanged)

        case "link":
            return (
                <p key={idx} style={{ margin: "16px 0" }}>
                    <a
                        href={block.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#1a73e8",
                            textDecoration: "underline",
                        }}
                    >
                        {block.label}
                    </a>
                </p>
            );

        case "singleBullet":
            return (
                <div
                    key={idx}
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        margin: "8px 0 0 0",
                    }}
                >
                    <span style={{ marginRight: "8px", lineHeight: 1.5 }}>
                        &bull;
                    </span>
                    <span>{block.label}</span>
                </div>
            );

        case "spacing":
            return <div key={idx} style={{ height: block.height || 16 }} />;

        case "img":
            return (
                <img
                    key={idx}
                    src={block.src}
                    alt=""
                    style={{ margin: "16px 0", maxWidth: "100%" }}
                />
            );

        case "hr":
            return (
                <hr
                    key={idx}
                    style={{
                        border: 0,
                        borderTop: `1px solid ${block.color || "#eeeeee"}`,
                        margin: "16px 0",
                    }}
                />
            );

        case "gettingHelpInternal":
            return (
                <div key={idx}>
                    <GettingHelpInternal />
                </div>
            );

        case "largeAccordion":
            return <LargeAccordion key={idx} items={block.items} />;

        case "resourceGrid":
            return <ResourceGrid key={idx} items={block.items} />;

        default:
            return (
                <div key={idx} style={{ color: "red" }}>
                    [Unknown block type: {block.type}]
                </div>
            );
    }
}


export default DevTabs;