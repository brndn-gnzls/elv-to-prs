/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Tabs } from './Tabs';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/tabs.css?v=tb1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/tabs.css?v=tb1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/tabs.css?v=tb1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* Full table from your spreadsheet (semantic aliases or primitives) */
const ROWS = [
    // text/minimal
    { key: 'tab/text/minimal/inactive',      var: '--semantic-tab-text-minimal-inactive' },
    { key: 'tab/text/minimal/active',        var: '--semantic-tab-text-minimal-active' },
    { key: 'tab/text/minimal/hover',         var: '--semantic-tab-text-minimal-hover' },
    { key: 'tab/text/minimal/disabled',      var: '--semantic-tab-text-minimal-disabled' },
    { key: 'tab/text/minimal/focusActive',   var: '--semantic-tab-text-minimal-focusActive' },
    { key: 'tab/text/minimal/focusInactive', var: '--semantic-tab-text-minimal-focusInactive' },
    { key: 'tab/text/minimal/press',         var: '--semantic-tab-text-minimal-press' },

    // text/text
    { key: 'tab/text/text/active',        var: '--semantic-tab-text-text-active' },
    { key: 'tab/text/text/inactive',      var: '--semantic-tab-text-text-inactive' },
    { key: 'tab/text/text/hover',         var: '--semantic-tab-text-text-hover' },
    { key: 'tab/text/text/focusActive',   var: '--semantic-tab-text-text-focusActive' },
    { key: 'tab/text/text/focusInactive', var: '--semantic-tab-text-text-focusInactive' },
    { key: 'tab/text/text/press',         var: '--semantic-tab-text-text-press' },

    // icon/minimal + size
    { key: 'tab/icon/minimal/active',        var: '--semantic-tab-icon-minimal-active' },
    { key: 'tab/icon/minimal/inactive',      var: '--semantic-tab-icon-minimal-inactive' },
    { key: 'tab/icon/minimal/hover',         var: '--semantic-tab-icon-minimal-hover' },
    { key: 'tab/icon/minimal/activeFocus',   var: '--semantic-tab-icon-minimal-activeFocus' },
    { key: 'tab/icon/minimal/inactiveFocus', var: '--semantic-tab-icon-minimal-inactiveFocus' },
    { key: 'tab/icon/minimal/press',         var: '--semantic-tab-icon-minimal-press' },
    { key: 'tab/icon/minimal/size',          var: '--primitives-sizing-4', source: 'root' },

    // border/minimal
    { key: 'tab/border/minimal/active',    var: '--semantic-tab-border-minimal-active' },
    { key: 'tab/border/minimal/inactive',  var: '--semantic-tab-border-minimal-inactive' },
    { key: 'tab/border/minimal/hover',     var: '--semantic-tab-border-minimal-hover' },
    { key: 'tab/border/minimal/focus',     var: '--semantic-tab-border-minimal-focus' },
    { key: 'tab/border/minimal/press',     var: '--semantic-tab-border-minimal-press' },

    // border/pointer
    { key: 'tab/border/pointer/inactive',  var: '--semantic-tab-border-pointer-inactive' },
    { key: 'tab/border/pointer/focus',     var: '--semantic-tab-border-pointer-focus' },
    { key: 'tab/border/pointer/gap/focus', var: '--semantic-tab-border-pointer-gap-focus' },
    { key: 'tab/border/pointer/spread/focus', var: '--primitives-sizing-050', source: 'root' },

    // border sizes
    { key: 'tab/border/size/minimal/active',   var: '--primitives-sizing-025', source: 'root' },
    { key: 'tab/border/size/minimal/inactive', var: '--primitives-sizing-050', source: 'root' },
    { key: 'tab/border/size/pointer/inactive', var: '--primitives-sizing-025', source: 'root' },
    { key: 'tab/border/size/pointer/focus',    var: '--primitives-sizing-050', source: 'root' },

    // backgrounds/pointer
    { key: 'tab/background/pointer/arrow/active',      var: '--semantic-tab-bg-pointer-arrow-active' },
    { key: 'tab/background/pointer/arrow/focus',       var: '--semantic-tab-bg-pointer-arrow-focus' },
    { key: 'tab/background/pointer/active',            var: '--semantic-tab-bg-pointer-active' },
    { key: 'tab/background/pointer/inactive',          var: '--semantic-tab-bg-pointer-inactive' },
    { key: 'tab/background/pointer/hover',             var: '--semantic-tab-bg-pointer-hover' },
    { key: 'tab/background/pointer/activeFocus',       var: '--semantic-tab-bg-pointer-activeFocus' },
    { key: 'tab/background/pointer/inactiveFocus',     var: '--semantic-tab-bg-pointer-inactiveFocus' },
    { key: 'tab/background/pointer/focusContainer',    var: '--semantic-tab-bg-pointer-focusContainer' },
    { key: 'tab/background/pointer/press',             var: '--semantic-tab-bg-pointer-press' },

    // fonts (weights/sizes/line-heights)
    { key: 'tab/font/weight/minimal/labelActive',   var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'tab/font/weight/minimal/labelInactive', var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'tab/font/weight/pointer/labelSemibold', var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'tab/font/weight/pointer/labelMedium',   var: '--primitives-anthem-font-weight-medium',   source: 'root' },

    { key: 'tab/font/size/minimal/label',           var: '--primitives-font-size-base', source: 'root' },
    { key: 'tab/font/size/pointer/labelPointerThick', var: '--primitives-font-size-base', source: 'root' },
    { key: 'tab/font/size/pointer/labelPointerThin',  var: '--primitives-font-size-sm',   source: 'root' },

    { key: 'tab/font/lineHeight/minimal/label',        var: '--primitives-line-height-base', source: 'root' },
    { key: 'tab/font/lineHeight/pointer/labelPointerThick', var: '--primitives-line-height-base', source: 'root' },
    { key: 'tab/font/lineHeight/pointer/labelPointerThin',  var: '--primitives-line-height-sm',   source: 'root' },

    // disabled
    { key: 'tab/disabled', var: '--primitives-opacity-30', source: 'root' },

    // paddings & dimensions (container/tabGroup/tabItem etc.)
    { key: 'tab/padding/horizontal/minimal/container', var: '--primitives-spacing-6', source: 'root' },
    { key: 'tab/padding/horizontal/minimal/tabItem',   var: '--primitives-spacing-0', source: 'root' },
    { key: 'tab/padding/horizontal/minimal/tabGroup',  var: '--primitives-spacing-0', source: 'root' },

    { key: 'tab/padding/horizontal/pointer/container', var: '--primitives-spacing-6', source: 'root' },
    { key: 'tab/padding/horizontal/pointer/tabItemFocus', var: '--primitives-spacing-1', source: 'root' },

    { key: 'tab/padding/vertical/minimal/container', var: '--primitives-spacing-2', source: 'root' },
    { key: 'tab/padding/vertical/minimal/tabItem',   var: '--primitives-spacing-0', source: 'root' },
    { key: 'tab/padding/vertical/minimal/tabGroup',  var: '--primitives-spacing-0', source: 'root' },

    { key: 'tab/padding/vertical/pointer/containerThick', var: '--primitives-spacing-3', source: 'root' },
    { key: 'tab/padding/vertical/pointer/containerThin',  var: '--primitives-spacing-1', source: 'root' },

    { key: 'tab/padding/gap/minimal/container', var: '--primitives-spacing-2', source: 'root' },
    { key: 'tab/padding/gap/minimal/tabItem',   var: '--primitives-spacing-0', source: 'root' },
    { key: 'tab/padding/gap/minimal/tabGroup',  var: '--primitives-spacing-1', source: 'root' },

    { key: 'tab/padding/bottom/pointer/tabItem', var: '--primitives-spacing-4', source: 'root' },

    { key: 'tab/width/pointer/arrow',  var: '--primitives-sizing-8',  source: 'root' },
    { key: 'tab/height/pointer/arrow', var: '--primitives-sizing-4',  source: 'root' },
    { key: 'tab/height/pointer/thick/minHeight', var: '--primitives-sizing-16', source: 'root' },
    { key: 'tab/height/pointer/thin/minHeight',  var: '--primitives-sizing-12', source: 'root' },
    { key: 'tab/height/pointer/thin/maxHeight',  var: '--primitives-sizing-12', source: 'root' },
];

/* Story config */
export default {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {

        designToken: { tabs: ["Tabs (Anthem)"] },
        controls: { include: ['brand', 'variant', 'disabled'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand:   { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        variant: { control: 'select', options: ['minimal', 'pointer'] },
        disabled:{ control: 'boolean' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css;                       // inject one brand into Canvas
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
                    {rows.map(r => (
                        <tr key={r.key}>
                            <td style={{ padding: 8 }}>{r.key}</td>
                            <td style={{ padding: 8 }}><code>{r.var}</code></td>
                            <td style={{ padding: 8 }}><code>{r.canonicalVar}</code></td>
                            <td style={{ padding: 8 }}>{r.value}</td>
                            <td style={{ padding: 8 }}>
                                <div style={{
                                    width: 24, height: 24, border: '1px solid #ccc',
                                    background: r.value && r.value !== 'N/A' && r.value !== '…' && /^#|rgb|hsl/.test(r.value)
                                        ? r.value : 'transparent',
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

    useEffect(() => { if (ready) requestAnimationFrame(() => setRootEl(document.querySelector('.tabs'))); },
        [ready, args.brand, args.variant, args.disabled]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <Tabs {...args} />
            <TokenTable rootEl={rootEl} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    variant: 'minimal',
    disabled: false,
};