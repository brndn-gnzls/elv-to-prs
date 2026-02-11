/* eslint import/no-webpack-loader-syntax: off */
import React, { useEffect, useMemo, useState } from 'react';
import { BarGraph } from './BarGraph';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/bargraph.css?v=bg2';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/bargraph.css?v=bg2';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/bargraph.css?v=bg2';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

/* One row per spreadsheet mapping (semantic or primitive) */
const ROWS = [
    // text
    { key: 'barGraph/text/standard/default',  var: '--semantic-bg-text-standard' },
    { key: 'barGraph/text/timeline/default',  var: '--semantic-bg-text-timeline' },
    { key: 'barGraph/text/milestone/default', var: '--semantic-bg-text-milestone' },

    // standard fills
    { key: 'barGraph/fill/standard/bar/dataVisualization1', var: '--semantic-bg-standard-bar1' },
    { key: 'barGraph/fill/standard/bar/dataVisualization2', var: '--semantic-bg-standard-bar2' },
    { key: 'barGraph/fill/standard/bar/dataVisualization3', var: '--semantic-bg-standard-bar3' },
    { key: 'barGraph/fill/standard/bar/dataVisualization4', var: '--semantic-bg-standard-bar4' },
    { key: 'barGraph/fill/standard/bar/dataVisualization5', var: '--semantic-bg-standard-bar5' },
    { key: 'barGraph/fill/standard/bar/totalBarFill',       var: '--semantic-bg-standard-total' },

    // timeline fills+borders
    { key: 'barGraph/fill/timeline/bar/progressBar',  var: '--semantic-bg-timeline-progress' },
    { key: 'barGraph/fill/timeline/bar/totalBarFill', var: '--semantic-bg-timeline-total' },
    { key: 'barGraph/fill/timeline/marker/markerFill',var: '--semantic-bg-timeline-marker' },
    { key: 'barGraph/border/timeline/totalBarBorder', var: '--semantic-br-timeline-total' },
    { key: 'barGraph/border/timeline/markerBlue',     var: '--semantic-br-timeline-markerBlue' },
    { key: 'barGraph/border/timeline/markerGray',     var: '--semantic-br-timeline-markerGray' },

    // milestone fills+borders
    { key: 'barGraph/fill/milestone/bar/progressBar1', var: '--semantic-bg-milestone-bar1' },
    { key: 'barGraph/fill/milestone/bar/progressBar2', var: '--semantic-bg-milestone-bar2' },
    { key: 'barGraph/fill/milestone/bar/progressBar3', var: '--semantic-bg-milestone-bar3' },
    { key: 'barGraph/fill/milestone/bar/totalBarFill', var: '--semantic-bg-milestone-total' },
    { key: 'barGraph/fill/milestone/marker/markerFill',var: '--semantic-bg-milestone-marker' },
    { key: 'barGraph/fill/milestone/legend/legend1',   var: '--semantic-bg-milestone-legend1' },
    { key: 'barGraph/fill/milestone/legend/legend2',   var: '--semantic-bg-milestone-legend2' },
    { key: 'barGraph/fill/milestone/legend/legend3',   var: '--semantic-bg-milestone-legend3' },
    { key: 'barGraph/border/milestone/marker1',        var: '--semantic-br-milestone-marker1' },
    { key: 'barGraph/border/milestone/marker2',        var: '--semantic-br-milestone-marker2' },
    { key: 'barGraph/border/milestone/marker3',        var: '--semantic-br-milestone-marker3' },
    { key: 'barGraph/border/milestone/marker4',        var: '--semantic-br-milestone-marker4' },
    { key: 'barGraph/border/milestone/totalBarBorder', var: '--semantic-br-milestone-total' },

    // standard border
    { key: 'barGraph/border/standard/totalBarBorder', var: '--semantic-br-standard-total' },

    // primitives — border radius + sizes + padding + font/line-heights + widths/heights
    { key: 'barGraph/border/borderRadius/standard',  var: '--primitives-border-radius-rounded-full', source: 'root' },
    { key: 'barGraph/border/borderRadius/milestone', var: '--primitives-border-radius-rounded-full', source: 'root' },
    { key: 'barGraph/border/borderRadius/timeline',  var: '--primitives-border-radius-rounded-full', source: 'root' },
    { key: 'barGraph/border/size/standard',          var: '--primitives-sizing-050', source: 'root' },
    { key: 'barGraph/border/size/timeline',          var: '--primitives-sizing-050', source: 'root' },
    { key: 'barGraph/border/size/milestone',         var: '--primitives-sizing-050', source: 'root' },

    { key: 'barGraph/icon/milestone/helpIcon',       var: '--semantic-anthem-icon-primary', source: 'root' }, // icon color not aliased here; adjust if needed

    { key: 'barGraph/font/weight/standard/title',       var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'barGraph/font/weight/standard/description', var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'barGraph/font/weight/standard/progressValue', var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'barGraph/font/weight/standard/totalValue',    var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'barGraph/font/weight/timeline/milestone',     var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'barGraph/font/weight/timeline/date',          var: '--primitives-anthem-font-weight-medium',   source: 'root' },
    { key: 'barGraph/font/weight/milestone/milestone',    var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'barGraph/font/weight/milestone/number',       var: '--primitives-anthem-font-weight-semibold', source: 'root' },
    { key: 'barGraph/font/weight/milestone/date',         var: '--primitives-anthem-font-weight-medium',   source: 'root' },

    { key: 'barGraph/font/size/standard/title',    var: '--primitives-font-size-lg',   source: 'root' },
    { key: 'barGraph/font/size/standard/description', var: '--primitives-font-size-base', source: 'root' },
    { key: 'barGraph/font/size/standard/number',      var: '--primitives-font-size-base', source: 'root' },
    { key: 'barGraph/font/size/timeline/milestone',    var: '--primitives-font-size-base', source: 'root' },
    { key: 'barGraph/font/size/timeline/date',         var: '--primitives-font-size-sm',   source: 'root' },
    { key: 'barGraph/font/size/milestone/milestone',   var: '--primitives-font-size-lg',   source: 'root' },
    { key: 'barGraph/font/size/milestone/number',      var: '--primitives-font-size-base', source: 'root' },
    { key: 'barGraph/font/size/milestone/date',        var: '--primitives-font-size-sm',   source: 'root' },

    { key: 'barGraph/font/lineHeight/standard/title',     var: '--primitives-line-height-lg',   source: 'root' },
    { key: 'barGraph/font/lineHeight/standard/description', var: '--primitives-line-height-base', source: 'root' },
    { key: 'barGraph/font/lineHeight/standard/number',      var: '--primitives-line-height-base', source: 'root' },
    { key: 'barGraph/font/lineHeight/timeline/milestone',    var: '--primitives-line-height-base', source: 'root' },
    { key: 'barGraph/font/lineHeight/timeline/date',         var: '--primitives-line-height-sm',   source: 'root' },
    { key: 'barGraph/font/lineHeight/milestone/milestone',   var: '--primitives-line-height-lg',   source: 'root' },
    { key: 'barGraph/font/lineHeight/milestone/number',      var: '--primitives-line-height-base', source: 'root' },
    { key: 'barGraph/font/lineHeight/milestone/date',        var: '--primitives-line-height-sm',   source: 'root' },

    { key: 'barGraph/height/standard/heightThick', var: '--primitives-sizing-5',  source: 'root' },
    { key: 'barGraph/height/standard/heightThin',  var: '--primitives-sizing-3',  source: 'root' },
    { key: 'barGraph/height/timeline/horizontalBarHeight', var: '--primitives-sizing-5',  source: 'root' },
    { key: 'barGraph/height/timeline/marker',      var: '--primitives-sizing-11', source: 'root' },
    { key: 'barGraph/height/milestone/horizontalBarHeight', var: '--primitives-sizing-5',  source: 'root' },
    { key: 'barGraph/height/milestone/marker',     var: '--primitives-sizing-11', source: 'root' },

    { key: 'barGraph/padding/gap/standard/verticalGraph',    var: '--primitives-spacing-2',  source: 'root' },
    { key: 'barGraph/padding/gap/standard/horizontalValue',  var: '--primitives-spacing-1',  source: 'root' },
    { key: 'barGraph/padding/gap/standard/horizontalVariant',var: '--primitives-spacing-3',  source: 'root' },
    { key: 'barGraph/padding/gap/standard/verticalVariant',  var: '--primitives-spacing-3',  source: 'root' },

    { key: 'barGraph/padding/gap/milestone/legend',      var: '--primitives-spacing-2',  source: 'root' },
    { key: 'barGraph/padding/gap/milestone/legendGroup', var: '--primitives-spacing-6',  source: 'root' },
    { key: 'barGraph/padding/gap/milestone/container',   var: '--primitives-spacing-1',  source: 'root' },
    { key: 'barGraph/padding/gap/milestone/label',       var: '--primitives-spacing-1',  source: 'root' },

    { key: 'barGraph/padding/horizontal/timeline/verticalGraph', var: '--primitives-spacing-32', source: 'root' },
    { key: 'barGraph/padding/horizontal/milestone/verticalGraph', var: '--primitives-spacing-32', source: 'root' },
    { key: 'barGraph/padding/vertical/timeline/horizontalGraph',  var: '--primitives-spacing-24', source: 'root' },
    { key: 'barGraph/padding/vertical/timeline/verticalGraph',    var: '--primitives-spacing-8',  source: 'root' },

    { key: 'barGraph/padding/vertical/timeline/helpIcon', var: '--primitives-spacing-1', source: 'root' },

    { key: 'barGraph/padding/vertical/milestone/horizontalGraph', var: '--primitives-spacing-24', source: 'root' },
    { key: 'barGraph/padding/vertical/milestone/verticalGraph',   var: '--primitives-spacing-7',  source: 'root' },

    { key: 'barGraph/padding/left/timeline/milestoneRight',  var: '--primitives-spacing-32', source: 'root' },
    { key: 'barGraph/padding/left/milestone/milestoneRight', var: '--primitives-spacing-32', source: 'root' },
    { key: 'barGraph/padding/right/timeline/milestoneLeft',  var: '--primitives-spacing-32', source: 'root' },
    { key: 'barGraph/padding/right/milestone/milestoneLeft', var: '--primitives-spacing-32', source: 'root' },

    { key: 'barGraph/padding/bottom/timeline/milestoneTop',  var: '--primitives-spacing-24', source: 'root' },
    { key: 'barGraph/padding/bottom/milestone/milestoneTop', var: '--primitives-spacing-24', source: 'root' },
    { key: 'barGraph/padding/top/milestone/milestoneBottom', var: '--primitives-spacing-24', source: 'root' },
    { key: 'barGraph/padding/top/timeline/milestoneBottom',  var: '--primitives-spacing-24', source: 'root' },

    { key: 'barGraph/width/timeline/verticalBarWidth', var: '--primitives-sizing-5', source: 'root' },
    { key: 'barGraph/width/timeline/marker',           var: '--primitives-sizing-5', source: 'root' },
    { key: 'barGraph/width/milestone/verticalBarWidth',var: '--primitives-sizing-5', source: 'root' },
    { key: 'barGraph/width/milestone/marker',          var: '--primitives-sizing-5', source: 'root' },
];

