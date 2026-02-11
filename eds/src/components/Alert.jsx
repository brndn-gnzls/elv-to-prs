import React from 'react';
import './Alert.css';

export const Alert = ({
                          brand = 'anthem',                 // anthem | wellpoint | healthyblue
                          kind = 'info',                    // 'error' | 'info' | 'success' | 'urgent'
                          icon = null,                      // leading icon node
                          children,                         // content (may include link)
                          onDismiss,                        // optional dismiss handler
                          dismissIcon = '×',                // simple default glyph
                          link = null,                      // optional inline link { href, label, ...props }
                      }) => {
    const classes = ['alert', `alert--${brand}`, `alert--${kind}`].join(' ');

    return (
        <div className={classes} role="status" aria-live="polite">
            <span className="alert__icon" aria-hidden="true">{icon}</span>
            <div className="alert__content">
                <div className="alert__message">{children}</div>
                {link && (
                    <a className="alert__link" href={link.href} {...(link.props || {})}>
                        {link.label}
                    </a>
                )}
            </div>
            {onDismiss ? (
                <button className="alert__dismiss" type="button" onClick={onDismiss} aria-label="Dismiss alert">
                    {dismissIcon}
                </button>
            ) : <span aria-hidden="true" />}
        </div>
    );
};