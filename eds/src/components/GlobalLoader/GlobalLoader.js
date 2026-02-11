// components/GlobalLoader.js
import React from 'react';
import { useLoading } from '../../LoadingContext';
import loaderGif from './check-loader-gif.gif';

const GlobalLoader = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div style={loaderStyles}>
            <img src={loaderGif} alt="Loading..." style={{ width: '100px' }} />
        </div>
    );
};

// Simple loader styles for full-screen centered loader
const loaderStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 9999,
};

export default GlobalLoader;