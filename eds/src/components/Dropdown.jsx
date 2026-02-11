import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.css';

export const Dropdown = ({
                             brand = 'anthem', label, optionalText,
                             placeholder = 'Select…', disabled = false, error = false,
                             items = [], value = null, onSelect,
                             leadingIcon = null, tooltipIcon = null,
                         }) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    const classes = [
        'dropdown',
        `dropdown--${brand}`,
        open && 'dropdown--active',
        disabled && 'dropdown--disabled',
        error && 'dropdown--error',
    ].filter(Boolean).join(' ');

    const toggleOpen = () => { if (!disabled) setOpen(o => !o); };

    useEffect(() => {
        if (!open) return;
        const onDocClick = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const selectItem = (val) => { onSelect?.(val); setOpen(false); };
    const currentLabel = items.find(i => i.value === value)?.label ?? placeholder;

    return (
        <div ref={rootRef} className={classes} role="group" aria-disabled={disabled}>
            {(label || optionalText) && (
                <div className="dropdown__label-row">
                    {label && <label className="dropdown__label">{label}</label>}
                    {optionalText && <span className="dropdown__optional">{optionalText}</span>}
                </div>
            )}

            <div className="dropdown__input" onClick={toggleOpen} aria-haspopup="listbox" aria-expanded={open}>
                <div className="dropdown__value">
                    {leadingIcon && <span className="dropdown__tooltip" aria-hidden="true">{leadingIcon}</span>}
                    <span className="dropdown__placeholder">{currentLabel}</span>
                </div>
                <span className="dropdown__chevron" aria-hidden="true">⌄</span>
            </div>

            {open && (
                <ul className="dropdown__menu" role="listbox">
                    {items.map((it) => (
                        <li
                            key={it.value}
                            className="dropdown__item"
                            role="option"
                            aria-selected={it.value === value}
                            onClick={() => selectItem(it.value)}
                        >
                            {it.icon && <span className="dropdown__chevron" aria-hidden="true">{it.icon}</span>}
                            <span>{it.label}</span>
                        </li>
                    ))}
                </ul>
            )}

            {tooltipIcon && <span className="dropdown__tooltip" aria-hidden="true">{tooltipIcon}</span>}
        </div>
    );
};