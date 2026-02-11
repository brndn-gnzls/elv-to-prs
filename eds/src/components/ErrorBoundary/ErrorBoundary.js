import React from "react";
import * as Sentry from '@sentry/react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // Update the state when the error is thrown.
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // Log the error to Sentry and the console.
    componentDidCatch(error, errorInfo) {
        // Sentry capture.
        Sentry.captureException(error, { extra: errorInfo });
        console.error("[!] Error caught by ErrorBoundary: ", error, errorInfo);
    }

    render() {
        // Render fallback UI upon error.
        if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>
        }

        // Render wrapped components if there are no errors.
        return this.props.children
    }
}

export default ErrorBoundary;