// src/components/GettingHelp/GettingHelp.js

import React from "react";
import styles from "./GettingHelp.module.css";

const GettingHelp = () => {
    return (
        <div className={styles.gettingHelpWrapper}>
            <h2>Help Improve This Page</h2>

            <p>
            Your feedback and contributions are invaluable to us as we strive to make eDS as comprehensive and user-friendly as possible. Whether you have suggestions for new content, spotted an inconsistency, or have ideas for improvement, we want to hear from you.
            </p>

            <ul className={styles.helpList}>
                <li>
                    <a href="mailto:designsystem+Suggestions@elevancehealth.com" className={styles.helpLink}>Suggest an improvement</a> – learn more about the eDS intake process for proposing modifications and changes to existing components.
                </li>
            </ul>


            <h3>Need Help?</h3>
            <p className={styles.helpTopParagraph}>
            Your insights and contributions are crucial as we aim to continuously evolve our design system. For more detailed feedback, concerns or proposals, don’t hesitate to <a href="mailto:designsystem+generalsupport@elevancehealth.com" className={styles.helpLink}>send us an email.</a>.
            </p>

        </div>
    );
};

export default GettingHelp;
