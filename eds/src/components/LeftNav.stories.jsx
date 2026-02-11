/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { LeftNav } from './LeftNav';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/leftnav.css?v=ln1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/leftnav.css?v=ln1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/leftnav.css?v=ln1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* Build the full table from your spreadsheet rows */
const ROWS = [
    // TEXT
    { key: 'leftNav/text/internalLink',                    var: '--semantic-ln-text-internalLink' },
    { key: 'leftNav/text/menuItem/inactive',               var: '--semantic-ln-text-menuItem-inactive' },
    { key: 'leftNav/text/menuItem/active',                 var: '--semantic-ln-text-menuItem-active' },
    { key: 'leftNav/text/link/noAccordion',                var: '--semantic-ln-text-link-noAccordion' },
    { key: 'leftNav/text/link/accordion',                  var: '--semantic-ln-text-link-accordion' },
    { key: 'leftNav/text/link/active',                     var: '--semantic-ln-text-link-active' },
    { key: 'leftNav/text/link/expand',                     var: '--semantic-ln-text-link-expand' },
    { key: 'leftNav/text/sectionHeader',                   var: '--semantic-ln-text-sectionHeader' },
    { key: 'leftNav/text/header/title/inactive',           var: '--semantic-ln-text-header-title-inactive' },
    { key: 'leftNav/text/header/title/active',             var: '--semantic-ln-text-header-title-active' },
    { key: 'leftNav/text/header/title/expand',             var: '--semantic-ln-text-header-title-expand' },
    { key: 'leftNav/text/header/description/inactive',     var: '--semantic-ln-text-header-description-inactive' },
    { key: 'leftNav/text/header/description/active',       var: '--semantic-ln-text-header-description-active' },
    { key: 'leftNav/text/header/description/expand',       var: '--semantic-ln-text-header-description-expand' },

    // ICONS
    { key: 'leftNav/icon/internalLink',               var: '--semantic-ln-icon-internalLink' },
    { key: 'leftNav/icon/link/accordion',             var: '--semantic-ln-icon-link-accordion' },
    { key: 'leftNav/icon/link/expand',                var: '--semantic-ln-icon-link-expand' },
    { key: 'leftNav/icon/header/inactive',            var: '--semantic-ln-icon-header-inactive' },
    { key: 'leftNav/icon/header/active',              var: '--semantic-ln-icon-header-active' },
    { key: 'leftNav/icon/header/expand',              var: '--semantic-ln-icon-header-expand' },

    // BACKGROUNDS
    { key: 'leftNav/background/menuItem/active',      var: '--semantic-ln-bg-menuItem-active' },
    { key: 'leftNav/background/link/link',            var: '--semantic-ln-bg-link-link' },
    { key: 'leftNav/background/header/expand',        var: '--semantic-ln-bg-header-expand' },
    { key: 'leftNav/background/header/inactive',      var: '--semantic-ln-bg-header-inactive' },
    { key: 'leftNav/background/header/active',        var: '--semantic-ln-bg-header-active' },
    { key: 'leftNav/background/header/arrow/active',  var: '--semantic-ln-bg-header-arrow-active' },
    { key: 'leftNav/background/header/arrow/expand',  var: '--semantic-ln-bg-header-arrow-expand' },

    // BORDERS
    { key: 'leftNav/border/header/active',            var: '--semantic-ln-border-header-active' },
    { key: 'leftNav/border/header/expand',            var: '--semantic-ln-border-header-expand' },

    // PRIMITIVES (weights, sizes, lineHeights, spacings, widths, radii)
    { key: 'leftNav/border/borderRadius/menuItem/active', var: '--primitives-border-radius-rounded', source: 'root' },

    { key: 'leftNav/font/weight/internalLink',           var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'leftNav/font/weight/menuItem/inactive',      var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'leftNav/font/weight/menuItem/active',        var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'leftNav/font/weight/link/noAccordion',       var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'leftNav/font/weight/link/accordion',         var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'leftNav/font/weight/link/active',            var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'leftNav/font/weight/link/expand',            var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'leftNav/font/weight/header/title/inactive',  var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'leftNav/font/weight/header/title/active',    var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'leftNav/font/weight/header/title/expand',    var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'leftNav/font/weight/header/description/inactive', var: '--primitives-anthem-font-weight-medium', source: 'root' },
    { key: 'leftNav/font/weight/header/description/active',   var: '--primitives-anthem-font-weight-medium', source: 'root' },
    { key: 'leftNav/font/weight/header/description/expand',   var: '--primitives-anthem-font-weight-medium', source: 'root' },

    { key: 'leftNav/font/size/internalLink',                var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'leftNav/font/size/menuItem/inactive',           var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'leftNav/font/size/menuItem/active',             var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'leftNav/font/size/link/noAccordion',            var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'leftNav/font/size/link/accordion',              var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'leftNav/font/size/link/active',                 var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'leftNav/font/size/link/expand',                 var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'leftNav/font/size/header/title/inactive',       var: '--primitives-font-size-base', source: 'root' },
    { key: 'leftNav/font/size/header/title/active',         var: '--primitives-font-size-base', source: 'root' },
    { key: 'leftNav/font/size/header/title/expand',         var: '--primitives-font-size-base', source: 'root' },
    { key: 'leftNav/font/size/header/description/inactive', var: '--primitives-font-size-2xs',  source: 'root' },
    { key: 'leftNav/font/size/header/description/active',   var: '--primitives-font-size-2xs',  source: 'root' },
    { key: 'leftNav/font/size/header/description/expand',   var: '--primitives-font-size-2xs',  source: 'root' },

    { key: 'leftNav/font/lineHeight/internalLink',                var: '--primitives-line-height-sm',  source: 'root' },
    { key: 'leftNav/font/lineHeight/menuItem/inactive',           var: '--primitives-line-height-sm',  source: 'root' },
    { key: 'leftNav/font/lineHeight/menuItem/active',             var: '--primitives-line-height-sm',  source: 'root' },
    { key: 'leftNav/font/lineHeight/link/noAccordion',            var: '--primitives-line-height-sm',  source: 'root' },
    { key: 'leftNav/font/lineHeight/link/accordion',              var: '--primitives-line-height-sm',  source: 'root' },
    { key: 'leftNav/font/lineHeight/link/active',                 var: '--primitives-line-height-sm',  source: 'root' },
    { key: 'leftNav/font/lineHeight/link/expand',                 var: '--primitives-line-height-sm',  source: 'root' },
    { key: 'leftNav/font/lineHeight/header/title/inactive',       var: '--primitives-line-height-base', source: 'root' },
    { key: 'leftNav/font/lineHeight/header/title/active',         var: '--primitives-line-height-base', source: 'root' },
    { key: 'leftNav/font/lineHeight/header/title/expand',         var: '--primitives-line-height-base', source: 'root' },
    { key: 'leftNav/font/lineHeight/header/description/inactive', var: '--primitives-line-height-2xs', source: 'root' },
    { key: 'leftNav/font/lineHeight/header/description/active',   var: '--primitives-line-height-2xs', source: 'root' },
    { key: 'leftNav/font/lineHeight/header/description/expand',   var: '--primitives-line-height-2xs', source: 'root' },

    /* padding (vertical/horizontal/gap/left/right) — using available primitives */
    { key: 'leftNav/padding/vertical/internalLink', var: '--primitives-spacing-250', source: 'root' },
    { key: 'leftNav/padding/vertical/menuItem/inactive', var: '--primitives-spacing-250', source: 'root' },
    { key: 'leftNav/padding/vertical/menuItem/activeHover', var: '--primitives-spacing-250', source: 'root' },
    { key: 'leftNav/padding/vertical/link/noAccordion', var: '--primitives-spacing-250', source: 'root' },
    { key: 'leftNav/padding/vertical/link/accordion', var: '--primitives-spacing-250', source: 'root' },
    { key: 'leftNav/padding/vertical/link/activeHover', var: '--primitives-spacing-250', source: 'root' },
    { key: 'leftNav/padding/vertical/link/expand', var: '--primitives-spacing-250', source: 'root' },

    { key: 'leftNav/padding/gap/internalLink', var: '--primitives-spacing-2', source: 'root' },
    { key: 'leftNav/padding/gap/link/accordion', var: '--primitives-spacing-2', source: 'root' },
    { key: 'leftNav/padding/gap/link/expand', var: '--primitives-spacing-2', source: 'root' },
];

/* Story config */
export default {
    title: 'Components/LeftNav',
    component: LeftNav,
    parameters: {

        designToken: { tabs: ["LeftNav (Anthem)"] },
        controls: { include: ['brand'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: { brand: { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] } },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;
    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css; /* inject one brand into Canvas */
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
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
        const csEl = rootEl ? getComputedStyle(rootEl) : null;
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
    const [rootEl, setRootEl] = useState(null);

    useEffect(() => { if (ready) requestAnimationFrame(() => setRootEl(document.querySelector('.leftnav'))); },
        [ready, args.brand]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, display: 'flex', gap: 24, width: '100%' }}>
            <LeftNav {...args} />
            <TokenTable rootEl={rootEl} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
};