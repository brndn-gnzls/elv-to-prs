import React from 'react';
import './SectionHeader.css';

/** SectionHeader variants:
 *  mode: 'default' | 'compounded' | 'subheaderLarge' | 'subheaderSmall'
 */
export const SectionHeader = ({
                                  brand = 'anthem',                // anthem | healthyblue | wellpoint
                                  mode = 'default',                // default | compounded | subheaderLarge | subheaderSmall
                                  title = 'Section title',
                                  description = 'Section description',
                              }) => {
    const classes = ['sectionheader', `sectionheader--${brand}`, `sectionheader--${mode}`].join(' ');
    return (
        <div className={classes}>
            <div className="sectionheader__header">
                <div className="sectionheader__title">{title}</div>
                <div className="sectionheader__desc">{description}</div>
            </div>
            <div className="sectionheader__divider" />
        </div>
    );
};