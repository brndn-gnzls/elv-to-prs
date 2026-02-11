/** @type { import('@storybook/react-webpack5').StorybookConfig } */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const designTokenManager = require.resolve("storybook-design-token/manager");

const config = {
    "stories": [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    "addons": [
        "@storybook/preset-create-react-app",
        "@storybook/addon-docs",
        "storybook-design-token"
    ],
    "managerEntries": async (entries = []) => {
        const seen = new Set();
        const deduped = [];
        const normalize = (entry) =>
            typeof entry === "string" ? entry : (entry && entry.name ? entry.name : entry);
        const filtered = entries.filter(
            (entry) => !String(normalize(entry)).includes("storybook-design-token")
        );
        for (const entry of filtered) {
            const key = normalize(entry);
            if (seen.has(key)) {
                continue;
            }
            seen.add(key);
            deduped.push(entry);
        }
        deduped.push(designTokenManager);
        return deduped;
    },
    "framework": {
        "name": "@storybook/react-webpack5",
        "options": {}
    },
    "staticDirs": [
        "../public"
    ]
};
export default config;
