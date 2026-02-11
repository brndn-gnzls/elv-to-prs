import React from 'react';
import './Checkbox.css';

export const Checkbox = ({
                             brand = 'anthem',          // anthem | wellpoint | healthyblue
                             checked = false,
                             disabled = false,
                             error = false,
                             focusActive = false,       // spreadsheet has focusActive border for unchecked
                             label = 'Checkbox label',
                             errorMessage = '',
                             onChange,
                             renderCheck = null,        // allow custom icon
                         }) => {
    const classes = [
        'checkbox',
        `checkbox--${brand}`,
        checked && 'checkbox--checked',
        disabled && 'checkbox--disabled',
        error && 'checkbox--error',
        focusActive && 'checkbox--focusActive',
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} aria-disabled={disabled} role="group">
            <label className="checkbox__control">
                <input
                    className="checkbox__input"
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={onChange}
                />
                <span className="checkbox__box" aria-hidden="true">
          <span className="checkbox__icon">
            {renderCheck}
          </span>
        </span>
                <span className="checkbox__label">{label}</span>
            </label>

            {error && !!errorMessage && (
                <div className="checkbox__error">
                    <span className="checkbox__errorIcon" aria-hidden="true">!</span>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};