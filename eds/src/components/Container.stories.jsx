/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Container } from './Container';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/container.css?v=ct1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/container.css?v=ct1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/container.css?v=ct1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (alias or primitive) */
const ROWS = [
    // backgrounds (semantic)
    { key: 'container/background/white', var: '--semantic-container-bg-white' },
    { key: 'container/background/gray',  var: '--semantic-container-bg-gray' },

    // border (primitives)
    { key: 'container/border/default', var: '--primitives-colors-grays-200', source: 'root' },
    { key: 'container/border/size',    var: '--primitives-sizing-025',       source: 'root' },

    // widths (primitives)
    { key: 'container/minWidth', var: '--primitives-container-min-width', source: 'root' },
    { key: 'container/maxWidth', var: '--primitives-container-max-width', source: 'root' },
];

export default {
    title: 'Components/Container',
    component: Container,
    parameters: {
        controls: { include: ['brand', 'variant'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand:   { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        variant: { control: 'select', options: ['white', 'gray'] },
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
        tag.textContent = entry.css; // inject exactly one brand into the Canvas
        // wait until styles are active before computed reads
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

    useEffect(() => {
        if (ready) requestAnimationFrame(() => setEl(document.querySelector('.container')));
    }, [ready, args.brand, args.variant]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <Container {...args}>
                <div style={{ padding: 16 }}>Container content</div>
            </Container>
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    variant: 'white',
};