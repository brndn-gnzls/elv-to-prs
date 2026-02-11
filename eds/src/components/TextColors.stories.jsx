/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { TextColors } from './TextColors';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/textcolors.css?v=tc1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/textcolors.css?v=tc1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/textcolors.css?v=tc1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (semantic aliases only for this set) */
const ROWS = [
    { key: 'textColors/text/darkGray',  var: '--semantic-tc-text-darkGray'  },
    { key: 'textColors/text/lightGray', var: '--semantic-tc-text-lightGray' },
    { key: 'textColors/text/white',     var: '--semantic-tc-text-white'     },
    { key: 'textColors/text/primary',   var: '--semantic-tc-text-primary'   },
    { key: 'textColors/text/error',     var: '--semantic-tc-text-error'     },
    { key: 'textColors/text/pending',   var: '--semantic-tc-text-pending'   },
    { key: 'textColors/text/success',   var: '--semantic-tc-text-success'   },
];

export default {
    title: 'Components/TextColors',
    component: TextColors,
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
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;                                       // inject one brand into Canvas
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true))); // wait until styles are active
    }, [brand, entry.css]);

    return { ready, canonicalPrefix: entry.prefix };
};

const TokenTable = ({ el, canonicalPrefix, ready }) => {
    const rows = useMemo(() => {
        if (!ready) {
            return ROWS.map(r => ({
                ...r,
                canonicalVar: `${canonicalPrefix}${r.var.replace('--semantic-', '')}`,
                value: '…',
            }));
        }
        const csEl = el ? getComputedStyle(el) : null;

        return ROWS.map(r => {
            const value = csEl?.getPropertyValue(r.var)?.trim() || 'N/A';
            const canonicalVar = `${canonicalPrefix}${r.var.replace('--semantic-', '')}`;
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
                                    background: r.value && r.value !== 'N/A' && /^#|rgb|hsl/.test(r.value) ? r.value : 'transparent',
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

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.textcolors'))); },
        [ready, args.brand]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <TextColors {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = { brand: 'anthem' };