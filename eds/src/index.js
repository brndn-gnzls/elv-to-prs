import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/react";
import App from "./App";
import "./styles/fonts.css";
import "./global.css";

if("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
}

// Sentry init (optional, as before):
Sentry.init({
    dsn: "https://69a40c264a8b244489b619435fb10e95@o4508077516128256.ingest.us.sentry.io/4508077519077376",
    integrations: [
        browserTracingIntegration({
            tracePropagationTargets: ["localhost", /^\//],
        }),
    ],
    tracesSampleRate: 1.0,
});

// If you had any typePolicies for pagination, keep them. Example below:
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                articles: {
                    keyArgs: ["pagination"],
                },
            },
        },
    },
});

// Basic HTTP link to your GraphQL endpoint
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

// AUTH LINK: We remove all references to localStorage / tokens
const authLink = setContext((_, { headers }) => {
    // Return unchanged headers (no Authorization).
    return {
        headers: {
            ...headers,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);