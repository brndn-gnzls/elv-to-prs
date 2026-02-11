// src/components/ComponentTabs/ComponentTabs.js

import React, { useState } from "react";
import styles from "./ComponentTabs.module.css";

import GettingHelpInternal from "../../components/GettingHelpInteral/GettingHelpInternal";
import LargeAccordion from "../LargeAccordion/LargeAccordion";
import ComponentDetailAppearance from "../ComponentDetailAppearance/ComponentDetailAppearance";
import ComponentDetailStates from "../ComponentDetailStates/ComponentDetailStates";
import SizeTable from "../SizeTable/SizeTable";
import ComponentDetailIcons from "../ComponentDetailIcons/ComponentDetailIcons";
import ComponentMetrics from "../ComponentMetrics/ComponentMetrics";
import ComponentDetailBestPractices from "../ComponentDetailBestPractices/ComponentDetailBestPractices";
import BulletList from "../BulletList/BulletList";
import ComponentDetailInteriorBulletList from "../ComponentDetailInteriorBulletList/ComponentDetailInteriorBulletList";
import AccessibilityTable from "../AccessbilityTable/AccessibilityTable";
import StorybookEmbed from "../StorybookEmbed/StorybookEmbed";
import NotificationBox from "../NotificationBox/NotificationBox";

