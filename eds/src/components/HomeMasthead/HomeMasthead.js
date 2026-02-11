// src/components/HomeMasthead/HomeMasthead.js
import React, { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";
import styles from "./HomeMasthead.module.css";
import {Link} from "react-router-dom";
import { useLoading } from "../../LoadingContext";


// 1) Define the query inline with the component
const GET_HOME_MASTHEAD = gql`
    query GetHomeMasthead {
        homeMasthead {
            title
            description
            button1Label
            button2Label
        }
    }
`;
const COMPONENT_NAME = "HomeMasthead";

const HomeMasthead = () => {
    // 2) Use Apollo’s useQuery hook to fetch the data
    const { loading, error, data } = useQuery(GET_HOME_MASTHEAD);
    const { startLoading, stopLoading } = useLoading();

    // 3) Handle loading/error states
    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    useEffect(() => {
        if (!loading) stopLoading(COMPONENT_NAME);
    }, [loading, stopLoading]);

    if (loading || error) return null;

    // 4) Destructure the fields from the returned data
    const { title, description, button1Label, button2Label } = data?.homeMasthead || {};

    return (
        <div className={styles.mastheadWrapper}>
            {/* Animated background */}
            <span className={styles.gradientContainer}>
        <span className={styles.gradientColor}></span>
        <span className={styles.gradientColor}></span>
        <span className={styles.gradientColor}></span>
        <span className={styles.gradientColor}></span>
        <span className={styles.gradientBackdrop}></span>
      </span>

            {/* 5) Render the CTA lock-up with dynamic values */}
            <div className={styles.mastheadContent}>
                {/* If title or description is missing for any reason,
            you could fallback to some default text, but here we assume it's provided */}
                <h1>{title}</h1>

                <p>{description}</p>

                <div className={styles.ctaButtons}>
                    <Link to="/get-started">
                        <button className={styles.getStartedBtn}>{button1Label}</button>
                    </Link>

                    <Link to="/components">
                        <button className={styles.componentsBtn}>{button2Label}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeMasthead;
