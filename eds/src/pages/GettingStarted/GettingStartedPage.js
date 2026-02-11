// src/pages/GettingStartedPage/GettingStartedPage.js

import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GettingStartedPath from "../../components/GettingStartedPath/GettingStartedPath";
import NotificationBox from "../../components/NotificationBox/NotificationBox";
import GettingHelp from "../../components/GettingHelp/GettingHelp";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./GettingStartedPage.module.css";
import { useLoading } from "../../LoadingContext";

const GET_GETTING_STARTED_PAGE = gql`
    query GettingStartedPage {
        gettingStartedPage {
            heading
            body
            leadin {
                content
            }
            headline {
                headingLevel
                headingText
            }
            headerImage {
                folder
                fileName
            }
            notificationBox {
                borderColor
                content
            }
        }
    }
`;

const GET_GETTING_STARTED_PATHS = gql`
    query GettingStartedPaths {
        gettingStartedPaths {
            documentId
            icon
            heading
            body
        }
    }
`;

const COMPONENT_NAME = "GettingStartedPage";

export default function GettingStartedPage() {
    const { startLoading, stopLoading } = useLoading();

    const { loading: pageLoading, error: pageError, data: pageData } = useQuery(GET_GETTING_STARTED_PAGE);
    const { loading: pathsLoading, error: pathsError, data: pathsData } = useQuery(GET_GETTING_STARTED_PATHS);

    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    useEffect(() => {
        if (!pageLoading && !pathsLoading) stopLoading(COMPONENT_NAME);
    }, [pageLoading, pathsLoading, stopLoading]);

    if (pageLoading || pathsLoading || pageError || pathsError) return null;

    const gsPage = pageData.gettingStartedPage;
    const pathItems = pathsData.gettingStartedPaths || [];

    const headerImg =
        Array.isArray(gsPage.headerImage) && gsPage.headerImage.length > 0
            ? gsPage.headerImage[0]
            : {};
    const { folder = "", fileName = "" } = headerImg;
    const bgUrl = "images/gettingStartedLanding/img-header-getstarted.jpg";

    const HeadingTag = gsPage.headline?.headingLevel || "h2";

    return (
        <>
            <GlobalNav />

            <div className={styles.containerRow}>
                <LeftRail />

                <div className={styles.rightSide}>
                    <div
                        className={styles.banner}
                        style={bgUrl ? { backgroundImage: `url("${bgUrl}")` } : {}}
                    >
                        <h1>{gsPage.heading}</h1>
                        <p>{gsPage.body}</p>
                    </div>

                    <div className={styles.postBannerSpace} />

                    <div className={styles.introText}>
                        <HeadingTag>{gsPage.headline.headingText}</HeadingTag>
                        <p>{gsPage.leadin.content}</p>
                    </div>

                    {Array.isArray(gsPage.notificationBox) &&
                        gsPage.notificationBox.map((box, i) => (
                            <NotificationBox key={i} color={box.borderColor}>
                                <div dangerouslySetInnerHTML={{ __html: box.content }} />
                            </NotificationBox>
                        ))}

                    <div className={styles.contentArea}>
                        {pathItems.map((item) => {
                            let link = "/get-started";
                            if (item.heading === "Design") link = "/get-started/design";
                            else if (item.heading === "Develop") link = "/get-started/develop";

                            return (
                                <GettingStartedPath
                                    key={item.documentId}
                                    icon={item.icon}
                                    heading={item.heading}
                                    body={item.body}
                                    link={link}
                                />
                            );
                        })}
                    </div>

                    <GettingHelp />
                </div>
            </div>

            <GlobalFooter />
        </>
    );
}