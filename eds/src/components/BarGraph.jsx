import React from 'react';
import './BarGraph.css';

/** BarGraph variants: 'standard' (stacked segments), 'timeline' (progress + markers), 'milestone' (segments + legend). */
export const BarGraph = ({
                             brand = 'anthem',                 // anthem | healthyblue | wellpoint
                             variant = 'standard',             // standard | timeline | milestone
                             standardSegments = [20, 15, 10, 5, 3], // percentages for seg 1..5 (demo)
                             progress = 45,                    // timeline % filled
                             markers = [{ pos: 60, tone: 'blue' }, { pos: 80, tone: 'gray' }], // timeline markers (0..100)
                             milestoneSegments = [30, 20, 10], // milestone segs
                             title,
                             description,
                         }) => {
    const classes = ['bargraph', `bargraph--${brand}`, `bargraph--${variant}`].join(' ');

    return (
        <div className={classes}>
            {title && <div className="bargraph__title">{title}</div>}
            {description && <div className="bargraph__desc">{description}</div>}

            {variant === 'standard' && (
                <div className="bargraph__track" aria-label="Standard bar">
                    {standardSegments.map((w, i) => (
                        <div key={i} className={`bargraph__seg bargraph__seg--${i+1}`} style={{ width: `${w}%` }} />
                    ))}
                </div>
            )}

            {variant === 'timeline' && (
                <div className="bargraph__track" aria-label="Timeline bar">
                    <div className="bargraph__progress" style={{ width: `${progress}%` }} />
                    {markers.map((m, i) => (
                        <div
                            key={i}
                            className={`bargraph__marker ${m.tone === 'gray' ? 'bargraph__marker--gray' : ''}`}
                            style={{ left: `${m.pos}%` }}
                            aria-label={`marker ${i+1}`}
                        />
                    ))}
                </div>
            )}

            {variant === 'milestone' && (
                <>
                    <div className="bargraph__track" aria-label="Milestone bar">
                        {milestoneSegments.map((w, i) => (
                            <div key={i} className={`bargraph__seg bargraph__seg--${i+1}`} style={{ width: `${w}%` }} />
                        ))}
                    </div>
                    <div className="bargraph__legend">
                        <span className="bargraph__chip bargraph__chip--1" />
                        <span className="bargraph__chip bargraph__chip--2" />
                        <span className="bargraph__chip bargraph__chip--3" />
                    </div>
                </>
            )}
        </div>
    );
};