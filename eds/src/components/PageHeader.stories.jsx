/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader } from './PageHeader';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/pageheader.css?v=ph1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/pageheader.css?v=ph1';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/pageheader.css?v=ph1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (semantic aliases or primitives/brand slots) */
const ROWS = [
    // Fills (semantic)
    { key: 'pageHeader/fill/standard/linkWindow', var: '--semantic-ph-fill-standard-linkWindow' },
    { key: 'pageHeader/fill/standard/memberTab',  var: '--semantic-ph-fill-standard-memberTab' },

    // A gradients (primitives)
    { key: 'pageHeader/background/headerBackgroundA/gradient/1/100', var: '--primitives-page-header-background-a-gradient-1-100', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/1/200', var: '--primitives-page-header-background-a-gradient-1-200', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/1/300', var: '--primitives-page-header-background-a-gradient-1-300', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/2/100', var: '--primitives-page-header-background-a-gradient-2-100', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/2/200', var: '--primitives-page-header-background-a-gradient-2-200', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/3/100', var: '--primitives-page-header-background-a-gradient-3-100', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/3/200', var: '--primitives-page-header-background-a-gradient-3-200', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/3/300', var: '--primitives-page-header-background-a-gradient-3-300', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/4/100', var: '--primitives-page-header-background-a-gradient-4-100', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/gradient/4/200', var: '--primitives-page-header-background-a-gradient-4-200', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundA/fill',           var: '--semantic-ph-bgA-fill' },

    // B fill + gradients (brand-specific primitive paths; we expose “anthem” primitives as your tokens do)
    { key: 'pageHeader/background/headerBackgroundB/fill',           var: '--semantic-ph-bgB-fill' },
    { key: 'pageHeader/background/headerBackgroundB/gradient/1/100', var: '--primitives-page-header-background-b-anthem-gradient-1-100', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundB/gradient/1/200', var: '--primitives-page-header-background-b-anthem-gradient-1-200', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundB/gradient/2/100', var: '--primitives-page-header-background-b-anthem-gradient-2-100', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundB/gradient/2/200', var: '--primitives-page-header-background-b-anthem-gradient-2-200', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundB/gradient/3/100', var: '--primitives-page-header-background-b-anthem-gradient-3-100', source: 'root' },
    { key: 'pageHeader/background/headerBackgroundB/gradient/3/200', var: '--primitives-page-header-background-b-anthem-gradient-3-200', source: 'root' },

    // Borders (semantic) + sizes/radii (primitives)
    { key: 'pageHeader/border/searchBeta',        var: '--semantic-ph-border-searchBeta' },
    { key: 'pageHeader/border/standardSearch',    var: '--semantic-ph-border-standardSearch' },
    { key: 'pageHeader/border/members/memberTab', var: '--semantic-ph-border-members-memberTab' },
    { key: 'pageHeader/border/size/searchBeta',   var: '--primitives-sizing-025', source: 'root' },
    { key: 'pageHeader/border/size/standardSearch', var: '--primitives-sizing-025', source: 'root' },
    { key: 'pageHeader/border/size/standard',     var: '--primitives-sizing-025', source: 'root' },
    { key: 'pageHeader/border/borderRadius/search',    var: '--primitives-sizing-0',  source: 'root' },
    { key: 'pageHeader/border/borderRadius/memberTab', var: '--primitives-sizing-0',  source: 'root' },

    // Text (semantic) + fonts (primitives)
    { key: 'pageHeader/text/welcomeDashboard',                var: '--semantic-ph-text-welcomeDashboard' },
    { key: 'pageHeader/text/standard/memberActive',           var: '--semantic-ph-text-standard-memberActive' },
    { key: 'pageHeader/text/standard/memberInactive',         var: '--semantic-ph-text-standard-memberInactive' },
    { key: 'pageHeader/font/weight/welcomeDashboard/memberName', var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'pageHeader/font/weight/standard/memberTab',       var: '--primitives-anthem-font-weight-semibold',   source: 'root' },
    { key: 'pageHeader/font/size/welcomeDashboard/memberName', var: '--primitives-font-size-6xl', source: 'root' },
    { key: 'pageHeader/font/size/standard/memberTab',         var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'pageHeader/font/lineHeight/welcomeDashboard/memberName', var: '--primitives-line-height-6xl', source: 'root' },
    { key: 'pageHeader/font/lineHeight/standard/memberTab',   var: '--primitives-line-height-sm', source: 'root' },

    // Paddings/Gaps (primitives)
    { key: 'pageHeader/padding/horizontal/standard/container', var: '--primitives-spacing-36', source: 'root' },
    { key: 'pageHeader/padding/horizontal/standard/linkWindow', var: '--primitives-spacing-36', source: 'root' },
    { key: 'pageHeader/padding/horizontal/standard/memberTab',  var: '--primitives-spacing-250', source: 'root' },
    { key: 'pageHeader/padding/horizontal/search',             var: '--primitives-spacing-36', source: 'root' },
    { key: 'pageHeader/padding/horizontal/welcomeDashboard/header', var: '--primitives-spacing-36', source: 'root' },
    { key: 'pageHeader/padding/horizontal/searchBeta',         var: '--primitives-spacing-36', source: 'root' },

    { key: 'pageHeader/padding/vertical/standard/container',   var: '--primitives-spacing-6',  source: 'root' },
    { key: 'pageHeader/padding/vertical/standard/linkWindow',  var: '--primitives-spacing-4',  source: 'root' },
    { key: 'pageHeader/padding/vertical/standard/memberTab',   var: '--primitives-spacing-1',  source: 'root' },
    { key: 'pageHeader/padding/vertical/search',               var: '--primitives-spacing-4',  source: 'root' },
    { key: 'pageHeader/padding/vertical/searchBeta',           var: '--primitives-spacing-4',  source: 'root' },

    { key: 'pageHeader/padding/top/welcomeDashboard/header',   var: '--primitives-spacing-20', source: 'root' },
    { key: 'pageHeader/padding/gap/welcomeDashboard/text',     var: '--primitives-spacing-150', source: 'root' },
    { key: 'pageHeader/padding/gap/container',                 var: '--primitives-spacing-4',  source: 'root' },
    { key: 'pageHeader/padding/gap/memberSelection',           var: '--primitives-spacing-2',  source: 'root' },
    { key: 'pageHeader/padding/gap/headerText',                var: '--primitives-spacing-2',  source: 'root' },
    { key: 'pageHeader/padding/gap/memberContainer',           var: '--primitives-spacing-4',  source: 'root' },
    { key: 'pageHeader/padding/bottom/welcomeDashboard/header',var: '--primitives-spacing-44', source: 'root' },
];

