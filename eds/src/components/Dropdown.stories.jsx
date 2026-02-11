/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown } from './Dropdown';

/* EXACT same pattern as Alert: import brand/* files */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/dropdown.css?v=dd5';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/dropdown.css?v=dd5';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/dropdown.css?v=dd5';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (aliases/primitives) */
const ROWS = [
    { key: 'dropdown/background/input/default',    var: '--semantic-dd-bg-input' },
    { key: 'dropdown/background/menuItem/hover',   var: '--semantic-dd-bg-item-hover' },
    { key: 'dropdown/background/menuItem/default', var: '--semantic-dd-bg-item' },

    { key: 'dropdown/border/default', var: '--semantic-dd-border-default' },
    { key: 'dropdown/border/focus',   var: '--semantic-dd-border-focus' },
    { key: 'dropdown/border/error',   var: '--semantic-dd-border-error' },
    { key: 'dropdown/border/active',  var: '--semantic-dd-border-active' },
    { key: 'dropdown/border/size/menuItem',   var: '--primitives-sizing-025', source: 'root' },
    { key: 'dropdown/border/size/menuItemTop',var: '--primitives-sizing-0',   source: 'root' },
    { key: 'dropdown/border/size/input',      var: '--primitives-sizing-025', source: 'root' },

    { key: 'dropdown/text/input',              var: '--semantic-dd-text-input' },
    { key: 'dropdown/text/menuItem/default',   var: '--semantic-dd-text-item' },
    { key: 'dropdown/text/menuItem/hover',     var: '--semantic-dd-text-item-hover' },
    { key: 'dropdown/text/label',              var: '--semantic-dd-text-label' },
    { key: 'dropdown/text/optional',           var: '--semantic-dd-text-optional' },
    { key: 'dropdown/text/placeholder',        var: '--semantic-dd-text-placeholder' },

    { key: 'dropdown/icon/default',       var: '--semantic-dd-icon-default' },
    { key: 'dropdown/icon/error',         var: '--semantic-dd-icon-error' },
    { key: 'dropdown/icon/tooltip',       var: '--semantic-dd-icon-tooltip' },
    { key: 'dropdown/icon/size/default',  var: '--primitives-sizing-4', source: 'root' },
    { key: 'dropdown/icon/size/tooltip',  var: '--primitives-sizing-5', source: 'root' },

    { key: 'dropdown/font/weight/input',           var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'dropdown/font/weight/menuItem',        var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'dropdown/font/weight/label',           var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'dropdown/font/weight/error',           var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'dropdown/font/weight/menuItem active', var: '--primitives-anthem-font-weight-semibold', source: 'root' },

    { key: 'dropdown/font/lineHeight/input',   var: '--primitives-line-height-sm',   source: 'root' },
    { key: 'dropdown/font/lineHeight/option',  var: '--primitives-line-height-sm',   source: 'root' },
    { key: 'dropdown/font/lineHeight/label',   var: '--primitives-line-height-base', source: 'root' },
    { key: 'dropdown/font/lineHeight/error',   var: '--primitives-line-height-sm',   source: 'root' },
    { key: 'dropdown/font/lineHeight/optional',var: '--primitives-line-height-sm',   source: 'root' },

    { key: 'dropdown/font/size/menuItem', var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'dropdown/font/size/label',    var: '--primitives-font-size-base', source: 'root' },
    { key: 'dropdown/font/size/error',    var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'dropdown/font/size/input',    var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'dropdown/font/size/optional', var: '--primitives-font-size-sm',   source: 'root' },

    { key: 'dropdown/borderRadius', var: '0',                       source: 'literal' },
    { key: 'dropdown/disabled',     var: '--primitives-opacity-30', source: 'root' },

    { key: 'dropdown/padding/gap/vertical',      var: '--primitives-spacing-1',   source: 'root' },
    { key: 'dropdown/padding/gap/labelOptional', var: '--primitives-spacing-2',   source: 'root' },
    { key: 'dropdown/padding/gap/iconText',      var: '--primitives-spacing-1',   source: 'root' },
    { key: 'dropdown/padding/gap/textInput',     var: '--primitives-spacing-050', source: 'root' },

    { key: 'dropdown/padding/menuItem/horizontal', var: '--primitives-spacing-3',   source: 'root' },
    { key: 'dropdown/padding/menuItem/vertical',   var: '--primitives-spacing-250', source: 'root' },
    { key: 'dropdown/padding/menuItem/container',  var: '--primitives-spacing-0',   source: 'root' },

    { key: 'dropdown/padding/input/vertical',   var: '--primitives-spacing-250', source: 'root' },
    { key: 'dropdown/padding/input/horizontal', var: '--primitives-spacing-3',   source: 'root' },
    { key: 'dropdown/padding/input/textPadding',var: '--primitives-spacing-025', source: 'root' },

    { key: 'dropdown/padding/label/padding',    var: '--primitives-spacing-0',   source: 'root' },
];

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {

        designToken: { tabs: ["Dropdown (Anthem)"] },
        controls: { include: ['brand', 'disabled', 'error', 'label', 'optionalText', 'placeholder'] },
        actions: { disable: true },
        a11y: { disable: true },
        docs: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        label: { control: 'text' },
        optionalText: { control: 'text' },
        placeholder: { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;                                  // Inject exactly one brand file
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true))); // Wait until active (Canvas) :contentReference[oaicite:3]{index=3}
    }, [brand, entry.css]);

    return { ready, canonicalPrefix: entry.prefix };
};

const TokenTable = ({ el, canonicalPrefix, ready }) => {
    const rows = useMemo(() => {
        if (!ready) {
            return ROWS.map(r => ({
                ...r,
                canonicalVar: r.var.startsWith('--semantic-') ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}` : r.var,
                value: '…',
            }));
        }
        const csEl = el ? getComputedStyle(el) : null;
        const csRoot = getComputedStyle(document.documentElement);

        return ROWS.map(r => {
            const value = (r.source === 'root'
                ? csRoot.getPropertyValue(r.var)
                : csEl?.getPropertyValue(r.var))?.trim() || 'N/A';
            const canonicalVar = r.var.startsWith('--semantic-') ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}` : r.var;
            return { ...r, canonicalVar, value };
        });
    }, [el, ready, canonicalPrefix]);

    return (
        <div style={{ marginTop: 24 }}>
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
                    {rows.map(r => (
                        <tr key={r.key}>
                            <td style={{ padding: 8 }}>{r.key}</td>
                            <td style={{ padding: 8 }}><code>{r.var}</code></td>
                            <td style={{ padding: 8 }}><code>{r.canonicalVar}</code></td>
                            <td style={{ padding: 8 }}>{r.value}</td>
                            <td style={{ padding: 8 }}>
                                <div style={{ width: 24, height: 24, border: '1px solid #ccc',
                                    background: r.value && r.value !== 'N/A' && r.value !== '…' && /^#|rgb|hsl/.test(r.value) ? r.value : 'transparent' }}/>
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
    const [value, setValue] = useState(null);

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.dropdown'))); },
        [ready, args.brand, args.disabled, args.error, args.label, args.optionalText, args.placeholder, value]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <Dropdown
                {...args}
                value={value}
                onSelect={setValue}
                items={[ { value: 'one', label: 'First option' }, { value: 'two', label: 'Second option' }, { value: 'three', label: 'Third option' } ]}
            />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    disabled: false,
    error: false,
    label: 'Choose an option',
    optionalText: 'Optional',
    placeholder: 'Select…',
};