/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { ButtonGroup } from './ButtonGroup';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/buttongroup.css?v=bgp1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/buttongroup.css?v=bgp1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/buttongroup.css?v=bgp1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping */
const ROWS = [
    // background (semantic)
    { key: 'buttonGroup/background/container', var: '--semantic-btg-bg-container' },

    // drop shadow (brand slots + primitive blur)
    { key: 'buttonGroup/dropShadow/background', var: '--brand-btg-dropshadow-bg',  source: 'root' },
    { key: 'buttonGroup/dropShadow/y',          var: '--brand-btg-dropshadow-y',   source: 'root' },
    { key: 'buttonGroup/dropShadow/blur',       var: '--primitives-sizing-250',    source: 'root' },

    // paddings & gap
    { key: 'buttonGroup/padding/gap',                         var: '--primitives-spacing-4', source: 'root' },
    { key: 'buttonGroup/padding/horizontal/container',        var: '--primitives-spacing-3', source: 'root' },
    { key: 'buttonGroup/padding/vertical/container',          var: '--primitives-spacing-6', source: 'root' },
];

export default {
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    parameters: {

        designToken: { tabs: ["ButtonGroup (Anthem)"] },
        controls: { include: ['brand'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) {
            tag = document.createElement('style');
            tag.id = 'dynamic-brand-styles';
            document.head.appendChild(tag);
        }
        tag.textContent = entry.css;                         // inject exactly one brand into the Canvas iframe
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true))); // wait until styles are active
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
            const value = (fromRoot ? csRoot.getPropertyValue(r.var) : csEl?.getPropertyValue(r.var))
                ?.trim() || 'N/A';

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

    useEffect(() => {
        if (ready) requestAnimationFrame(() => setRootEl(document.querySelector('.buttongroup')));
    }, [ready, args.brand]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <ButtonGroup {...args} />
            <TokenTable rootEl={rootEl} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = { brand: 'anthem' };