/* Story config */
export default {
    title: 'Components/PageHeader',
    component: PageHeader,
    parameters: {

        designToken: { tabs: ["PageHeader (Anthem)"] },
        controls: { include: ['brand', 'mode', 'memberName'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        mode:  { control: 'select', options: ['A', 'B'] },
        memberName: { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css; /* inject one brand into Canvas */
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true))); /* wait until active */
    }, [brand, entry.css]);

    return { ready, canonicalPrefix: entry.prefix };
};

const TokenTable = ({ rootEl, canonicalPrefix, ready }) => {
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
        const csEl   = rootEl ? getComputedStyle(rootEl) : null;
        const csRoot = getComputedStyle(document.documentElement);

        return ROWS.map(r => {
            const fromRoot = r.source === 'root';
            const value = (fromRoot ? csRoot.getPropertyValue(r.var) : csEl?.getPropertyValue(r.var))?.trim() || 'N/A';
            const canonicalVar = r.var.startsWith('--semantic-')
                ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}`
                : r.var;
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

    useEffect(() => {
        if (ready) requestAnimationFrame(() => setRootEl(document.querySelector('.pageheader')));
    }, [ready, args.brand, args.mode, args.memberName]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <PageHeader {...args} />
            <TokenTable rootEl={rootEl} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    mode: 'A',
    memberName: 'Alex Johnson',
};