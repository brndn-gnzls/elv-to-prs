/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './Button';

/* Inject one brand CSS at a time (cache-busted to avoid stale assets) */
import anthemTokens from '!!raw-loader!../design-tokens/anthem/button.css?v=dev3';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/button.css?v=dev3';
import wellpointTokens from '!!raw-loader!../design-tokens/wellpoint/button.css?v=dev3';

const BRAND_MAP = {
    anthem:      { css: anthemTokens,      canonicalPrefix: '--semantic-anthem-' },
    wellpoint:   { css: wellpointTokens,   canonicalPrefix: '--semantic-wellpoint-' },
    healthyblue: { css: healthyblueTokens, canonicalPrefix: '--semantic-healthy-blue-' },
};

/** Spreadsheet rows → which CSS var the component uses for that row.
 *  Many spreadsheet rows map to the same semantic alias (e.g., primary:hover background → surface-secondary).
 *  For 'primitives' rows, we read from :root.
 */
const ROWS = [
    // ---- BORDERS: ghost
    { label: 'button/border/ghost/default',  var: '--semantic-border-white' },
    { label: 'button/border/ghost/hover',    var: '--semantic-border-white' },
    { label: 'button/border/ghost/focus',    var: '--semantic-border-white' },
    { label: 'button/border/ghost/press',    var: '--semantic-border-white' },
    { label: 'button/border/ghost/disabled', var: '--semantic-border-white' },

    // ---- BORDERS: primary (focus only differs in spreadsheet, but points to same token)
    { label: 'button/border/primary/focus',  var: '--semantic-border-primary' },

    // ---- BORDERS: secondary
    { label: 'button/border/secondary/default',  var: '--semantic-border-primary' },
    { label: 'button/border/secondary/focus',    var: '--semantic-border-primary' },
    { label: 'button/border/secondary/disabled', var: '--semantic-border-primary' },

    // ---- BORDERS: secondaryWhite
    { label: 'button/border/secondaryWhite/focus', var: '--semantic-border-white' },
    { label: 'button/border/secondaryWhite/hover', var: '--semantic-border-white' },
    { label: 'button/border/secondaryWhite/press', var: '--semantic-border-white' },

    // ---- BORDER size & radius (primitives)
    { label: 'button/border/size',         var: '--primitives-sizing-025',   source: 'root' },
    { label: 'button/border/borderRadius', var: '0',                         source: 'literal' },

    // ---- BACKGROUND: primary
    { label: 'button/background/primary/default',  var: '--semantic-surface-primary' },
    { label: 'button/background/primary/hover',    var: '--semantic-surface-secondary' },
    { label: 'button/background/primary/focus',    var: '--semantic-surface-primary' },
    { label: 'button/background/primary/press',    var: '--semantic-surface-press' },
    { label: 'button/background/primary/disabled', var: '--semantic-surface-primary' },

    // ---- BACKGROUND: secondary (default is transparent by design)
    { label: 'button/background/secondary/hover',  var: '--semantic-surface-primary' },
    { label: 'button/background/secondary/press',  var: '--semantic-surface-press' },

    // ---- BACKGROUND: secondaryWhite
    { label: 'button/background/secondaryWhite/default',  var: '--semantic-surface-white' },
    { label: 'button/background/secondaryWhite/hover',    var: '--semantic-surface-secondary' },
    { label: 'button/background/secondaryWhite/focus',    var: '--semantic-surface-white' },
    { label: 'button/background/secondaryWhite/press',    var: '--semantic-surface-subdued' },
    { label: 'button/background/secondaryWhite/disabled', var: '--semantic-surface-white' },

    // ---- BACKGROUND: ghost
    { label: 'button/background/ghost/hover',  var: '--semantic-surface-secondary' },
    { label: 'button/background/ghost/press',  var: '--semantic-surface-subdued' },

    // ---- TEXT: primary
    { label: 'button/text/primary/default',  var: '--semantic-text-white' },
    { label: 'button/text/primary/hover',    var: '--semantic-text-white' },
    { label: 'button/text/primary/focus',    var: '--semantic-text-white' },
    { label: 'button/text/primary/press',    var: '--semantic-text-white' },
    { label: 'button/text/primary/disabled', var: '--semantic-text-white' },

    // ---- TEXT: secondary
    { label: 'button/text/secondary/default',  var: '--semantic-text-primary' },
    { label: 'button/text/secondary/hover',    var: '--semantic-text-white' },
    { label: 'button/text/secondary/focus',    var: '--semantic-text-primary' },
    { label: 'button/text/secondary/press',    var: '--semantic-text-white' },
    { label: 'button/text/secondary/disabled', var: '--semantic-text-primary' },

    // ---- TEXT: secondaryWhite
    { label: 'button/text/secondaryWhite/default',  var: '--semantic-text-primary' },
    { label: 'button/text/secondaryWhite/hover',    var: '--semantic-text-white' },
    { label: 'button/text/secondaryWhite/focus',    var: '--semantic-text-primary' },
    { label: 'button/text/secondaryWhite/press',    var: '--semantic-text-white' },
    { label: 'button/text/secondaryWhite/disabled', var: '--semantic-text-primary' },

    // ---- TEXT: ghost
    { label: 'button/text/ghost/default',  var: '--semantic-text-white' },
    { label: 'button/text/ghost/hover',    var: '--semantic-text-white' },
    { label: 'button/text/ghost/focus',    var: '--semantic-text-white' },
    { label: 'button/text/ghost/press',    var: '--semantic-text-white' },
    { label: 'button/text/ghost/disabled', var: '--semantic-text-white' },

    // ---- ICON: primary
    { label: 'button/icon/primary/default',  var: '--semantic-icon-white' },
    { label: 'button/icon/primary/hover',    var: '--semantic-icon-white' },
    { label: 'button/icon/primary/focus',    var: '--semantic-icon-white' },
    { label: 'button/icon/primary/press',    var: '--semantic-icon-white' },
    { label: 'button/icon/primary/disabled', var: '--semantic-icon-white' },

    // ---- ICON: secondary
    { label: 'button/icon/secondary/default',  var: '--semantic-icon-primary' },
    { label: 'button/icon/secondary/hover',    var: '--semantic-icon-white' },
    { label: 'button/icon/secondary/focus',    var: '--semantic-icon-primary' },
    { label: 'button/icon/secondary/press',    var: '--semantic-icon-white' },
    { label: 'button/icon/secondary/disabled', var: '--semantic-icon-primary' },

    // ---- ICON: secondaryWhite
    { label: 'button/icon/secondaryWhite/default',  var: '--semantic-icon-primary' },
    { label: 'button/icon/secondaryWhite/hover',    var: '--semantic-icon-white' },
    { label: 'button/icon/secondaryWhite/focus',    var: '--semantic-icon-primary' },
    { label: 'button/icon/secondaryWhite/press',    var: '--semantic-icon-white' },
    { label: 'button/icon/secondaryWhite/disabled', var: '--semantic-icon-primary' },

    // ---- ICON: ghost
    { label: 'button/icon/ghost/default',  var: '--semantic-icon-white' },
    { label: 'button/icon/ghost/hover',    var: '--semantic-icon-white' },
    { label: 'button/icon/ghost/focus',    var: '--semantic-icon-white' },
    { label: 'button/icon/ghost/press',    var: '--semantic-icon-white' },
    { label: 'button/icon/ghost/disabled', var: '--semantic-icon-white' },

    // ---- ICON sizes (primitives)
    { label: 'button/icon/size/large', var: '--primitives-sizing-5', source: 'root' },
    { label: 'button/icon/size/small', var: '--primitives-sizing-4', source: 'root' },

    // ---- Fonts (primitives)
    { label: 'button/font/weight/large/single', var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { label: 'button/font/weight/large/doubleTop', var: '--primitives-anthem-font-weight-regular', source: 'root' },
    { label: 'button/font/weight/large/doubleBottom', var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { label: 'button/font/weight/small', var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { label: 'button/font/size/large/single', var: '--primitives-font-size-base', source: 'root' },
    { label: 'button/font/size/large/doubleTop', var: '--primitives-font-size-2xs', source: 'root' },
    { label: 'button/font/size/large/doubleBottom', var: '--primitives-font-size-2xs', source: 'root' },
    { label: 'button/font/size/small', var: '--primitives-font-size-sm', source: 'root' },
    { label: 'button/font/lineHeight/large/single', var: '--primitives-line-height-base', source: 'root' },
    { label: 'button/font/lineHeight/large/doubleTop', var: '--primitives-line-height-2xs', source: 'root' },
    { label: 'button/font/lineHeight/large/doubleBottom', var: '--primitives-line-height-2xs', source: 'root' },
    { label: 'button/font/lineHeight/small', var: '--primitives-line-height-sm', source: 'root' },

    // ---- Heights / padding / gap / opacity / minWidth (primitives)
    { label: 'button/height/large', var: '--primitives-sizing-11', source: 'root' },
    { label: 'button/height/small', var: '0', source: 'literal' },
    { label: 'button/padding/horizontal/large', var: '--primitives-spacing-12', source: 'root' },
    { label: 'button/padding/horizontal/small', var: '0', source: 'literal' },
    { label: 'button/padding/vertical/large', var: '--primitives-spacing-250', source: 'root' },
    { label: 'button/padding/vertical/small', var: '--primitives-spacing-2', source: 'root' },
    { label: 'button/padding/gap/large', var: '--primitives-spacing-2', source: 'root' },
    { label: 'button/padding/gap/small', var: '--primitives-spacing-1', source: 'root' },
    { label: 'button/disabled', var: '--primitives-opacity-30', source: 'root' },
    { label: 'button/minWidth/large', var: '0', source: 'literal' },
    { label: 'button/minWidth/small', var: '--primitives-sizing-20', source: 'root' },
];

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {

        designToken: { tabs: ["Button (Anthem)"] },
        controls: { include: ['brand', 'variant', 'size', 'disabled', 'children'] },
        actions: { disable: true },
        a11y: { disable: true },
        docs: { disable: true },
        vitest: { disable: true },
        chromatic: { disableSnapshot: true },
        options: { enableShortcuts: false, showPanel: true },
        interactions: { disable: true },
    },
    argTypes: {
        brand: { control: { type: 'select' }, options: ['anthem', 'healthyblue', 'wellpoint'] },
        variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'secondaryWhite', 'ghost'] },
        size: { control: { type: 'select' }, options: ['small', 'large'] },
        disabled: { control: 'boolean' },
        children: { control: 'text' },
    },
};

