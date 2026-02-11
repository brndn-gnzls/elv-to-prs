/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Accordion } from './Accordion';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/accordion.css?v=ac2';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/accordion.css?v=ac2';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/accordion.css?v=ac2';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (semantic aliases or primitives) */
const ROWS = [
    // icons
    { key: 'accordion/icon/default', var: '--semantic-accordion-icon-default' },
    { key: 'accordion/icon/hover',   var: '--semantic-accordion-icon-hover' },
    { key: 'accordion/icon/size',    var: '--primitives-sizing-6', source: 'root' },

    // text
    { key: 'accordion/text/title',       var: '--semantic-accordion-text-title' },
    { key: 'accordion/text/content',     var: '--semantic-accordion-text-content' },
    { key: 'accordion/text/description', var: '--semantic-accordion-text-description' },

    // backgrounds
    { key: 'accordion/background/default', var: '--semantic-accordion-bg-default' },
    { key: 'accordion/background/hover',   var: '--semantic-accordion-bg-hover' },

    // font weights (content/description) — using Anthem primitives consistently as in prior stories
    { key: 'accordion/font/weight/content',     var: '--primitives-anthem-font-weight-medium', source: 'root' },
    { key: 'accordion/font/weight/description', var: '--primitives-anthem-font-weight-medium', source: 'root' },

    // font sizes
    { key: 'accordion/font/size/content',     var: '--primitives-font-size-base', source: 'root' },
    { key: 'accordion/font/size/description', var: '--primitives-font-size-sm',   source: 'root' },

    // line-heights
    { key: 'accordion/font/lineHeight/content',     var: '--primitives-line-height-base', source: 'root' },
    { key: 'accordion/font/lineHeight/description', var: '--primitives-line-height-sm',   source: 'root' },

    // paddings & gap (container & title)
    { key: 'accordion/padding/vertical/container',   var: '--primitives-sizing-6', source: 'root' },
    { key: 'accordion/padding/horizontal/container', var: '--primitives-sizing-6', source: 'root' },
    { key: 'accordion/padding/gap/title',            var: '--primitives-sizing-6', source: 'root' },
];

export default {
    title: 'Components/Accordion',
    component: Accordion,
    parameters: {
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
        tag.textContent = entry.css; // inject exactly one brand into the Canvas iframe
        // wait two rAFs so styles are active before we read computed values
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

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.accordion'))); },
        [ready, args.brand]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <Accordion
                {...args}
                items={[
                    { title: 'Accordion item #1', description: 'Optional description', content: 'Body content for item 1.' },
                    { title: 'Accordion item #2', description: '', content: 'Body content for item 2.' },
                ]}
            />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
};