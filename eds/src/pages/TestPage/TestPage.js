// TestPage.js
import React from "react";
import TestList from "../../components/TestList/TestList";

const TestPage = () => {
    return (
        // Tailwind's .container class
        <div className="container">
            <h1 className="text-2xl font-bold mb-6">
                Welcome to the Test Page!
            </h1>
            <TestList />
        </div>
    );
};

export default TestPage;
