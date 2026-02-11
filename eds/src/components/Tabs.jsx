import React, { useId, useState } from 'react';
import './Tabs.css';

/** Tabs
 *  - variants: 'minimal' | 'pointer'
 *  - brand: 'anthem' | 'healthyblue' | 'wellpoint'
 *  - interactive (click to activate)
 *  - ARIA per APG: role="tablist", role="tab", role="tabpanel"
 */
export const Tabs = ({
                         brand = 'anthem',
                         variant = 'minimal',
                         disabled = false,
                         tabs = [
                             { label: 'Overview', icon: null, panel: 'Overview content' },
                             { label: 'Details',  icon: null, panel: 'Details content'  },
                             { label: 'More',     icon: null, panel: 'More content'     },
                         ],
                         defaultIndex = 0,
                     }) => {
    const [index, setIndex] = useState(defaultIndex);
    const ns = useId();

    const cls = ['tabs', `tabs--${brand}`, `tabs--${variant}`, disabled && 'tabs--disabled']
        .filter(Boolean).join(' ');

    return (
        <div className={cls}>
            <div role="tablist" aria-label="Tabs" className="tabs__list">
                {tabs.map((t, i) => {
                    const selected = i === index;
                    return (
                        <button
                            key={i}
                            role="tab"
                            id={`${ns}-tab-${i}`}
                            aria-selected={selected}
                            aria-controls={`${ns}-panel-${i}`}
                            tabIndex={selected ? 0 : -1}
                            className="tabs__tab"
                            onClick={() => !disabled && setIndex(i)}
                            disabled={disabled}
                        >
                            {t.icon ? <span className="tabs__icon" aria-hidden>{t.icon}</span> : null}
                            <span className="tabs__label">{t.label}</span>
                        </button>
                    );
                })}
            </div>

            {tabs.map((t, i) => (
                <div
                    key={i}
                    role="tabpanel"
                    id={`${ns}-panel-${i}`}
                    aria-labelledby={`${ns}-tab-${i}`}
                    hidden={i !== index}
                    className="tabs__panel"
                >
                    {t.panel}
                </div>
            ))}
        </div>
    );
};
