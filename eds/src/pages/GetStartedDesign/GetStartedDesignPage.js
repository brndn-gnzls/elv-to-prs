// src/pages/GetStartedDesignPage/GetStartedDesignPage.js

import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import DevTabs from "../../components/DevTabs/DevTabs";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import ResourceGrid from "../../components/ResourceGrid/ResourceGrid";
import { useLoading } from "../../LoadingContext";

import styles from "./GetStartedDesignPage.module.css";

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

const COMPONENT_NAME = "GetStartedDesignPage";

export default function GetStartedDesignPage() {
    const { startLoading, stopLoading } = useLoading();

    const { loading, error, data } = useQuery(GET_ALL_INTERNALS);

    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    useEffect(() => {
        if (!loading) stopLoading(COMPONENT_NAME);
    }, [loading, stopLoading]);

    if (loading || error) return null;

    const allInternals = data.gettingStartedInternals || [];
    const designPage = allInternals.find((entry) => entry.slug === "design");

    if (!designPage) {
        return <p>No design data found in Strapi</p>;
    }

    const { bannerHeading, bannerBody, bannerImage, tabs, faqItems } = designPage;

    const tabsData = tabs.map((tab) => ({
        label: tab.label,
        blocks: tab.blocks.map((block) =>
            block.type === "largeAccordion"
                ? {
                    type: "largeAccordion",
                    items: faqItems,
                }
                : block
        ),
    }));

    return (
        <>
            <GlobalNav />

            <div className={styles.containerRow}>
                <LeftRail />
                <div className={styles.rightSide}>
                    <ResourceGrid />
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