export default {
    title: 'Components/BarGraph',
    component: BarGraph,
    parameters: {

        designToken: { tabs: ["BarGraph (Anthem)"] },
        controls: { include: ['brand', 'variant', 'standardSegments', 'progress', 'milestoneSegments', 'title', 'description'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand:   { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
        variant: { control: 'select', options: ['standard', 'timeline', 'milestone'] },
        standardSegments: { control: 'object' },
        progress: { control: 'number', min: 0, max: 100 },
        milestoneSegments: { control: 'object' },
        title: { control: 'text' },
        description: { control: 'text' },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        setReady(false);
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) { tag = document.createElement('style'); tag.id = 'dynamic-brand-styles'; document.head.appendChild(tag); }
        tag.textContent = entry.css; // inject 1 brand into the Canvas iframe
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
        </div>
    );
};

const Template = (args) => {
    const { ready, canonicalPrefix } = useBrandCss(args.brand);
    const [el, setEl] = useState(null);

    useEffect(() => { if (ready) requestAnimationFrame(() => setEl(document.querySelector('.bargraph'))); },
        [ready, args.brand, args.variant, args.standardSegments, args.progress, args.milestoneSegments, args.title, args.description]);

    if (!ready) return <div style={{ fontFamily: 'Arial', padding: 20 }}>Loading brand styles…</div>;

    return (
        <div style={{ fontFamily: 'Arial', padding: 20, width: '100%' }}>
            <BarGraph {...args} />
            <TokenTable el={el} canonicalPrefix={canonicalPrefix} ready={ready} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    variant: 'standard',
    title: 'Q3 KPIs',
    description: 'Stacked bar segments',
    standardSegments: [35, 25, 15, 10, 5],
    progress: 45,
    milestoneSegments: [30, 20, 10],
};