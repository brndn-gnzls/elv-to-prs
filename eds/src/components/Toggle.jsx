import React, { useEffect, useRef, useState } from 'react';
import './Toggle.css';

/** Interactive toggle with WAI-ARIA "switch" semantics (on/off). */
export const Toggle = ({
                           brand = 'anthem',                  // anthem | healthyblue | wellpoint
                           checked: checkedProp = false,
                           disabled = false,
                           error = false,
                           label = 'Toggle',
                           onText = 'On',
                           offText = 'Off',
                           errorText = '',
                           onChange,
                       }) => {
    const [checked, setChecked] = useState(!!checkedProp);
    const rootRef = useRef(null);

    useEffect(() => setChecked(!!checkedProp), [checkedProp]);

    const classes = [
        'toggle',
        `toggle--${brand}`,
        checked ? 'toggle--on' : 'toggle--off',
        disabled && 'toggle--disabled',
    ].filter(Boolean).join(' ');

    const toggle = () => {
        if (disabled) return;
        const next = !checked;
        setChecked(next);
        onChange?.(next);
    };

    return (
        <div ref={rootRef} className={classes}>
            <span className="toggle__label">{label}</span>

            {/* Hidden focusable button drives :focus-visible; the switch track is next sibling */}
            <button
                className="toggle__button"
                type="button"
                role="switch"
                aria-checked={checked}
                aria-disabled={disabled}
                onClick={toggle}
            />
            <span className="toggle__switch" aria-hidden="true" onClick={toggle}>
        <span className="toggle__handle" />
      </span>

            <span className="toggle__state">{checked ? onText : offText}</span>

            {error && !!errorText && (
                <span className="toggle__error">
          <span className="toggle__errorIcon" aria-hidden="true">!</span>
                    {errorText}
        </span>
            )}
        </div>
    );
};