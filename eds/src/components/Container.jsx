import React from 'react';
import './Container.css';

export const Container = ({
                              brand = 'anthem',          // anthem | healthyblue | wellpoint
                              variant = 'white',         // white | gray
                              children,
                              ...rest
                          }) => {
    const classes = ['container', `container--${brand}`, `container--${variant}`].join(' ');
    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
};