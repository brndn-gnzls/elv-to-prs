import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import ComponentTabs from "../../components/ComponentTabs/ComponentTabs";
import StorybookEmbed from "../../components/StorybookEmbed/StorybookEmbed";
import styles from "./ComponentDetailPage.module.css";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import {useLoading} from "../../LoadingContext";


const GET_COMPONENT_DETAIL = gql`
    query GetComponentDetailPages ($pagination: PaginationArg) {
        componentDetailPages_connection(pagination: $pagination) {
            nodes {
                slug
                bannerBody
                Usage {
                    __typename
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                    ... on ComponentParagraphBlocksParagraphBlock {
                        content
                    }
                    ... on ComponentSpacingBlocksSpacingBlock {
                        height
                    }
                    ... on ComponentSharedBlocksHorizontalRuleBlock {
                        style
                    }
                    ... on ComponentSharedBlocksImageBlock {
                        folder
                        src
                    }
                    ... on ComponentSharedBlocksItalicCaptionSmall {
                        content
                    }
                    ... on ComponentBulletListBlockBulletListBlock {
                        items {
                            boldLead
                            body
                        }
                    }
                    ... on ComponentSharedBlocksNotificationBox {
                        borderColor
                        content
                    }
                }

                Accessibility {
                    __typename
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                    ... on ComponentParagraphBlocksParagraphBlock {
                        content
                    }
                    ... on ComponentSpacingBlocksSpacingBlock {
                        height
                    }
                    ... on ComponentAccessibilityBlocksAccessibilityTableBlock {
                        row {
                            componentName
                            componentStatus
                            test
                        }
                    }
                    ... on ComponentBulletListBlockBulletListBlock {
                        items {
                            boldLead
                            body
                        }
                    }
                    ... on ComponentSharedBlocksHorizontalRuleBlock {
                        style
                    }
                    ... on ComponentSharedBlocksGettingHelpInternalBlock {
                        insert
                    }
                    ... on ComponentSharedBlocksNotificationBox {
                        borderColor
                        content
                    }
                }

                Overview {
                    __typename
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                    ... on ComponentCustomBlocksStorybookModule {
                        componentName
                    }
                    ... on ComponentParagraphBlocksParagraphBlock {
                        content
                    }
                    ... on ComponentSpacingBlocksSpacingBlock {
                        height
                    }
                    ... on ComponentSharedBlocksHorizontalRuleBlock {
                        style
                    }
                    ... on ComponentSharedBlocksImageBlock {
                        folder
                        src
                    }
                    ... on ComponentSharedBlocksItalicCaptionSmall {
                        content
                    }
                    ... on ComponentSharedBlocksGettingHelpInternalBlock {
                        insert
                    }
                    ... on ComponentBulletListBlockBulletListBlock {
                        items {
                            boldLead
                            body
                        }
                    }
                    ... on ComponentIconsBulletListIcon {
                        content
                    }
                    ... on ComponentGridsImageHeadlineCopyGrid {
                        appearanceData {
                            imageSrc
                            heading
                            description
                        }
                    }
                    ... on ComponentGridsStatesSectionBlock {
                        heading
                        introParagraph
                        leftImages {
                            src
                        }
                        rightStates {
                            boldTitle
                            paragraph
                        }
                    }
                    ... on ComponentOverviewBlocksSizeSectionBlock {
                        heading
                        introParagraph
                        imageSrc
                        italicParagraph
                        tableHeadings {
                            size
                            description
                        }
                        tableRows {
                            size
                            description
                            metrics
                        }
                    }
                    ... on ComponentSharedBlocksNotificationBox {
                        borderColor
                        content
                    }
                    ... on ComponentSharedBlocksParagraphHeadline {
                        headline
                    }
                    ... on ComponentGridsMetricSectionBlock {
                        heading
                        introParagraph
                        row1Left {
                            imageSrc
                            description
                            boldTitle
                            topSpacing
                            bulletList {
                                items {
                                    boldLead
                                    body
                                }
                            }
                            postBulletParagraph
                        }
                        row1Right {
                            imageSrc
                            description
                            boldTitle
                            topSpacing
                            bulletList {
                                items {
                                    boldLead
                                    body
                                }
                            }
                            postBulletParagraph
                        }
                        row2Left {
                            imageSrc
                            description
                            boldTitle
                            topSpacing
                            bulletList {
                                items {
                                    boldLead
                                    body
                                }
                            }
                            postBulletParagraph
                        }
                        row2Right {
                            imageSrc
                            description
                            boldTitle
                            topSpacing
                            bulletList {
                                items {
                                    boldLead
                                    body
                                }
                            }
                            postBulletParagraph
                        }
                    }
                    ... on ComponentGridsBestPracticesSectionBlock {
                        heading
                        introParagraph
                        doItems {
                            bestPracticeItem {
                                title
                                color
                                symbol
                                paragraph
                                imageSrc
                            }
                        }
                        dontItems {
                            bestPracticeItem {
                                title
                                color
                                symbol
                                paragraph
                                imageSrc
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * 2) Transform Helpers
 *    - If you want, you can combine them into one
 *      (since usage & accessibility block shapes are similar).
 *    - We’ll keep separate for clarity.
 */

// before your component…
function capitalize(word = "") {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Converts:
 *   "bar-graph"        → "Bar Graph"
 *   "slide-in-panel"   → "Slide-In Panel"
 *   "foo-bar-baz-qux"  → "Foo-Bar Baz Qux"  (first hyphen kept, rest become spaces)
 */
function slugToTitle(slug = "") {
    const parts = slug.split("-");
    if (parts.length <= 2) {
        // two words or fewer: just capitalize & join on space
        return parts.map(capitalize).join(" ");
    }
    // more than two words: keep first hyphen, then spaces
    const firstTwo = parts.slice(0, 2).map(capitalize).join("-");
    const rest = parts.slice(2).map(capitalize).join(" ");
    return `${firstTwo} ${rest}`;
}

// Accessibility transform
function transformAccessibilityBlocks(strapiBlocks = []) {
    return strapiBlocks.map((block) => {
        switch (block.__typename) {
            case "ComponentHeadingBlocksHeadingBlock":
                return {
                    type: block.headingLevel || "h2",
                    content: block.headingText || "",
                };

            case "ComponentParagraphBlocksParagraphBlock":
                return {
                    type: "p",
                    content: block.content || "",
                };

            case "ComponentSharedBlocksNotificationBox":
                return {
                    type: "notificationBox",
                    borderColor: block.borderColor || "#000",
                    content: block.content || "",
                };


            case "ComponentSpacingBlocksSpacingBlock":
                return {
                    type: "spacing",
                    height: block.height || 16,
                };

            case "ComponentAccessibilityBlocksAccessibilityTableBlock":
                return {
                    type: "accessibilityTable",
                    rows: (block.row || []).map((r) => ({
                        component: r.componentName || "",
                        status: r.componentStatus || "",
                        test: r.test || "",
                    })),
                };

            case "ComponentSharedBlocksHorizontalRuleBlock":
                return {
                    type: "hr",
                    style: block.style || null,
                };

            case "ComponentSharedBlocksGettingHelpInternalBlock":
                return {
                    type: "gettingHelpInternal",
                    insert: block.insert || null,
                };

            case "ComponentBulletListBlockBulletListBlock":
                return {
                    type: "bulletList",
                    bullets: (block.items || []).map((item) => ({
                        boldLead: item.boldLead || "",
                        body: item.body || "",
                    })),
                };

            default:
                return {
                    type: "unknown",
                    content: `[Unknown block type: ${block.__typename}]`,
                };
        }
    });
}

// Usage transform
function transformUsageBlocks(strapiBlocks = []) {
    return strapiBlocks.map((block) => {
        switch (block.__typename) {
            case "ComponentHeadingBlocksHeadingBlock":
                return {
                    type: block.headingLevel || "h2",
                    content: block.headingText || "",
                };

            case "ComponentSharedBlocksNotificationBox":
                return {
                    type: "notificationBox",
                    borderColor: block.borderColor || "#000",
                    content: block.content || "",
                };


            case "ComponentSharedBlocksItalicCaptionSmall":
                return {
                    type: "pItalicSmall",
                    content: block.content || null,
                };

            case "ComponentParagraphBlocksParagraphBlock":
                return {
                    type: "p",
                    content: block.content || "",
                };

            case "ComponentSpacingBlocksSpacingBlock":
                return {
                    type: "spacing",
                    height: block.height || 16,
                };

            case "ComponentSharedBlocksHorizontalRuleBlock":
                return {
                    type: "hr",
                    style: block.style || null,
                };

            case "ComponentSharedBlocksImageBlock":
                // e.g. folder: "componentDetailUsage", src: "img-button-usage-desktop-light-001.svg"
                return {
                    type: "img",
                    folder: block.folder || "",
                    src: block.src || "",
                };

            case "ComponentSharedBlocksGettingHelpInternalBlock":
                return {
                    type: "gettingHelpInternal",
                    insert: block.insert || null,
                };

                case "ComponentBulletListBlockBulletListBlock":
                    return {
                        type: "bulletList",
                        bullets: (block.items || []).map((item) => ({
                            boldLead: item.boldLead || "",
                            body: item.body || "",
                        })),
                    };

            default:
                return {
                    type: "unknown",
                    content: `[Unknown usage block: ${block.__typename}]`,
                };
        }
    });
}

function transformTableHead(tableHeadings = []) {
    if (!tableHeadings.length) {
        return ["Size", "Description", ""];
    }
    const first = tableHeadings[0];
    return [first.size || "Size", first.description || "Description", ""];
}

function transformMetricsRowArray(rowArr) {
    if (!rowArr || rowArr.length === 0) {
        return null;
    }

    const row = rowArr[0];
    let bulletItems = [];

    if (row.bulletList && row.bulletList.length > 0) {
        const firstBulletList = row.bulletList[0];
        bulletItems = (firstBulletList.items || []).map((item) => ({
            boldLead: item.boldLead || "",
            body: item.body || "",
        }));
    }

    return {
        imageSrc: row.imageSrc || "",
        boldTitle: row.boldTitle || "",
        description: row.description || "",
        topSpacing: row.topSpacing || 0,
        bulletList: bulletItems,
        postBulletParagraph: row.postBulletParagraph || "",
    };
}

function transformBestPracticeItems(itemsArr) {
    if (!itemsArr || itemsArr.length === 0) return [];

    return itemsArr.flatMap((outer) => {
        const arr = outer.bestPracticeItem || [];
        return arr.map((bp) => ({
            title: bp.title || "",
            color: bp.color || "",
            symbol: bp.symbol || "",
            paragraph: bp.paragraph || "",
            imageSrc: bp.imageSrc || "",
        }));
    });
}

// overview transform
function transformOverviewBlocks(strapiBlocks = []) {
    return strapiBlocks.map((block, idx) => {
        switch (block.__typename) {
            case "ComponentHeadingBlocksHeadingBlock":
                return {
                    type: block.headingLevel || "h2",
                    content: block.headingText || "",
                };

            case "ComponentSharedBlocksItalicCaptionSmall":
                return {
                    type: "pItalicSmall",
                    content: block.content || null,
                };

            case "ComponentSharedBlocksNotificationBox":
                return {
                    type: "notificationBox",
                    borderColor: block.borderColor || "#000",
                    content: block.content || "",
                };

            case "ComponentParagraphBlocksParagraphBlock":
                return {
                    type: "p",
                    content: block.content || "",
                };

            case "ComponentSpacingBlocksSpacingBlock":
                return {
                    type: "spacing",
                    height: block.height || 16,
                };

            case "ComponentSharedBlocksHorizontalRuleBlock":
                return {
                    type: "hr",
                    style: block.style || null,
                };

            case "ComponentSharedBlocksImageBlock":
                // e.g. folder: "componentDetailUsage", src: "img-button-usage-desktop-light-001.svg"
                return {
                    type: "img",
                    folder: block.folder || "",
                    src: block.src || "",
                };

            case "ComponentSharedBlocksGettingHelpInternalBlock":
                return {
                    type: "gettingHelpInternal",
                    insert: block.insert || null,
                };

            case "ComponentBulletListBlockBulletListBlock":
                return {
                    type: "bulletList",
                    bullets: (block.items || []).map((item) => ({
                        boldLead: item.boldLead || "",
                        body: item.body || "",
                    })),
                };

            case "ComponentIconsBulletListIcon":
                return {
                    type: "pBold",
                    content: block.content || null,
                };

            case "ComponentGridsImageHeadlineCopyGrid":
                return {
                    type: "appearanceSection",
                    appearanceData: (block.appearanceData || []).map((item) => ({
                        imageSrc: item.imageSrc || "",
                        heading: item.heading || "",
                        description: item.description || "",
                    })),
                };

            case "ComponentGridsStatesSectionBlock":
                return {
                    type: "statesSection",
                    heading: block.heading || "",
                    introParagraph: block.introParagraph || "",
                    leftImages: (block.leftImages || []).map((img) => img.src || ""),
                    rightStates: (block.rightStates || []).map((state) => ({
                        boldTitle: state.boldTitle || "",
                        paragraph: state.paragraph || "",
                    })),
                };

            case "ComponentOverviewBlocksSizeSectionBlock":
                return {
                    type: "sizeSection",
                    heading: block.heading || "",
                    introParagraph: block.introParagraph || "",
                    imageSrc: block.imageSrc || "",
                    italicParagraph: block.italicParagraph || "",
                    tableHead: transformTableHead(block.tableHeadings),
                    tableRows: (block.tableRows || []).map((row) => ({
                        size: row.size || "",
                        description: row.description || "",
                        metrics: row.metrics || "",
                    })),
                };

            case "ComponentSharedBlocksParagraphHeadline":
                return {
                    type: "pBold",
                    content: block.headline || null,
                };

            case "ComponentGridsMetricSectionBlock":
                return {
                    type: "metricsSection",
                    heading: block.heading || "",
                    introParagraph: block.introParagraph || "",
                    row1Left: transformMetricsRowArray(block.row1Left),
                    row1Right: transformMetricsRowArray(block.row1Right),
                    row2Left: transformMetricsRowArray(block.row2Left),
                    row2Right: transformMetricsRowArray(block.row2Right),
                };

            case "ComponentGridsBestPracticesSectionBlock":
                return {
                    type: "bestPracticesSection",
                    heading: block.heading || "",
                    introParagraph: block.introParagraph || "",
                    doItems: transformBestPracticeItems(block.doItems),
                    dontItems: transformBestPracticeItems(block.dontItems),
                };

            case "ComponentCustomBlocksStorybookModule":
                // Render the Storybook iframe directly for this block
                return {
                    type: "storybook",
                    componentName: block.componentName || "",
                    key: `storybook-${idx}`,
                };

            default:
                return {
                    type: "unknown",
                    content: `[Unknown overview block: ${block.__typename}]`,
                };
        }
    });
}

const COMPONENT_NAME = "ComponentDetailPage";

const ComponentDetailPage = () => {
    // 1) read param => e.g. "button", "checkbox", etc.
    const { slug } = useParams();
    const { startLoading, stopLoading } = useLoading();
    const [currentBrand, setCurrentBrand] = useState("Anthem");

    // 2) fetch all detail pages
    const { loading, error, data } = useQuery(GET_COMPONENT_DETAIL, {
        variables: {
            pagination: {
                page: 1,
                pageSize: 100,
            },
        },
    });

    // <- Start global loading indicator on component mount
    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    // <- Stop global loading indicator when query completes
    useEffect(() => {
        if (!loading) stopLoading(COMPONENT_NAME);
    }, [loading, stopLoading]);

    // <- Removed local loading/error UI, delegate fully to global loader
    if (loading || error) return null;

    // 3) find the correct node
    const detailNodes = data?.componentDetailPages_connection?.nodes || [];
    const detailEntry = detailNodes.find((node) => node.slug === slug);

    if (!detailEntry) {
        return <p>No component detail found for “{slug}” in Strapi.</p>;
    }

    // pull bannerBody off the matched entry
    const bannerHeading = slugToTitle(slug);
    const bannerBody = detailEntry.bannerBody;

    // 5) transform blocks from Strapi
    const usageBlocks = transformUsageBlocks(detailEntry.Usage || []);
    const accessibilityBlocks = transformAccessibilityBlocks(detailEntry.Accessibility || []);
    const overviewBlocks = transformOverviewBlocks(detailEntry.Overview || []);

    // 6) tabs => Overview, Usage, Accessibility
    const tabsData = [
        { label: "Overview", blocks: overviewBlocks },
        { label: "Usage", blocks: usageBlocks },
        { label: "Accessibility", blocks: accessibilityBlocks },
    ];

    return (
        <>
            <ScrollToTop />
            <GlobalNav
                showBrandSwitcher
                currentBrand={currentBrand}
                onBrandChange={setCurrentBrand}
            />


            {/* Use containerRow to center and flex */}
            <div className={styles.containerRow}>
                <LeftRail />
                <div className={styles.rightSide}>
                    <ComponentTabs
                        currentBrand={currentBrand}
                        bannerHeading={bannerHeading}
                        bannerBody={bannerBody}
                        tabsData={tabsData}
                    />
                </div>
            </div>
            <BackToTopButton />
            <GlobalFooter />
        </>
    );
};

export default ComponentDetailPage;