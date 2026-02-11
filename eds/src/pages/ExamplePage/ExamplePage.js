import React from "react";
import { Link } from "react-router-dom";
import styles from './ExamplePage.module.css'; // Use css module for styling.

const ExamplePage = () => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Strapi/React Skeleton Root</h1>
            <p className={styles.description}>This and the following page are to be referenced as guides for how to build pages and components.</p>
            {/* Link to the Articles Page.*/}
            <Link to="/articles" className={styles.link}>Go to Articles</Link>
        </div>
    );
};

export default ExamplePage;

