// src/pages/GetStartedDevelopPage/GetStartedDevelopPage.js

import React, { useEffect } from "react"; // <- added useEffect import
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import DevTabs from "../../components/DevTabs/DevTabs";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";

import { useLoading } from "../../LoadingContext"; // <- added context hook import

import styles from "./GetStartedDevelopPage.module.css";

const GET_ALL_INTERNALS = gql`
    query GetAllInternals {
        gettingStartedInternals {
            slug
            bannerHeading
            bannerBody
            bannerImage
            tabs
            faqItems {
                label
                content
            }
        }
    }
`;

const COMPONENT_NAME = "GetStartedDevelopPage"; // <- added component name for context

export default function GetStartedDevelopPage() {
    const { startLoading, stopLoading } = useLoading(); // <- use global loading context

    const { loading, error, data } = useQuery(GET_ALL_INTERNALS);

    // <- Start global loading indicator on component mount
    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    // <- Stop global loading indicator when Apollo loading finishes
    useEffect(() => {
        if (!loading) stopLoading(COMPONENT_NAME);
    }, [loading, stopLoading]);

    // <- Removed local loader/error UI (return null instead)
    if (loading || error) return null;

    const allInternals = data.gettingStartedInternals || [];
    const developPage = allInternals.find((entry) => entry.slug === "develop");

    if (!developPage) {
        return <p>No develop data found in Strapi</p>;
    }

    const { bannerHeading, bannerBody, bannerImage, tabs, faqItems } = developPage;

    const tabsData = tabs.map((tab) => ({
        label: tab.label,
        blocks: tab.blocks.map((block) => {
            if (block.type === "largeAccordion") {
                return {
                    type: "largeAccordion",
                    items: faqItems,
                };
            }
            return block;
        }),
    }));

    return (
        <>
            <GlobalNav />

            <div className={styles.containerRow}>
                <LeftRail />
                <div className={styles.rightSide}>
                    <DevTabs
                        bannerHeading={bannerHeading}
                        bannerBody={bannerBody}
                        bannerImage={bannerImage}
                        tabsData={tabsData}
                    />
                </div>
            </div>

            <GlobalFooter />
        </>
    );
}