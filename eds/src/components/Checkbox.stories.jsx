/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox } from './Checkbox';

/* inject one brand stylesheet into the Canvas (cache-busted) */
import anthemTokens from '!!raw-loader!../design-tokens/anthem/checkbox.css?v=cb1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/checkbox.css?v=cb1';
import wellpointTokens from '!!raw-loader!../design-tokens/wellpoint/checkbox.css?v=cb1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
};

/* Full table per spreadsheet (alias or primitive var used) */
const ROWS = [
    // TEXT
    { key: 'checkbox/text/default',        var: '--semantic-text-default' },
    { key: 'checkbox/text/errorMessage',   var: '--semantic-text-errorMessage' },
    { key: 'checkbox/text/hover',          var: '--semantic-text-hover' },
    { key: 'checkbox/text/focus',          var: '--semantic-text-focus' },
    { key: 'checkbox/text/disabled',       var: '--semantic-text-disabled' },
    { key: 'checkbox/text/error',          var: '--semantic-text-error' },

    // BACKGROUND (CHECKED)
    { key: 'checkbox/background/checked/input/default',  var: '--semantic-bg-checked-default' },
    { key: 'checkbox/background/checked/input/hover',    var: '--semantic-bg-checked-hover' },
    { key: 'checkbox/background/checked/input/focus',    var: '--semantic-bg-checked-focus' },
    { key: 'checkbox/background/checked/input/disabled', var: '--semantic-bg-checked-disabled' },
    { key: 'checkbox/background/checked/input/error',    var: '--semantic-bg-checked-error' },

    // BACKGROUND (UNCHECKED)
    { key: 'checkbox/background/unchecked/input/default',  var: '--semantic-bg-unchecked-default' },
    { key: 'checkbox/background/unchecked/input/hover',    var: '--semantic-bg-unchecked-hover' },
    { key: 'checkbox/background/unchecked/input/focus',    var: '--semantic-bg-unchecked-focus' },
    { key: 'checkbox/background/unchecked/input/disabled', var: '--semantic-bg-unchecked-disabled' },
    { key: 'checkbox/background/unchecked/input/error',    var: '--semantic-bg-unchecked-error' },

    // BORDERS
    { key: 'checkbox/border/checked/input/focus',         var: '--semantic-border-checked-focus' },
    { key: 'checkbox/border/unchecked/default',           var: '--semantic-border-unchecked-default' },
    { key: 'checkbox/border/unchecked/hover',             var: '--semantic-border-unchecked-hover' },
    { key: 'checkbox/border/unchecked/focus',             var: '--semantic-border-unchecked-focus' },
    { key: 'checkbox/border/unchecked/disabled',          var: '--semantic-border-unchecked-disabled' },
    { key: 'checkbox/border/unchecked/error',             var: '--semantic-border-unchecked-error' },
    { key: 'checkbox/border/unchecked/focusActive',       var: '--semantic-border-unchecked-focusActive' },

    // ICONS
    { key: 'checkbox/icon/default',      var: '--semantic-icon-default' },
    { key: 'checkbox/icon/error',        var: '--semantic-icon-error' },
    { key: 'checkbox/icon/size/check',   var: '--primitives-sizing-3', source: 'root' },
    { key: 'checkbox/icon/size/error',   var: '--primitives-sizing-4', source: 'root' },

    // TYPOGRAPHY
    { key: 'checkbox/font/weight',             var: '--primitives-anthem-font-weight-medium', source: 'root' },
    { key: 'checkbox/font/size/label',         var: '--primitives-font-size-base', source: 'root' },
    { key: 'checkbox/font/size/errorMessage',  var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'checkbox/font/lineHeight/label',   var: '--primitives-line-height-base', source: 'root' },
    { key: 'checkbox/font/lineHeight/errorMessage', var: '--primitives-line-height-sm', source: 'root' },

    // DISABLED
    { key: 'checkbox/disabled', var: '--primitives-opacity-30', source: 'root' },

    // SPACING / SIZES
    { key: 'checkbox/padding/gap',        var: '--primitives-spacing-2', source: 'root' },
    { key: 'checkbox/padding/horizontal', var: '--primitives-spacing-1', source: 'root' },
    { key: 'checkbox/padding/top/input',  var: '0', source: 'literal' },
    { key: 'checkbox/padding/top/errorIcon', var: '0', source: 'literal' },

    // Border size (edge) already represented by box width/height = sizing/4; border width uses sizing/025 in CSS.
    { key: 'checkbox/border/size', var: '--primitives-sizing-4', source: 'root' },
];

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        controls: { include: ['brand', 'checked', 'disabled', 'error', 'focusActive', 'label', 'errorMessage'] },
        actions: { disable: true },
        a11y: { disable: true },
        docs: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'wellpoint', 'healthyblue'] },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        focusActive: { control: 'boolean' },
        label: { control: 'text' },
        errorMessage: { control: 'text' },
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
        tag.textContent = entry.css;
        // ensure stylesheet is active before reads
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
        const csEl = el ? getComputedStyle(el) : null;
        const csRoot = getComputedStyle(document.documentElement);

        return ROWS.map(r => {
            const fromRoot = r.source === 'root';
            const literal  = r.source === 'literal';
            const value = literal
                ? r.var
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
                {rows.map((r) => (
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

    useEffect(() => {
        if (!ready) return;
        requestAnimationFrame(() => setEl(document.querySelector('.checkbox')));
    }, [ready, args.brand, args.checked, args.disabled, args.error, args.focusActive, args.label, args.errorMessage]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20 }}>
            <Checkbox {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    checked: false,
    disabled: false,
    error: false,
    focusActive: false,
    label: 'Receive updates',
    errorMessage: 'This field is required.',
};