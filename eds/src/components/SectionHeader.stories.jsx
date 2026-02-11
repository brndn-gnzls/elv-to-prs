/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { SectionHeader } from './SectionHeader';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/sectionheader.css?v=sh1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/sectionheader.css?v=sh1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/sectionheader.css?v=sh1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (semantic aliases or primitives) */
const ROWS = [
    // Divider fills
    { key: 'sectionHeader/fill/divider/default',       var: '--semantic-sh-divider-default' },
    { key: 'sectionHeader/fill/divider/compounded',    var: '--semantic-sh-divider-compounded' },
    { key: 'sectionHeader/fill/divider/subheaderLarge',var: '--semantic-sh-divider-subheaderLg' },
    { key: 'sectionHeader/fill/divider/subheaderSmall',var: '--semantic-sh-divider-subheaderSm' },

    // Header & Description text
    { key: 'sectionHeader/text/header/default',        var: '--semantic-sh-text-header-default' },
    { key: 'sectionHeader/text/header/compounded',     var: '--semantic-sh-text-header-compounded' },
    { key: 'sectionHeader/text/header/subheaderLarge', var: '--semantic-sh-text-header-subheaderLg' },
    { key: 'sectionHeader/text/header/subheaderSmall', var: '--semantic-sh-text-header-subheaderSm' },
    { key: 'sectionHeader/text/description/default',   var: '--semantic-sh-text-desc-default' },
    { key: 'sectionHeader/text/description/compounded',var: '--semantic-sh-text-desc-compounded' },

    // Primitives (widths/heights/spacing)
    { key: 'sectionHeader/width/divider/default',       var: '--primitives-section-header-divider-width-default',    source: 'root' },
    { key: 'sectionHeader/width/divider/compounded',    var: '--primitives-section-header-divider-width-compounded', source: 'root' },
    { key: 'sectionHeader/width/divider/subheaderLarge',var: '--primitives-section-header-divider-width-subheaderLarge', source: 'root' },
    { key: 'sectionHeader/width/divider/subheaderSmall',var: '--primitives-section-header-divider-width-subheaderSmall', source: 'root' },

    { key: 'sectionHeader/height/divider/default',      var: '--primitives-sizing-1', source: 'root' },
    { key: 'sectionHeader/height/compounded',           var: '--primitives-sizing-025', source: 'root' },
    { key: 'sectionHeader/height/subheaderLarge',       var: '--primitives-section-header-divider-height-subheaderLarge', source: 'root' },
    { key: 'sectionHeader/height/subheaderSmall',       var: '--primitives-section-header-divider-height-subheaderSmall', source: 'root' },

    { key: 'sectionHeader/padding/gap/header/default',     var: '--primitives-spacing-2',   source: 'root' },
    { key: 'sectionHeader/padding/gap/header/compounded',  var: '--primitives-spacing-2',   source: 'root' },
    { key: 'sectionHeader/padding/gap/header/subheaderLarge', var: '--primitives-spacing-250', source: 'root' },
    { key: 'sectionHeader/padding/gap/header/subheaderSmall', var: '--primitives-spacing-250', source: 'root' },

    // brand-specific top paddings (sheet shows 0 for Anthem; leaving extensibility hooks)
    { key: 'sectionHeader/padding/top/subheaderLarge', var: '--brand-sectionheader-padding-top-subheaderLarge', source: 'root' },
    { key: 'sectionHeader/padding/top/subheaderSmall', var: '--brand-sectionheader-padding-top-subheaderSmall', source: 'root' },
];

export default {
    title: 'Components/SectionHeader',
    component: SectionHeader,
    parameters: {

        designToken: { tabs: ["SectionHeader (Anthem)"] },
        controls: { include: ['brand', 'mode', 'title', 'description'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        mode:  { control: 'select', options: ['default', 'compounded', 'subheaderLarge', 'subheaderSmall'] },
        title: { control: 'text' },
        description: { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;  // inject one brand into the Canvas
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true))); // wait until active (Canvas). :contentReference[oaicite:2]{index=2}
    }, [brand, entry.css]);

    return { ready, canonicalPrefix: entry.prefix };
};

const TokenTable = ({ el, canonicalPrefix, ready }) => {
    const rows = useMemo(() => {
        if (!ready) {
            return ROWS.map(r => ({
                ...r,
                canonicalVar: r.var.startsWith('--semantic-')
                    ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}`
                    : r.var,
                value: '…',
            }));
        }
        const csEl = el ? getComputedStyle(el) : null;
        const csRoot = getComputedStyle(document.documentElement);

        return ROWS.map(r => {
            const fromRoot = r.source === 'root';
            const value = (fromRoot ? csRoot.getPropertyValue(r.var) : csEl?.getPropertyValue(r.var))?.trim() || 'N/A';
            const canonicalVar = r.var.startsWith('--semantic-')
                ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}`
                : r.var;
            return { ...r, canonicalVar, value };
        });
    }, [el, ready, canonicalPrefix]);

    return (
        <div style={{ marginTop: 24, width: '100%' }}>
            <h3>🎨 Design Tokens (Rendered Values)</h3>
            <div style={{ width: '100%', overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: 8, whiteSpace: 'nowrap' }}>Spreadsheet Key</th>
                        <th style={{ padding: 8, whiteSpace: 'nowrap' }}>CSS Var Used</th>
                        <th style={{ padding: 8, whiteSpace: 'nowrap' }}>Resolves to (Brand-scoped)</th>
                        <th style={{ padding: 8, whiteSpace: 'nowrap' }}>Computed</th>
                        <th style={{ padding: 8, whiteSpace: 'nowrap' }}>Preview</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((r) => (
                        <tr key={r.key}>
                            <td style={{ padding: 8 }}>{r.key}</td>
                            <td style={{ padding: 8 }}><code>{r.var}</code></td>
                            <td style={{ padding: 8 }}><code>{r.canonicalVar}</code></td>
                            <td style={{ padding: 8 }}>{r.value}</td>
                            <td style={{ padding: 8 }}>
                                <div style={{
                                    width: 24, height: 24, border: '1px solid #ccc',
                                    background:
                                        r.value && r.value !== 'N/A' && r.value !== '…' && /^#|rgb|hsl/.test(r.value)
                                            ? r.value
                                            : 'transparent',
                                }}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Template = (args) => {
    const { ready, canonicalPrefix } = useBrandCss(args.brand);
    const [el, setEl] = useState(null);

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.sectionheader'))); },
        [ready, args.brand, args.mode, args.title, args.description]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <SectionHeader {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    mode: 'default',
    title: 'Section header',
    description: 'Optional description goes here.',
};