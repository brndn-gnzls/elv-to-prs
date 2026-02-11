/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { TextField } from './TextField';

/* Inject one brand CSS at a time into the Canvas (cache-busted) */
import anthemTokens from '!!raw-loader!../design-tokens/anthem/textfield.css?v=tf1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/textfield.css?v=tf1';
import wellpointTokens from '!!raw-loader!../design-tokens/wellpoint/textfield.css?v=tf1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
};

/* Full table rows (every spreadsheet mapping) */
const ROWS = [
    // ICONS
    { key: 'textField/icon/white',    var: '--semantic-icon-white' },
    { key: 'textField/icon/base',     var: '--semantic-icon-base' },
    { key: 'textField/icon/primary',  var: '--semantic-icon-primary' },
    { key: 'textField/icon/critical', var: '--semantic-icon-critical' },
    { key: 'textField/icon/urgent',   var: '--semantic-icon-urgent' },
    { key: 'textField/icon/positive', var: '--semantic-icon-positive' },
    { key: 'textField/icon/info',     var: '--semantic-icon-info' },
    { key: 'textField/icon/subdued',  var: '--semantic-icon-subdued' },
    { key: 'textField/icon/active',   var: '--semantic-icon-active' },
    { key: 'textField/icon/size/default', var: '--primitives-sizing-5', source: 'root' },
    { key: 'textField/icon/size/guidance', var: '--primitives-sizing-2', source: 'root' },

    // BORDERS
    { key: 'textField/border/urgent',   var: '--semantic-border-urgent' },
    { key: 'textField/border/base',     var: '--semantic-border-base' },
    { key: 'textField/border/active',   var: '--semantic-border-active' },   // primary
    { key: 'textField/border/critical', var: '--semantic-border-critical' },
    { key: 'textField/border/positive', var: '--semantic-border-positive' },
    { key: 'textField/border/size',     var: '--primitives-sizing-025', source: 'root' },
    { key: 'textField/border/weight',   var: '--primitives-sizing-050', source: 'root' },

    // TEXT
    { key: 'textField/text/label',        var: '--semantic-text-label' },
    { key: 'textField/text/placeholder',  var: '--semantic-text-placeholder' },
    { key: 'textField/text/input',        var: '--semantic-text-input' },
    { key: 'textField/text/critical',     var: '--semantic-text-critical' },
    { key: 'textField/text/urgent',       var: '--semantic-text-urgent' },
    { key: 'textField/text/positive',     var: '--semantic-text-positive' },
    { key: 'textField/text/info',         var: '--semantic-text-info' },
    { key: 'textField/text/help',         var: '--semantic-text-help' },
    { key: 'textField/text/guidance',     var: '--semantic-text-guidance' },
    { key: 'textField/text/help2',        var: '--semantic-text-help2' },

    // BACKGROUND
    { key: 'textField/background/default', var: '--semantic-surface-background' },

    // FONTS (primitives)
    { key: 'textField/font/weight/label',  var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'textField/font/weight/input',  var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'textField/font/size/label',    var: '--primitives-font-size-base', source: 'root' },
    { key: 'textField/font/size/input',    var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'textField/font/size/optional', var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'textField/font/size/characterCount', var: '--primitives-font-size-sm', source: 'root' },
    { key: 'textField/font/size/validations',    var: '--primitives-font-size-sm', source: 'root' },
    { key: 'textField/font/lineHeight/label',    var: '--primitives-line-height-base', source: 'root' },
    { key: 'textField/font/lineHeight/input',    var: '--primitives-line-height-sm',   source: 'root' },

    // BORDER RADIUS / HEIGHTS
    { key: 'textField/borderRadius',     var: '0', source: 'literal' },
    { key: 'textField/height/input',     var: '--primitives-sizing-11', source: 'root' },
    { key: 'textField/height/singleLine',var: '--primitives-sizing-11', source: 'root' },
    { key: 'textField/height/multiLine', var: '0', source: 'literal' },

    // DISABLED
    { key: 'textField/disabled', var: '--primitives-opacity-30', source: 'root' },

    // PADDING / GAPS
    { key: 'textField/padding/horizontal/input', var: '--primitives-spacing-3',   source: 'root' },
    { key: 'textField/padding/vertical/input',   var: '--primitives-spacing-250', source: 'root' },
    { key: 'textField/padding/gap/labelOptional',var: '--primitives-spacing-2',   source: 'root' },
    { key: 'textField/padding/gap/iconText',     var: '--primitives-spacing-1',   source: 'root' },
    { key: 'textField/padding/gap/inputPassword',var: '--primitives-spacing-6',   source: 'root' },
    { key: 'textField/padding/gap/textIcon',     var: '--primitives-spacing-1',   source: 'root' },
    { key: 'textField/padding/gap/validationList',var: '--primitives-spacing-2',  source: 'root' },
    { key: 'textField/padding/gap/inputIcon',     var: '--primitives-spacing-2',  source: 'root' },
    { key: 'textField/padding/top/characterCount',var: '--primitives-spacing-050',source: 'root' },
    { key: 'textField/padding/top/input',         var: '--primitives-spacing-025',source: 'root' },
    { key: 'textField/padding/top/inputLabel',    var: '--primitives-spacing-025',source: 'root' },
    { key: 'textField/padding/top/multilineIcon', var: '--primitives-spacing-050',source: 'root' },
    { key: 'textField/padding/bottom/inputLabel', var: '--primitives-spacing-025',source: 'root' },

    // WIDTHS
    { key: 'textField/width/minWidth', var: '--primitives-text-field-width-min', source: 'root' },
    { key: 'textField/width/maxWidth', var: '--primitives-text-field-width-max', source: 'root' },
];

export default {
    title: 'Components/TextField',
    component: TextField,
    parameters: {

        designToken: { tabs: ["TextField (Anthem)"] },
        controls: { include: ['brand', 'status', 'disabled', 'label', 'optionalText', 'placeholder'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand:  { control: 'select', options: ['anthem', 'wellpoint', 'healthyblue'] },
        status: { control: 'select', options: ['base', 'active', 'critical', 'urgent', 'positive', 'info'] },
        disabled: { control: 'boolean' },
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
        if (!tag) {
            tag = document.createElement('style');
            tag.id = 'dynamic-brand-styles';
            document.head.appendChild(tag);
        }
        tag.textContent = entry.css;

        // Ensure styles are active before reading computed values
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
                            <div
                                style={{
                                    width: 24, height: 24, border: '1px solid #ccc',
                                    background:
                                        r.value && r.value !== 'N/A' && r.value !== '…' && /^#|rgb|hsl/.test(r.value)
                                            ? r.value
                                            : 'transparent',
                                }}
                            />
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
        requestAnimationFrame(() => {
            setEl(document.querySelector('.textfield'));
        });
    }, [ready, args.brand, args.status, args.disabled, args.label, args.placeholder]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20 }}>
            <TextField {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    status: 'base',
    disabled: false,
    label: 'Label',
    placeholder: 'Enter text…',
};