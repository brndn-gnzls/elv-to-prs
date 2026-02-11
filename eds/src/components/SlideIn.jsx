import React, { useEffect, useRef } from 'react';
import './SlideIn.css';

/** SlideIn Panel
 *  brand: 'anthem' | 'healthyblue' | 'wellpoint'
 *  open: boolean
 *  onClose: () => void
 */
export const SlideIn = ({
                            brand = 'anthem',
                            open = false,
                            onClose,
                            title = 'Slide-in panel',
                            children,
                            footer = null,
                        }) => {
    const rootRef = useRef(null);

    // Close on ESC, and on overlay click
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    return (
        <div className={`slidein slidein--${brand} ${open ? 'slidein--open' : ''}`} ref={rootRef}>
            <div className="slidein__overlay" onClick={onClose} />
            <aside className="slidein__card" role="dialog" aria-modal="true" aria-labelledby="slidein-title">
                <header className="slidein__header">
                    <button className="slidein__back" type="button" onClick={onClose} aria-label="Close panel">←</button>
                    <h2 id="slidein-title" className="slidein__title">{title}</h2>
                    <span aria-hidden />
                </header>

                <div className="slidein__content">
                    {children ?? 'Panel content goes here.'}
                </div>

                <footer className="slidein__footer">
                    {footer ?? <button onClick={onClose}>Close</button>}
                </footer>
            </aside>
        </div>
    );
};