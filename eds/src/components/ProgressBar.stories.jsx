/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { ProgressBar } from './ProgressBar';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/progressbar.css?v=pb1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/progressbar.css?v=pb1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/progressbar.css?v=pb1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (semantic aliases or primitives) */
const ROWS = [
    // FILL complete/line
    { key: 'progressBar/fill/complete/primary', var: '--semantic-pb-fill-complete-primary' },
    { key: 'progressBar/fill/complete/success', var: '--semantic-pb-fill-complete-success' },

    { key: 'progressBar/fill/line/primary',  var: '--semantic-pb-fill-line-primary' },
    { key: 'progressBar/fill/line/inactive', var: '--semantic-pb-fill-line-inactive' },
    { key: 'progressBar/fill/line/success',  var: '--semantic-pb-fill-line-success' },

    // BORDERS
    { key: 'progressBar/border/current/primary', var: '--semantic-pb-border-current-primary' },
    { key: 'progressBar/border/current/success', var: '--semantic-pb-border-current-success' },
    { key: 'progressBar/border/inactive',        var: '--semantic-pb-border-inactive' },

    // TEXT
    { key: 'progressBar/text/inactive',       var: '--semantic-pb-text-inactive' },
    { key: 'progressBar/text/active/primary', var: '--semantic-pb-text-active-primary' },
    { key: 'progressBar/text/active/success', var: '--semantic-pb-text-active-success' },

    // ICON
    { key: 'progressBar/icon/complete', var: '--semantic-pb-icon-complete' },

    // PRIMITIVES
    { key: 'progressBar/icon/size/complete',  var: '--primitives-sizing-350', source: 'root' },
    { key: 'progressBar/font/fontWeight/complete', var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'progressBar/font/fontWeight/current',  var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'progressBar/font/fontWeight/inactive', var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'progressBar/font/size',       var: '--primitives-font-size-sm',         source: 'root' },
    { key: 'progressBar/font/lineHeight', var: '--primitives-line-height-2xs',      source: 'root' },
    { key: 'progressBar/padding/gap',     var: '--primitives-spacing-2',            source: 'root' },

    { key: 'progressBar/height/step/complete',     var: '--primitives-sizing-5',    source: 'root' },
    { key: 'progressBar/height/horizontal/line',   var: '--primitives-sizing-050',  source: 'root' },
    { key: 'progressBar/height/vertical/line',     var: '--primitives-progress-bar-line-height-vertical', source: 'root' },
    { key: 'progressBar/height/container',         var: '--primitives-sizing-5',    source: 'root' },

    { key: 'progressBar/width/horizontal/line',    var: '--primitives-progress-bar-line-width-horizontal',   source: 'root' },
    { key: 'progressBar/width/vertical/line',      var: '--primitives-sizing-050',  source: 'root' },
    { key: 'progressBar/width/step/complete',      var: '--primitives-sizing-5',    source: 'root' },
    { key: 'progressBar/width/container',          var: '--primitives-sizing-5',    source: 'root' },

    { key: 'progressBar/maxWidth/text',            var: '--primitives-progress-bar-text-max-width',  source: 'root' },
    { key: 'progressBar/minWidth/horizontal/line', var: '--primitives-progress-bar-line-min-width-horizontal', source: 'root' },
];

/* Story config */
export default {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    parameters: {

        designToken: { tabs: ["ProgressBar (Anthem)"] },
        controls: { include: ['brand', 'variant', 'value', 'currentLabel', 'inactiveLabel'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand:  { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        variant:{ control: 'select', options: ['line', 'success-line', 'complete'] },
        value:  { control: 'number', min: 0, max: 100 },
        currentLabel:  { control: 'text' },
        inactiveLabel: { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;                               // inject one brand into the Canvas iframe
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));   // wait until styles are active
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

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.progressbar'))); },
        [ready, args.brand, args.variant, args.value, args.currentLabel, args.inactiveLabel]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <ProgressBar {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    variant: 'line',
    value: 40,
    currentLabel: 'Processing',
    inactiveLabel: 'Waiting',
};