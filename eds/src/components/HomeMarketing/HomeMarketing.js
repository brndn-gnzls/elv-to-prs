import React, { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";
import styles from "./HomeMarketing.module.css";
import { useLoading } from "../../LoadingContext";

const GET_HOME_MARKETING = gql`
    query GetHomeMarketing {
        homeMarketing {
            heading2
            heading3
            paragraph
            buttonLabel
            imageUrl
        }
    }
`;
const COMPONENT_NAME = "HomeMarketing";

const HomeMarketing = () => {
    const { loading, error, data } = useQuery(GET_HOME_MARKETING);
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    useEffect(() => {
        if (!loading) stopLoading(COMPONENT_NAME);
    }, [loading, stopLoading]);

    if (loading || error) return null; // Avoid individual loaders here

    const { heading2, heading3, paragraph, buttonLabel, imageUrl } = data.homeMarketing;

    return (
        <section className={styles.marketingWrapper}>
            <div className={styles.marketingInner}>
                {/* Left Column: text lockup */}
                <div className={styles.leftColumn}>
                    <h2>{heading2}</h2>
                    <h3>{heading3}</h3>
                    <p>{paragraph}</p>
                </div>

                {/* Right Column: image */}
                <div
                    className={styles.rightColumn}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
            </div>
        </section>
    );
};

export default HomeMarketing;