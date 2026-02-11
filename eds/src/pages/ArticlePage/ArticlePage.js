// src/pages/ArticlePage/ArticlePage.js
import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import {useParams, Navigate, Link} from "react-router-dom";

import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./ArticlePage.module.css";
import { useLoading } from "../../LoadingContext";

const GET_ARTICLES = gql`
    query Articles {
        articles {
            url
            title
            articleBanner
            articleAuthorName
            articleAuthorRole
            articleComposition {
                ... on ComponentSpacingBlocksSpacingBlock {
                    id
                    height
                }
                ... on ComponentSharedBlocksParagraphHeadline {
                    id
                    headline
                }
                ... on ComponentSharedBlocksImageBlock {
                    id
                    folder
                    src
                }
                ... on ComponentSharedBlocksItalicCaptionSmall {
                    id
                    content
                }
                ... on ComponentParagraphBlocksParagraphBlock {
                    id
                    content
                }
                ... on ComponentHeadingBlocksHeadingBlock {
                    id
                    headingText
                    headingLevel
                }
                ... on ComponentBulletListBlockBulletListBlock {
                    id
                    items {
                        boldLead
                        body
                    }
                }
                ... on ComponentSharedBlocksHorizontalRuleBlock {
                    id
                    style
                }
                ... on ComponentGlobalSingleBullet {
                    id
                    content
                }
            }
        }
    }
`;

const COMPONENT_NAME = "ArticlePage";

export default function ArticlePage() {
    const { articleUrl } = useParams();
    const { loading, error, data } = useQuery(GET_ARTICLES);
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    useEffect(() => {
        if (!loading) stopLoading(COMPONENT_NAME);
    }, [loading, stopLoading]);

    if (loading || error) return null; // Avoid individual loaders here

    const article = data.articles.find((a) => a.url === articleUrl);
    if (!article) return <Navigate to="/articles" replace />;

    const blocks = article.articleComposition
        .map((blk) => {
            if (blk.height != null) {
                return { type: "spacing", height: blk.height };
            }
            if (blk.headingText) {
                return { type: blk.headingLevel, content: blk.headingText };
            }
            if (blk.headline) {
                return { type: "pBold", content: blk.headline };
            }
            if (blk.__typename === "ComponentGlobalSingleBullet") {
                return { type: "singleBullet", label: blk.content };
            }
            if (blk.folder && blk.src) {
                return { type: "img", src: `/${blk.folder}/${blk.src}` };
            }
            if (blk.items) {
                return { type: "bulletList", items: blk.items };
            }
            if (blk.style !== undefined) {
                return { type: "hr", style: blk.style };
            }
            if (blk.id != null && blk.content != null) {
                return { type: "p", content: blk.content };
            }
            if (blk.content) {
                return { type: "pItalicSmall", content: blk.content };
            }
            return null;
        })
        .filter(Boolean);

    const renderBlock = (b, i) => {
        switch (b.type) {
            case "h1":
                return <h1 key={i}>{b.content}</h1>;
            case "h2":
                return <h2 key={i}>{b.content}</h2>;

            case "h3":
                return <h3 key={i}>{b.content}</h3>;

            case "h4":
                return <h4 key={i}>{b.content}</h4>;

            case "p":
                return (
                    <p
                        key={i}
                        style={{ margin: "16px 0" }}
                        dangerouslySetInnerHTML={{ __html: b.content }}
                    />
                );

            case "pBold":
                return (
                    <p
                        key={i}
                        style={{
                            fontWeight: "bold",
                            fontSize: "24px",
                            lineHeight: "32px",
                            marginBottom: "8px",
                        }}
                        dangerouslySetInnerHTML={{ __html: b.content }}
                    />
                );

            case "pItalicSmall":
                return (
                    <p
                        key={i}
                        style={{ fontStyle: "italic", fontSize: "14px", margin: "16px 0" }}
                        dangerouslySetInnerHTML={{ __html: b.content }}
                    />
                );

            case "spacing":
                return <div key={i} style={{ height: b.height || 16 }} />;

            case "img":
                return (
                    <img
                        key={i}
                        src={b.src}
                        alt=""
                        style={{ margin: "16px 0", maxWidth: "100%" }}
                    />
                );

            case "bulletList":
                return (
                    <ul key={i} style={{ margin: "16px 0", paddingLeft: "20px", listStyleType: "numbers" }}>
                        {b.items.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: "8px" }}>
                                <strong>{item.boldLead}</strong>{" "}
                                <span dangerouslySetInnerHTML={{ __html: item.body }} />
                            </li>
                        ))}
                    </ul>
                );

            case "singleBullet":
                return (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", margin: "8px 0 0 0" }}>
                        <span style={{ marginRight: "8px", lineHeight: 1.5 }}>&bull;</span>
                        <span dangerouslySetInnerHTML={{__html: b.label}}/>
                    </div>
                );

            case "hr":
                return (
                    <hr
                        key={i}
                        style={{
                            border: 0,
                            borderTop: `1px solid ${b.style || "#eeeeee"}`,
                            margin: "16px 0",
                        }}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <>
            <ScrollToTop />

            <GlobalNav />

            <div className="container mx-auto flex flex-col min-h-screen">
                <header
                    className={styles.banner}
                    style={{
                        backgroundImage: article.articleBanner
                            ? `url("/${article.articleBanner}")`
                            : "none",
                    }}
                >
                    <div className={styles.overlay}>
                        <h1 className={styles.title}>{article.title}</h1>
                        <p className={styles.byline}>
                            <strong>{article.articleAuthorName}</strong>{" "}
                            {article.articleAuthorRole}
                        </p>
                    </div>
                </header>

                <main className={`flex-grow ${styles.articleContent}`}>
                    {blocks.map(renderBlock)}
                    <Link to="/">
                        <button className={styles.getStartedBtn}>Back to Articles</button>
                    </Link>
                </main>
            </div>

            <GlobalFooter />
        </>
    );
}