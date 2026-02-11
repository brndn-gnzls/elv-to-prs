import React, {useState} from 'react';
import {useQuery, gql, InMemoryCache} from "@apollo/client";
import styles from './ArticleList.module.css';

// GQL query for articles with Title, Content, and Images.
// Fetch articles with pagination.
const GET_ARTICLES = gql`
    query GetArticles($start: Int, $limit: Int) {
        articles(pagination: {start: $start, limit: $limit}) {
            Title
            Content
            Image {
                url
            }
        }
        articles_connection {
            pageInfo {
                total
            }
        }
    }
`;

const ArticleList = () => {
    const STR_URL = process.env.REACT_APP_STRAPI_BASE;


    // State to manage current page and pagination limits.
    const [page, setPage] = useState(1);
    const limit = 2;
    const start = (page - 1) * limit;

    // Use Apollo's useQuery hook to fetch the data.
    const { loading, error, data } = useQuery(GET_ARTICLES, {
        variables: {start, limit},
        fetchPolicy: 'cache-and-network'
    });

    // Handle the states.
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>

    // Total Number of articles.
    const totalArticles = data.articles_connection.pageInfo.total;

    // Total Number of pages.
    const totalPages = Math.ceil(totalArticles / limit);

    // Handle page navigation.
    const goToNextPage = () => setPage((prevPage) => prevPage + 1);
    const goToPreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div>
            <ul className={styles.articleList}>
                {data.articles.map((article, index) => (
                    <li key={index} className={styles.articleItem}>
                        <h2 className={styles.articleTitle}>{article.Title}</h2>
                        {article.Content.map((contentBlock, blockIndex) => (
                            <div key={blockIndex} className={styles.articleContent}>
                                {contentBlock.children.map((child, childIndex) => (
                                    <p key={childIndex}>{child.text}</p>
                                ))}
                            </div>
                        ))}
                        {/* Article Image*/}
                        <img src={`${STR_URL}${article.Image[0].url}`} alt={article.Title} name={article.Title} className={styles.articleImage}/>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className={styles.paginationContainer}>
                <button onClick={goToPreviousPage} disabled={page === 1} className={styles.paginationButton}>
                    Previous
                </button>
                <span> Page {page} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={page === totalPages} className={styles.paginationButton}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ArticleList;