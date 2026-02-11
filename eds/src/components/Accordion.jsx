import React, { useState } from 'react';
import './Accordion.css';

/**
 * Accordion
 * - Interactive (open on click)
 * - Uses brand-scoped aliases defined on `.accordion--{brand}`
 */
export const Accordion = ({
                              brand = 'anthem',          // 'anthem' | 'healthyblue' | 'wellpoint'
                              items = [
                                  { title: 'First item', description: 'Optional description', content: 'Body content...' },
                                  { title: 'Second item', description: '', content: 'More content...' },
                              ],
                          }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (idx) => setOpenIndex((cur) => (cur === idx ? null : idx));

    return (
        <div className={`accordion accordion--${brand}`}>
            {items.map((it, idx) => {
                const isOpen = openIndex === idx;
                return (
                    <div key={idx} className="accordion__item">
                        <div className="accordion__header" onClick={() => toggle(idx)}>
              <span className={`accordion__icon ${isOpen ? 'accordion__icon--open' : ''}`} aria-hidden>
                ▸
              </span>
                            <span className="accordion__title">{it.title}</span>
                            <span aria-hidden />
                        </div>

                        {it.description ? (
                            <div className="accordion__description">{it.description}</div>
                        ) : null}

                        <div className={`accordion__content ${isOpen ? 'open' : ''}`}>
                            {it.content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
