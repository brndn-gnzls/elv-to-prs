/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Toggle } from './Toggle';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/toggle.css?v=tg1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/toggle.css?v=tg1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/toggle.css?v=tg1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping */
const ROWS = [
    // FILL ON
    { key: 'toggle/fill/on/default',  var: '--semantic-toggle-fill-on-default' },
    { key: 'toggle/fill/on/hover',    var: '--semantic-toggle-fill-on-hover' },
    { key: 'toggle/fill/on/focus',    var: '--semantic-toggle-fill-on-focus' },
    { key: 'toggle/fill/on/error',    var: '--semantic-toggle-fill-on-error' },
    { key: 'toggle/fill/on/disabled', var: '--semantic-toggle-fill-on-disabled' },

    // FILL OFF
    { key: 'toggle/fill/off/default',  var: '--semantic-toggle-fill-off-default' },
    { key: 'toggle/fill/off/hover',    var: '--semantic-toggle-fill-off-hover' },
    { key: 'toggle/fill/off/focus',    var: '--semantic-toggle-fill-off-focus' },
    { key: 'toggle/fill/off/error',    var: '--semantic-toggle-fill-off-error' },
    { key: 'toggle/fill/off/disabled', var: '--semantic-toggle-fill-off-disabled' },

    // HANDLE / TEXT / ICON / FOCUS RING
    { key: 'toggle/fill/handle',      var: '--semantic-toggle-fill-handle' },
    { key: 'toggle/text/state/on',    var: '--semantic-toggle-text-state-on' },
    { key: 'toggle/text/state/off',   var: '--semantic-toggle-text-state-off' },
    { key: 'toggle/text/label',       var: '--semantic-toggle-text-label' },
    { key: 'toggle/text/error',       var: '--semantic-toggle-text-error' },
    { key: 'toggle/icon/error',       var: '--semantic-toggle-icon-error' },
    { key: 'toggle/border/focus',     var: '--semantic-toggle-border-focus' },

    // PRIMITIVES (read from :root)
    { key: 'toggle/icon/size/error',             var: '--primitives-sizing-5',                       source: 'root' },
    { key: 'toggle/border/borderRadius',         var: '--primitives-border-radius-rounded-full',     source: 'root' },
    { key: 'toggle/border/spacing/focusActive',  var: '--primitives-spacing-050',                    source: 'root' },
    { key: 'toggle/border/size',                 var: '--primitives-sizing-050',                     source: 'root' },
    { key: 'toggle/font/weight/toggle',          var: '--primitives-anthem-font-weight-semibold',    source: 'root' },
    { key: 'toggle/font/weight/label',           var: '--primitives-anthem-font-weight-medium',      source: 'root' },
    { key: 'toggle/font/weight/error',           var: '--primitives-anthem-font-weight-medium',      source: 'root' },
    { key: 'toggle/font/size/label',             var: '--primitives-font-size-base',                 source: 'root' },
    { key: 'toggle/font/size/toggle',            var: '--primitives-font-size-xs',                   source: 'root' },
    { key: 'toggle/font/size/error',             var: '--primitives-font-size-sm',                   source: 'root' },
    { key: 'toggle/font/lineHeight/toggle',      var: '--primitives-line-height-xs',                 source: 'root' },
    { key: 'toggle/font/lineHeight/label',       var: '--primitives-line-height-base',               source: 'root' },
    { key: 'toggle/font/lineHeight/error',       var: '--primitives-line-height-sm',                 source: 'root' },
    { key: 'toggle/disabled',                    var: '--primitives-opacity-30',                     source: 'root' },
    { key: 'toggle/width/handle',                var: '--primitives-sizing-4',                       source: 'root' },
    { key: 'toggle/height/handle',               var: '--primitives-sizing-4',                       source: 'root' },
    { key: 'toggle/padding/gap',                 var: '--primitives-spacing-2',                      source: 'root' },
    { key: 'toggle/padding/vertical/toggleSwitch',   var: '--primitives-spacing-050',                source: 'root' },
    { key: 'toggle/padding/vertical/toggleOnSwitch', var: '--primitives-spacing-050',                source: 'root' },
    { key: 'toggle/padding/vertical/toggleOffSwitch',var: '--primitives-spacing-050',                source: 'root' },
    { key: 'toggle/padding/vertical/delete',         var: '--primitives-spacing-050',                source: 'root' },
    { key: 'toggle/padding/left/toggleOnSwitch',     var: '--primitives-spacing-150',                source: 'root' },
    { key: 'toggle/padding/left/toggleOffSwitch',    var: '--primitives-spacing-050',                source: 'root' },
    { key: 'toggle/padding/right/toggleOnSwitch',    var: '--primitives-spacing-050',                source: 'root' },
    { key: 'toggle/padding/right/toggleOffSwitch',   var: '--primitives-spacing-150',                source: 'root' },
];

export default {
    title: 'Components/Toggle',
    component: Toggle,
    parameters: {

        designToken: { tabs: ["Toggle (Anthem)"] },
        controls: { include: ['brand', 'checked', 'disabled', 'error', 'label', 'onText', 'offText', 'errorText'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand:   { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        checked: { control: 'boolean' },
        disabled:{ control: 'boolean' },
        error:   { control: 'boolean' },
        label:   { control: 'text' },
        onText:  { control: 'text' },
        offText: { control: 'text' },
        errorText: { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;                                        // inject one brand into the Canvas iframe
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true))); // wait until styles are active :contentReference[oaicite:2]{index=2}
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
                    {rows.map(r => (
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
    const [state, setState] = useState(!!args.checked);

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.toggle'))); },
        [ready, args.brand, args.disabled, args.error, args.label, args.onText, args.offText]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <Toggle
                {...args}
                checked={state}
                onChange={setState}
                errorText={args.error ? (args.errorText || 'There is an error') : ''}
            />
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
    label: 'Enable notifications',
    onText: 'On',
    offText: 'Off',
    errorText: '',
};