import React from 'react';
import './Button.css';

export const Button = ({
                           variant = 'primary',
                           size = 'large',
                           disabled = false,
                           children,
                           brand = 'anthem',
                       }) => {
    const classNames = [
        'btn',
        `btn--${brand}`,
        `btn--${variant}`,
        size === 'large' ? 'btn--large' : 'btn--small',
        disabled && 'btn--disabled',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classNames} disabled={disabled}>
            {children}
        </button>
    );
};