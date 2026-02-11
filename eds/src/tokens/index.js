// src/tokens/index.js

import buttonTokens from './button.json';

export function getButtonToken(path) {
    // e.g. path = "button.primary.backgroundColor"
    // we’ll split on “.” and walk the object:
    return path
        .split('.')
        .reduce((obj, key) => (obj && obj[key] ? obj[key] : null), buttonTokens)
        ?.value || null;
}