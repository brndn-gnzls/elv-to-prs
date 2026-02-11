import React, { useId, useState } from 'react';
import './Radio.css';

/** RadioGroup + Radio items (ARIA radios) */
export const RadioGroup = ({
                               brand = 'anthem',
                               name,
                               label = 'Choose an option',
                               options = [
                                   { value: 'a', label: 'Option A', description: '' },
                                   { value: 'b', label: 'Option B', description: '' },
                               ],
                               defaultValue = 'a',
                               disabled = false,
                               error = '',
                               onChange,
                           }) => {
    const [value, setValue] = useState(defaultValue);
    const groupId = useId();

    const setVal = (v) => {
        setValue(v);
        onChange?.(v);
    };

    return (
        <div className={`radiogroup radio--${brand}`} role="radiogroup" aria-labelledby={`${groupId}-label`} aria-describedby={error ? `${groupId}-error` : undefined}>
            <div id={`${groupId}-label`} className="radio__label">{label}</div>

            {options.map((opt) => {
                const checked = value === opt.value;
                const id = `${groupId}-${opt.value}`;
                const classes = [
                    'radio',
                    disabled && 'radio--disabled',
                    error && 'radio--error',
                ].filter(Boolean).join(' ');

                return (
                    <label key={opt.value} className={classes}>
                        <input
                            id={id}
                            className="radio__input"
                            type="radio"
                            name={name || groupId}
                            value={opt.value}
                            checked={checked}
                            disabled={disabled}
                            onChange={() => setVal(opt.value)}
                        />
                        <span className="radio__outer">
              <span className="radio__inner" />
            </span>
                        <div>
                            <div className="radio__label">{opt.label}</div>
                            {opt.description ? <div className="radio__content">{opt.description}</div> : null}
                        </div>
                    </label>
                );
            })}

            {error ? (
                <div id={`${groupId}-error`} className="radio__error">
                    <span className="radio__errorIcon" aria-hidden>!</span>
                    {error}
                </div>
            ) : null}
        </div>
    );
};