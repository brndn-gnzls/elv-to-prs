import React, { useState } from 'react';
import './LeftNav.css';

/** LeftNav
 * brand: 'anthem' | 'healthyblue' | 'wellpoint'
 * sections: [{ title, description, links: [{ label, href, active, icon }] }]
 */
export const LeftNav = ({
                            brand = 'anthem',
                            sections = [
                                {
                                    title: 'Resources',
                                    description: 'Common tasks',
                                    links: [
                                        { label: 'Dashboard', href: '#', active: true },
                                        { label: 'Claims',    href: '#', active: false },
                                    ],
                                },
                                {
                                    title: 'Benefits',
                                    description: 'Plans & coverage',
                                    links: [
                                        { label: 'My plan', href: '#', active: false },
                                        { label: 'Providers', href: '#', active: false },
                                    ],
                                },
                            ],
                        }) => {
    const [open, setOpen] = useState(() => sections.map((_, i) => i === 0));

    const toggle = (i) =>
        setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

    return (
        <nav className={`leftnav leftnav--${brand}`} role="navigation" aria-label="Left navigation">
            {sections.map((s, i) => {
                const expanded = !!open[i];
                return (
                    <section key={i} aria-label={s.title}>
                        <header
                            className={`leftnav__header ${expanded ? 'leftnav__header--expanded leftnav__header--active' : ''}`}
                            onClick={() => toggle(i)}
                            aria-expanded={expanded}
                        >
                            <span className="leftnav__chevron" aria-hidden>▸</span>
                            <div>
                                <div className="leftnav__title">{s.title}</div>
                                {s.description ? <div className="leftnav__desc">{s.description}</div> : null}
                            </div>
                            <span aria-hidden />
                        </header>

                        {expanded && (
                            <div className="leftnav__panel" role="group" aria-label={`${s.title} links`}>
                                {s.links.map((lnk, j) => (
                                    <a
                                        key={j}
                                        className={`leftnav__link ${lnk.active ? 'leftnav__link--active' : ''}`}
                                        href={lnk.href}
                                    >
                                        <span className="leftnav__icon" aria-hidden>●</span>
                                        <span>{lnk.label}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </section>
                );
            })}
        </nav>
    );
};