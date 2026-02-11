// src/pages/ComponentCatalogPage/ComponentCatalogPage.js

import React, { useState, useEffect } from "react"; // <- Added useEffect
import { useQuery, gql } from "@apollo/client";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import GettingHelpInternal from "../../components/GettingHelpInteral/GettingHelpInternal";
import styles from "./ComponentCatalogPage.module.css";
import { Link } from "react-router-dom";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import { useLoading } from "../../LoadingContext"; // <- Added useLoading


// GraphQL queries as you specified
const GET_CATALOG_INVENTORIES = gql`
    query ComponentCatalogInventories($pagination: PaginationArg) {
        componentCatalogInventories(pagination: $pagination) {
            documentId
            imageUrl
            title
            description
            slug
        }
    }
`;

const GET_CATALOG_MASTHEAD = gql`
    query ComponentCatalogMasthead {
        componentCatalogMasthead {
            headline
            body
        }
    }
`;

const GET_GENERAL_H2_LOCKUP = gql`
    query GeneralH2Lockup {
        generalH2Lockup {
            headline
            body
        }
    }
`;

const COMPONENT_NAME = "ComponentCatalogPage"; // <- Component name for global loading

const ComponentCatalogPage = () => {
    // 1) Brand switch state (local)
    const [currentBrand, setCurrentBrand] = useState("Anthem");
    const { startLoading, stopLoading } = useLoading(); // <- Global loading hook
    // 2) Apollo queries
    // a) fetch all inventory items with pagination = {pageSize: 100}
    const {
        loading: invLoading,
        error: invError,
        data: invData,
    } = useQuery(GET_CATALOG_INVENTORIES, {
        variables: { pagination: { pageSize: 100 } },
    });

    // b) fetch the masthead single type
    const {
        loading: mastLoading,
        error: mastError,
        data: mastData,
    } = useQuery(GET_CATALOG_MASTHEAD);

    // c) fetch the h2 lockup single type
    const {
        loading: h2Loading,
        error: h2Error,
        data: h2Data,
    } = useQuery(GET_GENERAL_H2_LOCKUP);

    // <- Start global loading indicator on component mount
    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    // <- Stop global loading indicator when all queries finish
    useEffect(() => {
        if (!invLoading && !mastLoading && !h2Loading) {
            stopLoading(COMPONENT_NAME);
        }
    }, [invLoading, mastLoading, h2Loading, stopLoading]);

    // <- Removed local loader/error UI, return null to let global loader handle UI
    if (invLoading || mastLoading || h2Loading || invError || mastError || h2Error)
        return null;

    const inventoryItems = invData?.componentCatalogInventories || [];
    const mastheadData = mastData?.componentCatalogMasthead;
    const lockupData = h2Data?.generalH2Lockup;

    let brandPrefix = "anthem-";
    if (currentBrand === "Healthy Blue") brandPrefix = "healthyblue-";
    if (currentBrand === "Wellpoint") brandPrefix = "wellpoint-";

    const sortedItems = [...inventoryItems].sort((a, b) =>
        a.title.trim().localeCompare(b.title.trim())
    );

    const filteredItems = sortedItems.filter((item) =>
        item.imageUrl.includes(brandPrefix)
    );


    return (
        <>
            <GlobalNav
                showBrandSwitcher={true}
                currentBrand={currentBrand}
                onBrandChange={setCurrentBrand}
            />

            {/* CHANGED: use styles.containerRow just like your detail page */}
            <div className={styles.containerRow}>
                <LeftRail />
                <div className={styles.rightSide}>
                    <div>
                        {/* ...the rest of your content stays unchanged... */}
                        <h1 style={{ paddingBottom: "16px" }}>
                            {mastheadData?.headline || "Overview"}
                        </h1>
                        <p style={{ paddingBottom: "32px" }}>
                            {mastheadData?.body ||
                                "An a-z component guide, featuring everything from basic elements..."}
                        </p>
                        <hr className={styles.line} />
                        <div style={{ height: "42px" }} />
                        <h2 style={{ paddingBottom: "16px" }}>
                            {lockupData?.headline || "Components"}
                        </h2>
                        <p style={{ paddingBottom: "32px" }}>
                            {lockupData?.body ||
                                "Explore our scalable components below for detailed documentation..."}
                        </p>
                        <div className={styles.catalogGrid}>
                            {filteredItems.map((comp) => (
                                <div key={comp.documentId} className={styles.catalogItem}>
                                    <div style={{ width: "200px", height: "126px" }}>
                                        <Link to={`/components/${comp.slug}`}>
                                            <img
                                                src={comp.imageUrl}
                                                alt={comp.title}
                                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                            />
                                        </Link>
                                    </div>
                                    <p className={styles.itemName}>{comp.title}</p>
                                    <p className={styles.itemDesc}>
                                        {comp.description || "No description available"}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div style={{ height: "92px" }} />
                        <hr className={styles.line} />
                        <div style={{ height: "92px" }} />
                    </div>
                    <div>
                        <GettingHelpInternal />
                    </div>
                </div>
            </div>
            <BackToTopButton/>
            <GlobalFooter />
        </>
    );
};


export default ComponentCatalogPage;