/** Ensure brand CSS is applied before we render/read values. */
const useBrandCss = (brandKey) => {
    const [ready, setReady] = useState(false);
    const { css, canonicalPrefix } = BRAND_MAP[brandKey] ?? BRAND_MAP.anthem;

    useEffect(() => {
        setReady(false);
        let styleTag = document.getElementById('dynamic-brand-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-brand-styles';
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = css;

        // Make sure the stylesheet is active before reading styles
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    }, [brandKey, css]);

    return { ready, canonicalPrefix };
};

const TokenTable = ({ btnEl, canonicalPrefix, ready }) => {
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

        const root = document.documentElement;
        const csBtn = btnEl ? getComputedStyle(btnEl) : null;
        const csRoot = getComputedStyle(root);

        return ROWS.map(r => {
            const fromRoot = r.source === 'root';
            const literal   = r.source === 'literal';

            const value = literal
                ? r.var
                : (fromRoot ? csRoot.getPropertyValue(r.var) : csBtn?.getPropertyValue(r.var))?.trim() || 'N/A';

            const canonicalVar = r.var.startsWith('--semantic-')
                ? `${canonicalPrefix}${r.var.replace('--semantic-', '')}`
                : r.var;

            return { ...r, canonicalVar, value };
        });
    }, [btnEl, ready, canonicalPrefix]);

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
                {rows.map((row) => (
                    <tr key={row.label}>
                        <td style={{ padding: 8 }}>{row.label}</td>
                        <td style={{ padding: 8 }}><code>{row.var}</code></td>
                        <td style={{ padding: 8 }}>
                            <code>{row.canonicalVar}</code>
                        </td>
                        <td style={{ padding: 8 }}>{row.value}</td>
                        <td style={{ padding: 8 }}>
                            <div
                                style={{
                                    width: 24,
                                    height: 24,
                                    border: '1px solid #ccc',
                                    background:
                                    // show a color chip for color-like values
                                        row.value &&
                                        row.value !== 'N/A' &&
                                        row.value !== '…' &&
                                        /^#|rgb|hsl/.test(row.value)
                                            ? row.value
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
    const [btnEl, setBtnEl] = useState(null);

    useEffect(() => {
        if (!ready) return;
        requestAnimationFrame(() => {
            setBtnEl(document.querySelector('.btn'));
        });
    }, [ready, args.brand, args.variant, args.size, args.disabled]);

    if (!ready) {
        return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;
    }

    return (
        <div style={{ fontFamily: 'Arial', padding: 20 }}>
            <Button {...args} />
            <TokenTable btnEl={btnEl} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    variant: 'primary',
    size: 'large',
    disabled: false,
    children: 'Click Me',
};