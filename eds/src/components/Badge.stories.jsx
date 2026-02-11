/* eslint import/no-webpack-loader-syntax: off */
import React, { useEffect, useMemo, useState } from 'react';
import { Badge } from './Badge';

/* Inject one brand stylesheet (cache-busted like your other stories) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/badge.css?v=bg1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/badge.css?v=bg1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/badge.css?v=bg1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping */
const ROWS = [
    { key: 'badgeInfo/text/white',  var: '--semantic-badge-text-white' },
    { key: 'badgeInfo/text/gray',   var: '--semantic-badge-text-gray' },

    { key: 'badgeInfo/background/success',       var: '--semantic-badge-bg-success' },
    { key: 'badgeInfo/background/info',          var: '--semantic-badge-bg-info' },
    { key: 'badgeInfo/background/warning',       var: '--semantic-badge-bg-warning' },
    { key: 'badgeInfo/background/optionalWhite', var: '--semantic-badge-bg-optionalWhite' },
    { key: 'badgeInfo/background/optionalGray',  var: '--semantic-badge-bg-optionalGray' },
    { key: 'badgeInfo/background/urgent',        var: '--semantic-badge-bg-urgent' },
    { key: 'badgeInfo/background/darkNeutral',   var: '--semantic-badge-bg-darkNeutral' },
    { key: 'badgeInfo/background/purple',        var: '--semantic-badge-bg-purple' },

    // primitives
    { key: 'badgeInfo/font/weight',     var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'badgeInfo/font/size',       var: '--primitives-font-size-2xs',                source: 'root' },
    { key: 'badgeInfo/font/lineHeight', var: '--primitives-line-height-2xs',              source: 'root' },
    { key: 'badgeInfo/borderRadius',    var: '--primitives-border-radius-rounded-sm',     source: 'root' },
    { key: 'badgeInfo/padding/vertical',   var: '--primitives-spacing-050',               source: 'root' },
    { key: 'badgeInfo/padding/horizontal', var: '--primitives-spacing-2',                 source: 'root' },
    { key: 'badgeInfo/padding/gap',        var: '--primitives-spacing-0',                 source: 'root' },
];

export default {
    title: 'Components/Badge',
    component: Badge,
    parameters: {

        designToken: { tabs: ["Badge (Anthem)"] },
        controls: { include: ['brand', 'variant', 'tone', 'children'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
        files: ['../src/design-tokens/anthem/badge.css'],
    },
    argTypes: {
        brand:   { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        variant: { control: 'select', options: ['success', 'info', 'warning', 'urgent', 'darkNeutral', 'purple', 'optionalWhite', 'optionalGray'] },
        tone:    { control: 'select', options: ['textWhite', 'textGray'] },
        children:{ control: 'text' },
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

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.badge'))); },
        [ready, args.brand, args.variant, args.tone, args.children]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <Badge {...args}>Badge</Badge>
            {/* <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} /> */}
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    variant: 'info',
    tone: 'textWhite',
    children: 'Badge',
};
