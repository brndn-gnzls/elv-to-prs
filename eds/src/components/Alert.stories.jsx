/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Alert } from './Alert';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/alert.css?v=al1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/alert.css?v=al1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/alert.css?v=al1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
};

/* Full table per spreadsheet */
const ROWS = [
    // text
    { key: 'alert/text/default', var: '--semantic-alert-text-default' },
    { key: 'alert/text/link',    var: '--semantic-alert-text-link' },

    // background
    { key: 'alert/background/default', var: '--semantic-alert-surface-background' },

    // innerShadow colors (size is primitive)
    { key: 'alert/innerShadow/error',   var: '--semantic-alert-shadow-error' },
    { key: 'alert/innerShadow/info',    var: '--semantic-alert-shadow-info' },
    { key: 'alert/innerShadow/success', var: '--semantic-alert-shadow-success' },
    { key: 'alert/innerShadow/urgent',  var: '--semantic-alert-shadow-urgent' },
    { key: 'alert/innerShadow/size',    var: '--primitives-sizing-1', source: 'root' },

    // border
    { key: 'alert/border/default', var: '--semantic-alert-border-default' },
    { key: 'alert/border/size',    var: '--primitives-sizing-025', source: 'root' },

    // icons
    { key: 'alert/icon/error',        var: '--semantic-alert-icon-error' },
    { key: 'alert/icon/info',         var: '--semantic-alert-icon-info' },
    { key: 'alert/icon/success',      var: '--semantic-alert-icon-success' },
    { key: 'alert/icon/urgent',       var: '--semantic-alert-icon-urgent' },
    { key: 'alert/icon/dismissIcon',  var: '--semantic-alert-icon-dismiss' },
    { key: 'alert/icon/size',         var: '--primitives-sizing-5', source: 'root' },

    // typography
    { key: 'alert/font/weight/default', var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'alert/font/weight/link',    var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'alert/font/size',           var: '--primitives-font-size-base',   source: 'root' },
    { key: 'alert/font/lineHeight',     var: '--primitives-line-height-base', source: 'root' },

    // padding
    { key: 'alert/padding/vertical',            var: '--primitives-spacing-2',   source: 'root' },
    { key: 'alert/padding/left',                var: '--primitives-spacing-4',   source: 'root' },
    { key: 'alert/padding/right',               var: '--primitives-spacing-2',   source: 'root' },
    { key: 'alert/padding/gap',                 var: '--primitives-spacing-3',   source: 'root' },
    { key: 'alert/padding/horizontal/dismissIcon', var: '--primitives-spacing-050', source: 'root' },
    { key: 'alert/padding/top/icon',            var: '--primitives-spacing-050', source: 'root' },
];

export default {
    title: 'Components/Alert',
    component: Alert,
    parameters: {

        designToken: { tabs: ["Alert (Anthem)"] },
        controls: { include: ['brand', 'kind', 'children'] },
        actions: { disable: true },
        a11y: { disable: true },
        docs: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'wellpoint', 'healthyblue'] },
        kind:  { control: 'select', options: ['info', 'success', 'urgent', 'error'] },
        children: { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;
        // Wait for styles to be active in the Canvas iframe before reading. :contentReference[oaicite:6]{index=6}
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
            const literal  = r.source === 'literal';
            const value = literal ? r.var
                : (fromRoot ? csRoot.getPropertyValue(r.var) : csEl?.getPropertyValue(r.var))?.trim() || 'N/A';
            const canonicalVar = r.var.startsWith('--semantic-')
                ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}`
                : r.var;
            return { ...r, canonicalVar, value };
        });
    }, [el, ready, canonicalPrefix]);

    return (
        <div style={{ marginTop: 24 }}>
            <h3>🎨 Design Tokens (Rendered Values)</h3>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: 8 }}>Spreadsheet Key</th>
                    <th style={{ padding: 8 }}>CSS Var Used</th>
                    <th style={{ padding: 8 }}>Resolves to (Brand-scoped)</th>
                    <th style={{ padding: 8 }}>Computed</th>
                    <th style={{ padding: 8 }}>Preview</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(r => (
                    <tr key={r.key}>
                        <td style={{ padding: 8 }}>{r.key}</td>
                        <td style={{ padding: 8 }}><code>{r.var}</code></td>
                        <td style={{ padding: 8 }}><code>{r.canonicalVar}</code></td>
                        <td style={{ padding: 8 }}>{r.value}</td>
                        <td style={{ padding: 8 }}>
                            <div style={{
                                width: 24, height: 24, border: '1px solid #ccc',
                                background: r.value && r.value !== 'N/A' && r.value !== '…' && /^#|rgb|hsl/.test(r.value) ? r.value : 'transparent',
                            }}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const Template = (args) => {
    const { ready, canonicalPrefix } = useBrandCss(args.brand);
    const [el, setEl] = useState(null);

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.alert'))); },
        [ready, args.brand, args.kind, args.children]);

    if (!ready) return <div style={{ fontFamily: 'Elevance-Sans', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20 }}>
            <Alert {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    kind: 'info',
    children: 'Heads up! This is an informational alert with an optional inline link.',
};


