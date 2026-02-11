/** @type { import('@storybook/react-webpack5').Preview } */
import React, { useEffect } from 'react';
import './preview.css';
import anthemRootTokens from '!!raw-loader!../src/design-tokens/anthem/root.css';

const ROOT_BRAND_TOKENS = {
  anthem: anthemRootTokens,
  healthyblue: anthemRootTokens,
  wellpoint: anthemRootTokens,
};

const withBrandRootTokens = (Story, context) => {
  const brand = context?.args?.brand ?? 'anthem';

  useEffect(() => {
    const css = ROOT_BRAND_TOKENS[brand] ?? ROOT_BRAND_TOKENS.anthem;
    let tag = document.getElementById('dynamic-brand-root-styles');
    if (!tag) {
      tag = document.createElement('style');
      tag.id = 'dynamic-brand-root-styles';
      document.head.appendChild(tag);
    }
    tag.textContent = css;
  }, [brand]);

  return <Story />;
};

const preview = {
  decorators: [withBrandRootTokens],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      disableSaveFromUI: true,
    },
    designToken: {
      files: [
        // Anthem tokens
        "../src/design-tokens/anthem/accordion.css",
        "../src/design-tokens/anthem/alert.css",
        "../src/design-tokens/anthem/badge.css",
        "../src/design-tokens/anthem/bargraph.css",
        "../src/design-tokens/anthem/buttongroup.css",
        "../src/design-tokens/anthem/button.css",
        "../src/design-tokens/anthem/checkbox.css",
        "../src/design-tokens/anthem/container.css",
        "../src/design-tokens/anthem/divider.css",
        "../src/design-tokens/anthem/dropdown.css",
        "../src/design-tokens/anthem/leftnav.css",
        "../src/design-tokens/anthem/link.css",
        "../src/design-tokens/anthem/pageheader.css",
        "../src/design-tokens/anthem/progressbar.css",
        "../src/design-tokens/anthem/radio.css",
        "../src/design-tokens/anthem/sectionheader.css",
        "../src/design-tokens/anthem/slidein.css",
        "../src/design-tokens/anthem/tabs.css",
        "../src/design-tokens/anthem/textcolors.css",
        "../src/design-tokens/anthem/textfield.css",
        "../src/design-tokens/anthem/toggle.css",
        "../src/design-tokens/anthem/tooltip.css",
      ],
    },
  },
  options: {
    storySort: {
      order: ["Introduction", "Components", "Pages"],
    },
    enableShortcuts: false,
  },
  controls: { expanded: true },
  actions: { disable: true },
  globals: {
    disablePersistence: true,
  },
};

export default preview;
