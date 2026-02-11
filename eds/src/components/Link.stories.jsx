/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from './Link';

/* Inject one brand file at a time (cache-busted) */
import anthemTokens from '!!raw-loader!../design-tokens/anthem/link.css?v=ln1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/link.css?v=ln1';
import wellpointTokens from '!!raw-loader!../design-tokens/wellpoint/link.css?v=ln1';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
};

/** Spreadsheet rows → CSS var used in component.
 * Variants: internal | external | inline | white
 * States: resting | hover | focus | press | disabled
 */
const ROWS = [
    // text/internal
    { key: 'link/text/internal/resting',  var: '--semantic-link-text-primary' },
    { key: 'link/text/internal/hover',    var: '--semantic-link-text-secondary' },
    { key: 'link/text/internal/focus',    var: '--semantic-link-text-primary' },
    { key: 'link/text/internal/press',    var: '--semantic-link-text-press' },
    { key: 'link/text/internal/disabled', var: '--semantic-link-text-primary' },

    // text/white
    { key: 'link/text/white/resting',  var: '--semantic-link-text-white' },
    { key: 'link/text/white/hover',    var: '--semantic-link-text-white' },
    { key: 'link/text/white/focus',    var: '--semantic-link-text-white' },
    { key: 'link/text/white/press',    var: '--semantic-link-text-white' },
    { key: 'link/text/white/disabled', var: '--semantic-link-text-white' },

    // text/external
    { key: 'link/text/external/resting',  var: '--semantic-link-text-primary' },
    { key: 'link/text/external/hover',    var: '--semantic-link-text-secondary' },
    { key: 'link/text/external/focus',    var: '--semantic-link-text-primary' },
    { key: 'link/text/external/press',    var: '--semantic-link-text-press' },
    { key: 'link/text/external/disabled', var: '--semantic-link-text-primary' },

    // text/inline
    { key: 'link/text/inline/resting',  var: '--semantic-link-text-primary' },
    { key: 'link/text/inline/hover',    var: '--semantic-link-text-secondary' },
    { key: 'link/text/inline/focus',    var: '--semantic-link-text-primary' },
    { key: 'link/text/inline/press',    var: '--semantic-link-text-press' },
    { key: 'link/text/inline/disabled', var: '--semantic-link-text-primary' },

    // icon/internal | icon/external
    { key: 'link/icon/internal/resting',  var: '--semantic-link-icon-base' },
    { key: 'link/icon/internal/hover',    var: '--semantic-link-icon-base' },
    { key: 'link/icon/internal/focus',    var: '--semantic-link-icon-base' },
    { key: 'link/icon/internal/press',    var: '--semantic-link-icon-base' },
    { key: 'link/icon/internal/disabled', var: '--semantic-link-icon-base' },

    { key: 'link/icon/external/resting',  var: '--semantic-link-icon-base' },
    { key: 'link/icon/external/hover',    var: '--semantic-link-icon-base' },
    { key: 'link/icon/external/focus',    var: '--semantic-link-icon-base' },
    { key: 'link/icon/external/press',    var: '--semantic-link-icon-base' },
    { key: 'link/icon/external/disabled', var: '--semantic-link-icon-base' },

    // icon/white
    { key: 'link/icon/white/resting',  var: '--semantic-link-icon-white' },
    { key: 'link/icon/white/hover',    var: '--semantic-link-icon-white' },
    { key: 'link/icon/white/focus',    var: '--semantic-link-icon-white' },
    { key: 'link/icon/white/press',    var: '--semantic-link-icon-white' },
    { key: 'link/icon/white/disabled', var: '--semantic-link-icon-white' },

    // icon size (primitive)
    { key: 'link/icon/size', var: '--primitives-sizing-4', source: 'root' },

    // border focus colors
    { key: 'link/border/internal/focus', var: '--semantic-link-border-primary' },
    { key: 'link/border/external/focus', var: '--semantic-link-border-primary' },
    { key: 'link/border/inline/focus',   var: '--semantic-link-border-primary' },
    { key: 'link/border/white/focus',    var: '--semantic-link-border-white' },

    // border width focus (primitive)
    { key: 'link/border/width/focus', var: '--primitives-sizing-025', source: 'root' },

    // typography (primitives)
    { key: 'link/font/weight',     var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'link/font/size',       var: '--primitives-font-size-base', source: 'root' },
    { key: 'link/font/lineHeight', var: '--primitives-line-height-base', source: 'root' },

    // focus padding (primitives)
    { key: 'link/padding/horizontal/focus', var: '--primitives-spacing-1',   source: 'root' },
    { key: 'link/padding/vertical/focus',   var: '--primitives-spacing-025', source: 'root' },

    // gap & disabled
    { key: 'link/padding/gap', var: '--primitives-spacing-2', source: 'root' },
    { key: 'link/disabled',    var: '--primitives-opacity-30', source: 'root' },
];

export default {
    title: 'Components/Link',
    component: Link,
    parameters: {
        controls: { include: ['brand', 'variant', 'disabled', 'children'] },
        actions: { disable: true },
        a11y: { disable: true },
        docs: { disable: true },
    },
    argTypes: {
        brand:   { control: 'select', options: ['anthem', 'wellpoint', 'healthyblue'] },
        variant: { control: 'select', options: ['internal', 'external', 'inline', 'white'] },
        disabled:{ control: 'boolean' },
        children:{ control: 'text' },
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
        // ensure stylesheet is active before reads (Canvas iframe timing)
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

        const csEl   = el ? getComputedStyle(el.querySelector('.link__a')) : null; // read from <a>
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
    );
};

const Template = (args) => {
    const { ready, canonicalPrefix } = useBrandCss(args.brand);
    const [el, setEl] = useState(null);

    useEffect(() => {
        if (!ready) return;
        requestAnimationFrame(() => setEl(document.querySelector('.link')));
    }, [ready, args.brand, args.variant, args.disabled, args.children]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20 }}>
            <Link {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    variant: 'internal',
    disabled: false,
    children: 'Inline link',
};