export default function ComponentTabs({
                                          currentBrand = "Anthem",
                                          bannerHeading,
                                          bannerBody,
                                          tabsData = [],
                                      }) {
    const [activeIndex, setActiveIndex] = useState(0);

    let brandPrefix = "anthem-";
    if (currentBrand === "Healthy Blue") brandPrefix = "healthyblue-";
    if (currentBrand === "Wellpoint")   brandPrefix = "wellpoint-";

    const handleTabClick = (idx) => setActiveIndex(idx);
    const currentBlocks = tabsData[activeIndex]?.blocks || [];

    return (
        <div className={styles.componentTabsContainer}>
            <div className={styles.pinnedArea}>
                <div className={styles.banner}>
                    <h1>{bannerHeading}</h1>
                    <p>{bannerBody}</p>
                </div>
                <div className={styles.tabBar}>
                    {tabsData.map((tab, i) => {
                        const isActive = i === activeIndex;
                        return (
                            <button
                                key={i}
                                onClick={() => handleTabClick(i)}
                                className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.tabContent} data-main-content>
                {currentBlocks.map((block, i) => renderBlock(block, i, brandPrefix))}
            </div>
        </div>
    );
}

function renderBlock(block, idx, brandPrefix) {
    switch (block.type) {
        case "h2":
            return <h2 key={idx}>{block.content}</h2>;

        case "h3":
            return <h3 key={idx}>{block.content}</h3>;

        case "p":
            return <p key={idx}>{block.content}</p>;

        case "link":
            return (
                <p key={idx} style={{ margin: "16px 0" }}>
                    <a
                        href={block.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#1a73e8",
                            textDecoration: "underline"
                        }}
                    >
                        {block.label}
                    </a>
                </p>
            );

        case "singleBullet":
            return (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", margin: "8px 0" }}>
                    <span style={{ fontSize: "1.2em", marginRight: "8px", lineHeight: 1.5 }}>&bull;</span>
                    <span>{block.label}</span>
                </div>
            );

        case "pBold":
            return (
                <p
                    key={idx}
                    style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}
                >
                    {block.content}
                </p>
            );

        case "pItalicSmall":
            return (
                <p key={idx} style={{ fontStyle: "italic", fontSize: "14px" }}>
                    {block.content}
                </p>
            );

        case "spacing":
            return <div key={idx} style={{ height: block.height || 16 }} />;

        case "hr":
            return (
                <hr
                    key={idx}
                    style={{ border: 0, borderTop: "1px solid #eeeeee", margin: "16px 0" }}
                />
            );

        case "img": {
            // fallback to “overview” if folder not specified
            const folder = block.folder ?? "overview";
            // e.g. “button/usage/anthem-img.png”
            const finalSrc = `/images/componentDetailAssets/button/${folder}/${brandPrefix}${block.src}`;

            return (
                <img
                    key={idx}
                    src={finalSrc}
                    alt="component detail"
                    style={{ margin: "16px 0", maxWidth: "100%", height: "auto" }}
                />
            );
        }

        case "demoPlaceholder":
            return (
                <div
                    key={idx}
                    style={{
                        width: "650px",
                        height: "340px",
                        border: "1px solid #eee",
                        margin: "16px 0",
                    }}
                />
            );

        case "gettingHelpInternal":
            return <GettingHelpInternal key={idx} />;

        case "largeAccordion":
            return <LargeAccordion key={idx} />;

        case "bestPracticeDo":
            return (
                <div key={idx} className={styles.bpBlock}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        <div
                            className={styles.bpIconCircle}
                            style={{ backgroundColor: block.content.color }}
                        >
                            ✓
                        </div>
                        <p style={{ color: block.content.color, fontWeight: "bold" }}>
                            {block.content.title}
                        </p>
                    </div>
                    <p>{block.content.body}</p>
                    <img
                        src={`/images/componentDetailAssets/button/overview/${brandPrefix}${block.content.img}`}
                        alt="best practice do"
                        style={{ marginTop: "16px", maxWidth: "100%" }}
                    />
                </div>
            );

        case "bestPracticeDont":
            return (
                <div key={idx} className={styles.bpBlock}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        <div
                            className={styles.bpIconCircle}
                            style={{ backgroundColor: block.content.color }}
                        >
                            ✗
                        </div>
                        <p style={{ color: block.content.color, fontWeight: "bold" }}>
                            {block.content.title}
                        </p>
                    </div>
                    <p>{block.content.body}</p>
                    <img
                        src={`/images/componentDetailAssets/button/overview/${brandPrefix}${block.content.img}`}
                        alt="best practice dont"
                        style={{ marginTop: "16px", maxWidth: "100%" }}
                    />
                </div>
            );

        case "appearanceSection":
            return (
                <ComponentDetailAppearance
                    key={idx}
                    brandPrefix={brandPrefix}
                    blocks={block.appearanceData}
                />
            );

        case "statesSection":
            return (
                <ComponentDetailStates
                    key={idx}
                    brandPrefix={brandPrefix}
                    heading={block.heading}
                    introParagraph={block.introParagraph}
                    leftImages={block.leftImages}
                    rightStates={block.rightStates}
                />
            );

        case "sizeSection":
            return (
                <SizeTable
                    key={idx}
                    brandPrefix={brandPrefix}
                    heading={block.heading}
                    introParagraph={block.introParagraph}
                    imageSrc={block.imageSrc}
                    italicParagraph={block.italicParagraph}
                    tableHead={block.tableHead}
                    tableRows={block.tableRows}
                />
            );

        case "iconSection":
            return (
                <ComponentDetailIcons
                    key={idx}
                    brandPrefix={brandPrefix}
                    heading={block.heading}
                    introParagraph={block.introParagraph}
                    leftImageSrc={block.leftImageSrc}
                    leftBoldTitle={block.leftBoldTitle}
                    leftParagraph={block.leftParagraph}
                    rightImageSrc={block.rightImageSrc}
                    rightBoldTitle={block.rightBoldTitle}
                    rightParagraph={block.rightParagraph}
                />
            );

        case "metricsSection":
            return (
                <ComponentMetrics
                    key={idx}
                    brandPrefix={brandPrefix}
                    heading={block.heading}
                    introParagraph={block.introParagraph}
                    row1Left={block.row1Left}
                    row1Right={block.row1Right}
                    row2Left={block.row2Left}
                    row2Right={block.row2Right}
                />
            );

        case "bestPracticesSection":
            return (
                <ComponentDetailBestPractices
                    key={idx}
                    brandPrefix={brandPrefix}
                    heading={block.heading}
                    introParagraph={block.introParagraph}
                    doItems={block.doItems}
                    dontItems={block.dontItems}
                />
            );

        case "bulletList":
            return <BulletList key={idx} bullets={block.bullets} />;

        case "interiorBulletList":
            return (
                <ComponentDetailInteriorBulletList
                    key={idx}
                    bullets={block.bullets}
                />
            );

        case "notificationBox":
            return (
                <NotificationBox key={idx} color={block.borderColor}>
                    {/* If you want to support links and formatting, use dangerouslySetInnerHTML */}
                    <div dangerouslySetInnerHTML={{ __html: block.content }} />
                </NotificationBox>
            );

        case "accessibilityTable":
            return <AccessibilityTable key={idx} rows={block.rows || []} />;

        case "storybook":
            // We use idx here as the key, and pass componentName + a default story="primary"
            return (
                <StorybookEmbed
                    key={idx}
                    componentName={block.componentName}
                    story="default"
                />
            );

        default:
            return (
                <div key={idx} style={{ color: "red" }}>
                    [Unknown block: {block.type}]
                </div>
            );
    }
}