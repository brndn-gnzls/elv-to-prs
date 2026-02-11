/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useState } from 'react';
import { Accordion } from './Accordion';

/* Inject one brand stylesheet (cache-busted) */
import anthemTokens      from '!!raw-loader!../design-tokens/anthem/accordion.css?v=ac2';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/accordion.css?v=ac2';
import wellpointTokens   from '!!raw-loader!../design-tokens/wellpoint/accordion.css?v=ac2';

const BRANDS = {
    anthem:      { css: anthemTokens,      prefix: '--semantic-anthem-' },
    healthyblue: { css: healthyblueTokens, prefix: '--semantic-healthy-blue-' },
    wellpoint:   { css: wellpointTokens,   prefix: '--semantic-wellpoint-' },
};

export default {
    title: 'Components/Accordion',
    component: Accordion,
    parameters: {
        designToken: {
            files: [
                "../src/design-tokens/anthem/accordion.tokens.css"
            ],
            override: true
        },
        controls: { include: ['brand'] },
        actions: { disable: true },
        docs: { disable: true },
        a11y: { disable: true },
    },
    argTypes: {
        brand: { control: 'select', options: ['anthem', 'healthyblue', 'wellpoint'] },
    },
};

const useBrandCss = (brand) => {
    const [ready, setReady] = useState(false);
    const entry = BRANDS[brand] ?? BRANDS.anthem;

    useEffect(() => {
        let tag = document.getElementById('dynamic-brand-styles');
        if (!tag) {
            tag = document.createElement('style');
            tag.id = 'dynamic-brand-styles';
            document.head.appendChild(tag);
        }

        tag.textContent = entry.css; 

        // wait a couple of frames to ensure CSS applied
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    }, [brand, entry.css]);

    return ready;
};

const Template = (args) => {
    const ready = useBrandCss(args.brand);

    if (!ready) {
        return <div style={{ padding: 20 }}>Loading brand styles…</div>;
    }

    return (
        <div style={{ padding: 20 }}>
            <Accordion
                {...args}
                items={[
                    { title: 'Accordion item #1', description: 'Optional description', content: 'Body content for item 1.' },
                    { title: 'Accordion item #2', description: '', content: 'Body content for item 2.' },
                ]}
            />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
};
