/** @type { import('@storybook/react-webpack5').Preview } */
import './preview.css';

const preview = {
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
        "../src/design-tokens/anthem/progressbar.css",
        "../src/design-tokens/anthem/radio.css",
        "../src/design-tokens/anthem/sectionheader.css",
        "../src/design-tokens/anthem/slidein.css",
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
