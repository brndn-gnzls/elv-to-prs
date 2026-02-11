import React from 'react';
import './ProgressBar.css';

/** ProgressBar
 *  variant: 'line' | 'success-line' | 'complete'
 *  value: 0..100 (for line variants)
 */
export const ProgressBar = ({
                                brand = 'anthem',            // anthem | healthyblue | wellpoint
                                variant = 'line',            // 'line' (primary), 'success-line', 'complete'
                                value = 40,                  // percent for line variants
                                currentLabel = 'In progress',
                                inactiveLabel = 'Queued',
                            }) => {
    const classes = [
        'progressbar',
        `progressbar--${brand}`,
        variant === 'success-line' && 'progressbar--success',
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {variant === 'complete' ? (
                <div className="progressbar__outline" aria-label="Completed step">
                    <div className="progressbar__complete" title="Complete">✓</div>
                </div>
            ) : (
                <>
                    <div className="progressbar__line" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
                        <div className="progressbar__lineFill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
                    </div>
                    <div className="progressbar__labels">
                        <span className="progressbar__label--inactive">{inactiveLabel}</span>
                        <span className="progressbar__label--current">{currentLabel}</span>
                    </div>
                </>
            )}
        </div>
    );
};