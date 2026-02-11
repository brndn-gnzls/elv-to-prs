/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { SlideIn } from './SlideIn';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/slidein.css?v=si1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/slidein.css?v=si1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/slidein.css?v=si1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping */
const ROWS = [
    // backgrounds & borders (semantic + brand slots)
    { key: 'slideIn/background/overlay',   var: '--brand-slidein-bg-overlay',              source: 'root' },
    { key: 'slideIn/background/card',      var: '--semantic-slidein-bg-card' },
    { key: 'slideIn/background/backArrow', var: '--semantic-slidein-bg-backArrow' },
    { key: 'slideIn/border/card',          var: '--brand-slidein-border-card',             source: 'root' },

    // icon & text
    { key: 'slideIn/icon/backArrow', var: '--semantic-slidein-icon-backArrow' },
    { key: 'slideIn/text/header',    var: '--semantic-slidein-text-header' },
    { key: 'slideIn/text/content',   var: '--semantic-slidein-text-content' },

    // fonts (primitives)
    { key: 'slideIn/font/weight/content',  var: '--primitives-anthem-font-weight-regular', source: 'root' },
    { key: 'slideIn/font/size/content',    var: '--primitives-font-size-base',             source: 'root' },
    { key: 'slideIn/font/lineHeight/content', var: '--primitives-line-height-base',        source: 'root' },

    // widths (brand slots)
    { key: 'slideIn/width/overlay',     var: '--brand-slidein-width-overlay',              source: 'root' },
    { key: 'slideIn/width/card',        var: '--brand-slidein-width-card',                 source: 'root' },
    { key: 'slideIn/width/cardContent', var: '--brand-slidein-width-cardContent',          source: 'root' },

    // paddings
    { key: 'slideIn/padding/gap/cardContent',   var: '--primitives-spacing-8',             source: 'root' },
    { key: 'slideIn/padding/right/buttonGroup', var: '--brand-slidein-padding-right-buttonGroup', source: 'root' },
];

export default {
    title: 'Components/SlideIn',
    component: SlideIn,
    parameters: {

        designToken: { tabs: ["SlideIn (Anthem)"] },
        controls: { include: ['brand', 'open', 'title'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        open:  { control: 'boolean' },
        title: { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css; // inject one brand into the Canvas iframe
        // wait until styles are active before reading computed values
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    }, [brand, entry.css]);

    return { ready, canonicalPrefix: entry.prefix };
};

const TokenTable = ({ rootEl, canonicalPrefix, ready }) => {
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
        const csEl   = rootEl ? getComputedStyle(rootEl) : null;
        const csRoot = getComputedStyle(document.documentElement);

        return ROWS.map(r => {
            const fromRoot = r.source === 'root';
            const value = (fromRoot ? csRoot.getPropertyValue(r.var) : csEl?.getPropertyValue(r.var))?.trim() || 'N/A';
            const canonicalVar = r.var.startsWith('--semantic-')
                ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}`
                : r.var;
            return { ...r, canonicalVar, value };
        });
    }, [rootEl, ready, canonicalPrefix]);

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
                                        r.value && r.value !== 'N/A' && /^#|rgb|hsl/.test(r.value)
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
    const [rootEl, setRootEl] = useState(null);

    useEffect(() => { if (ready) requestAnimationFrame(() => setRootEl(document.querySelector('.slidein'))); },
        [ready, args.brand, args.open, args.title]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <SlideIn {...args} />
            <TokenTable rootEl={rootEl} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    open: true,
    title: 'Slide-in panel',
};