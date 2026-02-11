import React from 'react';
import './ButtonGroup.css';

export const ButtonGroup = ({
                                brand = 'anthem',            // anthem | healthyblue | wellpoint
                                buttons = [
                                    { label: 'Primary',  onClick: () => {} },
                                    { label: 'Secondary', onClick: () => {} },
                                    { label: 'Ghost',     onClick: () => {} },
                                ],
                            }) => {
    const cls = ['buttongroup', `buttongroup--${brand}`].join(' ');
    return (
        <div className={cls} role="group" aria-label="Button group">
            {buttons.map((b, i) => (
                <button key={i} className="buttongroup__btn" type="button" onClick={b.onClick}>
                    {b.label}
                </button>
            ))}
        </div>
    );
};