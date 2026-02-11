import React from 'react';
import './TextColors.css';

/** TextColors
 * brand: 'anthem' | 'healthyblue' | 'wellpoint'
 * Renders simple text samples for each color alias.
 */
export const TextColors = ({ brand = 'anthem' }) => {
    const cls = ['textcolors', `textcolors--${brand}`].join(' ');
    const rows = [
        { key: 'darkGray',  className: 'textcolors__sample--darkGray',  label: 'darkGray'  },
        { key: 'lightGray', className: 'textcolors__sample--lightGray', label: 'lightGray' },
        { key: 'white',     className: 'textcolors__sample--white',     label: 'white'     },
        { key: 'primary',   className: 'textcolors__sample--primary',   label: 'primary'   },
        { key: 'error',     className: 'textcolors__sample--error',     label: 'error'     },
        { key: 'pending',   className: 'textcolors__sample--pending',   label: 'pending'   },
        { key: 'success',   className: 'textcolors__sample--success',   label: 'success'   },
    ];

    return (
        <div className={cls}>
            {rows.map(r => (
                <div key={r.key} className="textcolors__row">
                    <div className="textcolors__label">{r.label}</div>
                    <div className={r.className}>The quick brown fox jumps over the lazy dog.</div>
                </div>
            ))}
        </div>
    );
};