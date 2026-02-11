import React from 'react';
import './TextField.css';

export const TextField = ({
                              brand = 'anthem',                 // 'anthem' | 'wellpoint' | 'healthyblue'
                              status = 'base',                  // 'base' | 'active' | 'critical' | 'urgent' | 'positive' | 'info'
                              disabled = false,
                              label,
                              optionalText,
                              placeholder,
                              value,
                              onChange,
                              leadingIcon = null,
                              trailingIcon = null,
                              showHelp = false,
                              helpText,
                              showHelp2 = false,
                              helpText2,
                              showGuidance = false,
                              guidanceText,
                              showCount = false,
                              countText,
                          }) => {
    const classes = [
        'textfield',
        `textfield--${brand}`,
        status !== 'base' && `textfield--status-${status}`,
        disabled && 'textfield--disabled',
        leadingIcon && 'textfield--has-leading-icon',
        trailingIcon && 'textfield--has-trailing-icon',
        (trailingIcon && trailingIcon?.props?.['data-password-toggle']) && 'textfield--has-password-toggle',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div style={{ width: '100%' }}>
            {/* 1) Label row OUTSIDE the bordered field */}
            {label && (
                <div
                    className="textfield__label-row"
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--primitives-spacing-2)', marginBottom: 'var(--primitives-spacing-2)' }}
                >
                    <label className="textfield__label">{label}</label>
                    {optionalText && <span className="textfield__optional">{optionalText}</span>}
                </div>
            )}

            {/* 2) Bordered field container */}
            <div className={classes} aria-disabled={disabled}>
                <div className="textfield__row">
                    {leadingIcon && <span className="textfield__icon">{leadingIcon}</span>}
                    <input
                        className="textfield__input"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                    {trailingIcon && <span className="textfield__icon">{trailingIcon}</span>}
                </div>
            </div>

            {/* 3) Helpers/meta below the field */}
            {showGuidance && <div className="textfield__guidance">{guidanceText}</div>}
            {showHelp && <div className="textfield__help">{helpText}</div>}
            {showHelp2 && <div className="textfield__help2">{helpText2}</div>}
            {showCount && <div className="textfield__meta">{countText}</div>}
        </div>
    );
};