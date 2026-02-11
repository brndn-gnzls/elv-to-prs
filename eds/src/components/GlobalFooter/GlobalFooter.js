// src/components/GlobalFooter/GlobalFooter.js

import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./GlobalFooter.module.css";
import { useLoading } from "../../LoadingContext";

const GET_FOOTER = gql`
    query GetFooter {
        footer {
            footerColumn1Header
            footerColumn1Body
            footerColumn2Header
            footerColumn2Body
            footerColumn3Header
            footerColumn3Body
            footerColumn4Header
            footerColumn4Body
            footerColumn5Header
            footerColumn5Body
            legalNotice
        }
    }
`;

function renderLinks(htmlString) {
    if (!htmlString) return null;

    return (
        <div
            className={styles.footerLinks}
            dangerouslySetInnerHTML={{ __html: htmlString }}
        />
    );
}

const COMPONENT_NAME = "GlobalFooter";

const GlobalFooter = () => {
    const { startLoading, stopLoading } = useLoading();
    const { loading, error, data } = useQuery(GET_FOOTER);

    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    useEffect(() => {
        if (!loading) stopLoading(COMPONENT_NAME);
    }, [loading, stopLoading]);

    if (loading || error) return null;

    const footerData = data?.footer ?? {};

    return (
        <footer className={`divider global-footer-wrapper util-bg-footer ${styles.footerFullWidth}`}>
            <div className={`container ${styles.footerInner}`}>
                <div className={styles.footerRow1}>
                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn1Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn1Body)}</div>
                    </div>

                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn2Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn2Body)}</div>
                    </div>

                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn3Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn3Body)}</div>
                    </div>

                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn4Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn4Body)}</div>
                    </div>

                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn5Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn5Body)}</div>
                    </div>
                </div>

                <div className={styles.legalRow}>{footerData.legalNotice}</div>
            </div>
        </footer>
    );
};

export default GlobalFooter;