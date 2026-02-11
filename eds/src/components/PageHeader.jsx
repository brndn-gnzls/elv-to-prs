import React from 'react';
import './PageHeader.css';

/** PageHeader
 * brand: 'anthem' | 'healthyblue' | 'wellpoint'
 * mode: 'A' | 'B'   (background system)
 * Renders a welcome hero + a simple "member tabs" row and a couple of search rails.
 */
export const PageHeader = ({
                               brand = 'anthem',
                               mode = 'A',                 // 'A' uses primitives ...backgroundA/..., 'B' uses ...backgroundB/...
                               memberName = 'Alex Johnson',
                               memberTabs = [
                                   { label: 'Member', active: true },
                                   { label: 'Claims', active: false },
                                   { label: 'Benefits', active: false },
                               ],
                           }) => {
    const bgClass = mode === 'B' ? 'pageheader__bgB' : 'pageheader__bgA';
    return (
        <header className={`pageheader pageheader--${brand}`}>
            <div className={`pageheader__standard ${bgClass}`}>
                <div className="pageheader__welcome">
                    <div className="pageheader__memberName">{memberName}</div>

                    {/* simple member tabs demo */}
                    <div className="pageheader__tabs">
                        {memberTabs.map((t, idx) => (
                            <div key={idx} className={`pageheader__tab ${t.active ? 'pageheader__tab--active' : ''}`}>
                                {t.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* two search rails showing border tokens */}
            <div className="pageheader__searchBeta" aria-hidden />
            <div className="pageheader__standardSearch" aria-hidden />
        </header>
    );
};