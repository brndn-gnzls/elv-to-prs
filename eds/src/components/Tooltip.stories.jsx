/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Tooltip } from './Tooltip';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/tooltip.css?v=tt1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/tooltip.css?v=tt1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/tooltip.css?v=tt1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (semantic or primitive) */
const ROWS = [
    { key: 'tooltip/icon/close',        var: '--semantic-tt-icon-close' },
    { key: 'tooltip/icon/help/hover',   var: '--semantic-tt-icon-help-hover' },
    { key: 'tooltip/icon/help/resting', var: '--semantic-tt-icon-help-rest' },

    { key: 'tooltip/text',       var: '--semantic-tt-text' },
    { key: 'tooltip/background', var: '--semantic-tt-bg' },
    { key: 'tooltip/border/hover', var: '--semantic-tt-border-hover' },

    // PRIMITIVES
    { key: 'tooltip/icon/size/close', var: '--primitives-sizing-4', source: 'root' },
    { key: 'tooltip/icon/size/help',  var: '--primitives-sizing-5', source: 'root' },
    { key: 'tooltip/font/weight',     var: '--primitives-anthem-font-weight-medium', source: 'root' },
    { key: 'tooltip/font/size',       var: '--primitives-font-size-sm', source: 'root' },
    { key: 'tooltip/font/lineHeight', var: '--primitives-line-height-sm', source: 'root' },
    { key: 'tooltip/padding/horizontal/content', var: '--primitives-spacing-6', source: 'root' },
    { key: 'tooltip/padding/vertical/content',   var: '--primitives-spacing-6', source: 'root' },

    // brand slots (sheet shows 0 for Anthem, but provides brand paths for others)
    { key: 'tooltip/maxWidth', var: '--brand-tooltip-max-width', source: 'root' },
    { key: 'tooltip/minWidth', var: '--brand-tooltip-min-width', source: 'root' },
];

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {

        designToken: { tabs: ["Tooltip (Anthem)"] },
        controls: { include: ['brand', 'text', 'open'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        text:  { control: 'text' },
        open:  { control: 'boolean' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;  // inject one brand into the Canvas iframe
        // wait one microtask+frame so getComputedStyle reads active styles
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
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
        const csEl   = el ? getComputedStyle(el) : null;
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

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.tooltip'))); },
        [ready, args.brand, args.text, args.open]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <Tooltip {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    text: 'This is a tooltip with a help trigger and a close icon.',
    open: false,
};