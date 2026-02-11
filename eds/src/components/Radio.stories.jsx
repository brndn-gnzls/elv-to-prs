/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { RadioGroup } from './Radio';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/radio.css?v=rd1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/radio.css?v=rd1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/radio.css?v=rd1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* Full table — one row per spreadsheet mapping */
const ROWS = [
    // TEXT
    { key: 'radio/text/default',      var: '--semantic-radio-text-default' },
    { key: 'radio/text/hover',        var: '--semantic-radio-text-hover' },
    { key: 'radio/text/focus',        var: '--semantic-radio-text-focus' },
    { key: 'radio/text/disabled',     var: '--semantic-radio-text-disabled' },
    { key: 'radio/text/errorMessage', var: '--semantic-radio-text-errorMessage' },
    { key: 'radio/text/error',        var: '--semantic-radio-text-error' },

    // ICON
    { key: 'radio/icon/error', var: '--semantic-radio-icon-error' },
    { key: 'radio/icon/size',  var: '--primitives-sizing-4', source: 'root' },

    // BACKGROUND / INPUT
    { key: 'radio/background/input/default',   var: '--semantic-radio-bg-input-default' },
    { key: 'radio/background/input/hover',     var: '--semantic-radio-bg-input-hover' },
    { key: 'radio/background/input/focus',     var: '--semantic-radio-bg-input-focus' },
    { key: 'radio/background/input/disabled',  var: '--semantic-radio-bg-input-disabled' },
    { key: 'radio/background/input/error',     var: '--semantic-radio-bg-input-error' },

    // BORDER / INPUT
    { key: 'radio/border/input/default',       var: '--semantic-radio-border-input-default' },
    { key: 'radio/border/input/hover',         var: '--semantic-radio-border-input-hover' },
    { key: 'radio/border/input/focusSelected', var: '--semantic-radio-border-input-focusSelected' },
    { key: 'radio/border/input/disabled',      var: '--semantic-radio-border-input-disabled' },
    { key: 'radio/border/input/error',         var: '--semantic-radio-border-input-error' },
    { key: 'radio/border/input/focusActive',   var: '--semantic-radio-border-input-focusActive' },
    { key: 'radio/border/input/focus',         var: '--semantic-radio-border-input-focus' },
    { key: 'radio/border/input/hoverSelected', var: '--semantic-radio-border-input-hoverSelected' },
    { key: 'radio/border/weight',              var: '--primitives-sizing-025', source: 'root' },
    { key: 'radio/border/size',                var: '--primitives-sizing-4',   source: 'root' },

    // FILL / INPUT (dot)
    { key: 'radio/fill/input/default',   var: '--semantic-radio-fill-input-default' },
    { key: 'radio/fill/input/hover',     var: '--semantic-radio-fill-input-hover' },
    { key: 'radio/fill/input/focus',     var: '--semantic-radio-fill-input-focus' },
    { key: 'radio/fill/input/disabled',  var: '--semantic-radio-fill-input-disabled' },
    { key: 'radio/fill/input/error',     var: '--semantic-radio-fill-input-error' },
    { key: 'radio/fill/size',            var: '--primitives-sizing-2', source: 'root' },

    // FONTS
    { key: 'radio/font/weight',                var: '--primitives-anthem-font-weight-medium', source: 'root' },
    { key: 'radio/font/size/label',            var: '--primitives-font-size-base', source: 'root' },
    { key: 'radio/font/size/errorMessage',     var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'radio/font/lineHeight/label',      var: '--primitives-line-height-base', source: 'root' },
    { key: 'radio/font/lineHeight/errorMessage', var: '--primitives-line-height-sm', source: 'root' },

    // PADDING
    { key: 'radio/padding/gap',        var: '--primitives-spacing-2', source: 'root' },
    { key: 'radio/padding/horizontal', var: '--primitives-spacing-1', source: 'root' },
    { key: 'radio/padding/top/input',  var: '--primitives-spacing-1', source: 'root' },
    { key: 'radio/padding/top/errorIcon', var: '0', source: 'literal' },
];

/* Story config */
export default {
    title: 'Components/Radio',
    component: RadioGroup,
    parameters: {

        designToken: { tabs: ["Radio (Anthem)"] },
        controls: { include: ['brand', 'disabled', 'error'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand:   { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        disabled:{ control: 'boolean' },
        error:   { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;
    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;                         // inject one brand into Canvas
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true))); // wait until styles are active
    }, [brand, entry.css]);
    return { ready, canonicalPrefix: entry.prefix };
};

const TokenTable = ({ rootEl, canonicalPrefix, ready }) => {
    const rows = useMemo(() => {
        if (!ready) {
            return ROWS.map(r => ({
                ...r,
                canonicalVar: r.var.startsWith('--semantic-') ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}` : r.var,
                value: '…',
            }));
        }
        const csEl   = rootEl ? getComputedStyle(rootEl) : null;
        const csRoot = getComputedStyle(document.documentElement);

        return ROWS.map(r => {
            const fromRoot = r.source === 'root';
            const value = (fromRoot ? csRoot.getPropertyValue(r.var) : csEl?.getPropertyValue(r.var))?.trim() || 'N/A';
            const canonicalVar = r.var.startsWith('--semantic-') ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}` : r.var;
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
                                        r.value && r.value !== 'N/A' && /^#|rgb|hsl/.test(r.value) ? r.value : 'transparent',
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

    useEffect(() => { if (ready) requestAnimationFrame(() => setRootEl(document.querySelector('.radiogroup'))); },
        [ready, args.brand, args.disabled, args.error]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <RadioGroup
                {...args}
                options={[
                    { value: 'a', label: 'Option A', description: 'First choice' },
                    { value: 'b', label: 'Option B', description: 'Second choice' },
                ]}
            />
            <TokenTable rootEl={rootEl} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    disabled: false,
    error: '',
};