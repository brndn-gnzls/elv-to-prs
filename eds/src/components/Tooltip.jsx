import React, { useEffect, useRef, useState } from 'react';
import './Tooltip.css';

/** Tooltip with a help trigger and a closable bubble. */
export const Tooltip = ({
                            brand = 'anthem',                // anthem | healthyblue | wellpoint
                            text = 'Helpful contextual info goes here.',
                            open: openProp = false,
                            onOpenChange,
                        }) => {
    const [open, setOpen] = useState(!!openProp);
    const rootRef = useRef(null);

    useEffect(() => setOpen(!!openProp), [openProp]);

    const classes = ['tooltip', `tooltip--${brand}`].join(' ');

    const toggle = () => {
        const next = !open;
        setOpen(next);
        onOpenChange?.(next);
    };

    const close = () => { setOpen(false); onOpenChange?.(false); };

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const onDocClick = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) close();
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [open]);

    return (
        <div ref={rootRef} className={classes}>
            <span className="tooltip__help" role="button" aria-expanded={open} aria-haspopup="dialog" onClick={toggle}>?</span>
            {open && (
                <div className="tooltip__bubble" role="dialog" aria-label="Tooltip">
                    <div style={{ flex: 1, maxWidth: 'var(--brand-tooltip-max-width, none)' }}>{text}</div>
                    <span className="tooltip__close" role="button" aria-label="Close tooltip" onClick={close}>✕</span>
                </div>
            )}
        </div>
    );
};