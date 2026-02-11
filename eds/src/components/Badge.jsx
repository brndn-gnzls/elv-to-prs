import React from 'react';
import './Badge.css';

/** Badge: background variant + text tone (white/gray). */
export const Badge = ({
                          brand = 'anthem',                 // anthem | healthyblue | wellpoint
                          variant = 'info',                 // success | info | warning | urgent | darkNeutral | purple | optionalWhite | optionalGray
                          tone = 'textWhite',               // textWhite | textGray
                          children,
                          ...rest
                      }) => {
    const classes = ['badge', `badge--${brand}`, `badge--${variant}`, `badge--${tone}`].join(' ');
    return <span className={classes} {...rest}>{children}</span>;
};