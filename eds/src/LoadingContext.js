// LoadingContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [loadingComponents, setLoadingComponents] = useState(new Set());

    const startLoading = useCallback((componentName) => {
        setLoadingComponents(prev => new Set(prev).add(componentName));
    }, []);

    const stopLoading = useCallback((componentName) => {
        setLoadingComponents(prev => {
            const updated = new Set(prev);
            updated.delete(componentName);
            return updated;
        });
    }, []);

    const isLoading = loadingComponents.size > 0;

    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};