import React from 'react';
import './Divider.css';

/** Divider: horizontal rule with brand + fill + weight variants */
export const Divider = ({
                            brand = 'anthem',               // anthem | healthyblue | wellpoint
                            fill = 'light',                 // light | dark | white
                            weight = 'thin',                // thin | thick
                            style,
                            ...rest
                        }) => {
    const classes = ['divider', `divider--${brand}`, `divider--${fill}`, `divider--${weight}`].join(' ');
    return <div className={classes} role="separator" style={style} {...rest} />;
};