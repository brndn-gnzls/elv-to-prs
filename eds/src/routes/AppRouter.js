// src/AppRouter.js
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import GlobalLoader from "../components/GlobalLoader/GlobalLoader";
import { LoadingProvider } from "../LoadingContext";
import {
    HashRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

const ArticlePage          = lazy(() => import("../pages/ArticlePage/ArticlePage"));
const HomePage             = lazy(() => import("../pages/HomePage/HomePage"));
const TestPage             = lazy(() => import("../pages/TestPage/TestPage"));
const GettingStartedPage   = lazy(() => import("../pages/GettingStarted/GettingStartedPage"));
const GetStartedDevelop    = lazy(() => import("../pages/GetStartedDevelop/GetStartedDevelopPage"));
const GetStartedDesign     = lazy(() => import("../pages/GetStartedDesign/GetStartedDesignPage"));
const ComponentCatalogPage = lazy(() => import("../pages/ComponentCatalogPage/ComponentCatalogPage"));
const ComponentDetailPage  = lazy(() => import("../pages/ComponentDetailPage/ComponentDetailPage"));

const AppRouter = () => {
    useEffect(() => {
        const { pathname, search, hash } = window.location;
        if (pathname !== "/" && !hash) {
            window.location.replace(`/#${pathname}${search}`);
        }
    }, []);

    return (
        <LoadingProvider>
            <Router>
                <GlobalLoader /> 
                <ScrollToTop />
                <Suspense fallback={<GlobalLoader />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/articles/:articleUrl" element={<ArticlePage />} />
                        <Route path="/test-page" element={<TestPage />} />
                        <Route path="/get-started" element={<GettingStartedPage />} />
                        <Route path="/get-started/design" element={<GetStartedDesign />} />
                        <Route path="/get-started/develop" element={<GetStartedDevelop />} />
                        <Route path="/components" element={<ComponentCatalogPage />} />
                        <Route path="/components/:slug" element={<ComponentDetailPage />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </Router>
        </LoadingProvider>
    );
};

export default AppRouter;