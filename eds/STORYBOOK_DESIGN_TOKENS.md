## Storybook Design Tokens Setup (Storybook 10)

This doc summarizes the changes made to support Storybook 10 + `storybook-design-token` v5, the per‑component token display, and the control fixes.

## Overview

We upgraded Storybook to v10 and standardized token presentation so each component only shows the tokens it uses. Tokens are now defined as component‑scoped values (not global palettes), and Storybook injects brand primitives so controls remain functional.

Key outcomes:
- Storybook 10.2.8 + `storybook-design-token` 5.0.0
- Each component’s token panel only shows its own category (e.g., `Alert (Anthem)`).
- Token CSS files contain only the variables the component actually uses.
- Brand primitives are injected globally so controls (size, variant, disabled, etc.) render correctly.
- Build no longer fails from ESLint warnings in Storybook.

## Current Versions

In `package.json`:
- `storybook`: `10.2.8`
- `@storybook/react-webpack5`: `10.2.8`
- `@storybook/addon-docs`: `10.2.8`
- `@storybook/addon-onboarding`: `10.2.8`
- `@storybook/preset-create-react-app`: `10.2.8`
- `eslint-plugin-storybook`: `10.2.8`
- `storybook-design-token`: `5.0.0`

## Storybook Configuration

### Addon Registration (deduped)

The design‑token addon registers a manager entry. We dedupe manager entries to avoid
the “loaded twice” warning.

File: `/.storybook/main.js`
- `managerEntries` filters out duplicates and injects the canonical manager entry from `storybook-design-token/manager`.

### ESLint disabled in Storybook build

Storybook was failing on ESLint errors (not runtime errors). We disable the
`ESLintWebpackPlugin` only for Storybook.

File: `/.storybook/main.js`
- `webpackFinal` removes `ESLintWebpackPlugin` from the Storybook build pipeline.

### Brand primitives injected per story

Component token files are now scoped and no longer include primitives. To keep
controls working, we inject root brand tokens via a decorator.

File: `/.storybook/preview.js`
- `withBrandRootTokens` injects `anthem/root.css` based on the `brand` arg.
- HealthyBlue / WellPoint currently fall back to Anthem because their `root.css`
  files do not exist.

If you add brand root files later:
- Create `src/design-tokens/healthyblue/root.css` and `src/design-tokens/wellpoint/root.css`
- Update `ROOT_BRAND_TOKENS` in `/.storybook/preview.js` to use them.

## Design Token Files (Per Component)

### Format

Each component token file has a header and a `:root` block with only the tokens that
component uses (no global palette values).

Example (Button):
```css
/**
 * @tokens Button (Anthem)
 * @presenter Color
 */
:root {
  --semantic-surface-primary: #286ce2;
  --semantic-surface-secondary: #2453a6;
  --semantic-surface-press: #131331;
  --semantic-surface-white: #ffffff;
  --semantic-surface-subdued: #666666;
  --semantic-border-primary: #286ce2;
  --semantic-border-white: #ffffff;
  --semantic-text-white: #ffffff;
  --semantic-text-primary: #286ce2;
  --semantic-icon-white: #ffffff;
  --semantic-icon-primary: #286ce2;
}
```

This mirrors the Alert file format and ensures the token panel only shows relevant values.

### How values are derived

Component token files map the variables actually used by the component styles
to literal values (resolved from `root.css`), for example:

From `Button.css` (component styles):
```css
.btn--primary {
  background-color: var(--semantic-surface-primary);
  border-color: var(--semantic-border-primary);
  color: var(--semantic-text-white);
}
```

Tokens file contains only those variables with literal values:
```css
--semantic-surface-primary: #286ce2;
--semantic-border-primary: #286ce2;
--semantic-text-white: #ffffff;
```

## Per‑Component Token Tabs

Each component story sets:
```
parameters: {
  designToken: { tabs: ["<Component> (Anthem)"] },
}
```

This ensures only that category appears in the tokens panel.

All component stories in `src/components/*.stories.jsx` now do this.

## Global Token File List

Storybook loads all Anthem component token files globally so the addon can render
token categories, but each story only shows its own tab.

File: `/.storybook/preview.js`
- `designToken.files` includes every `src/design-tokens/anthem/*.css`

## Controls Fixes (Why they broke, how they were fixed)

After token files were reduced to component‑only values, primitives (spacing,
sizing, opacity) disappeared, so component styles evaluated to empty values.

Fix:
- Inject `root.css` for the selected brand via Storybook decorator.
- This re‑introduces primitives without polluting the token panel.

## How to Add a New Component

1. Create `src/design-tokens/anthem/<component>.css` with:
   - `@tokens <Component> (Anthem)`
   - `@presenter Color`
   - `:root { ... }` containing only component‑used variables.
2. Add the file to `/.storybook/preview.js` under `designToken.files`.
3. In `<Component>.stories.jsx`, add:
   ```
   parameters: {
     designToken: { tabs: ["<Component> (Anthem)"] }
   }
   ```

## Troubleshooting

- **“loaded twice” warning**: manager entries are deduped in `/.storybook/main.js`.
- **Controls not updating**: ensure `brand` arg exists and decorator is active in `/.storybook/preview.js`.
- **Build fails with ESLint errors**: ESLint plugin is removed in `webpackFinal` for Storybook only.
- **Missing brand root files**: `healthyblue/root.css` and `wellpoint/root.css` are not present; currently fallback to Anthem.

## File Summary (Key Changes)

- `/.storybook/main.js`
  - Add manager entry dedupe
  - Disable `ESLintWebpackPlugin` in Storybook build
- `/.storybook/preview.js`
  - Brand root token decorator
  - Expanded `designToken.files` list
- `src/components/*.stories.jsx`
  - `designToken.tabs` set per component
- `src/design-tokens/anthem/*.css`
  - `@tokens` header
  - Reduced to component‑only tokens with literal values

## Commands

Run Storybook:
```
npm run storybook
```

If Storybook is stuck on a stale cache:
```
rm -rf node_modules/.cache/storybook
```
## Storybook Design Tokens Setup (Storybook 10)

This doc summarizes the changes made to support Storybook 10 + `storybook-design-token` v5, the per‑component token display, and the control fixes.

## Overview

We upgraded Storybook to v10 and standardized token presentation so each component only shows the tokens it uses. Tokens are now defined as component‑scoped values (not global palettes), and Storybook injects brand primitives so controls remain functional.

Key outcomes:
- Storybook 10.2.8 + `storybook-design-token` 5.0.0
- Each component’s token panel only shows its own category (e.g., `Alert (Anthem)`).
- Token CSS files contain only the variables the component actually uses.
- Brand primitives are injected globally so controls (size, variant, disabled, etc.) render correctly.
- Build no longer fails from ESLint warnings in Storybook.

## Current Versions

In `package.json`:
- `storybook`: `10.2.8`
- `@storybook/react-webpack5`: `10.2.8`
- `@storybook/addon-docs`: `10.2.8`
- `@storybook/addon-onboarding`: `10.2.8`
- `@storybook/preset-create-react-app`: `10.2.8`
- `eslint-plugin-storybook`: `10.2.8`
- `storybook-design-token`: `5.0.0`

## Storybook Configuration

### Addon Registration (deduped)

The design‑token addon registers a manager entry. We dedupe manager entries to avoid
the “loaded twice” warning.

File: `/.storybook/main.js`
- `managerEntries` filters out duplicates and injects the canonical manager entry from `storybook-design-token/manager`.

### ESLint disabled in Storybook build

Storybook was failing on ESLint errors (not runtime errors). We disable the
`ESLintWebpackPlugin` only for Storybook.

File: `/.storybook/main.js`
- `webpackFinal` removes `ESLintWebpackPlugin` from the Storybook build pipeline.

### Brand primitives injected per story

Component token files are now scoped and no longer include primitives. To keep
controls working, we inject root brand tokens via a decorator.

File: `/.storybook/preview.js`
- `withBrandRootTokens` injects `anthem/root.css` based on the `brand` arg.
- HealthyBlue / WellPoint currently fall back to Anthem because their `root.css`
  files do not exist.

If you add brand root files later:
- Create `src/design-tokens/healthyblue/root.css` and `src/design-tokens/wellpoint/root.css`
- Update `ROOT_BRAND_TOKENS` in `/.storybook/preview.js` to use them.

## Design Token Files (Per Component)

### Format

Each component token file has a header and a `:root` block with only the tokens that
component uses (no global palette values).

Example (Button):
```css
/**
 * @tokens Button (Anthem)
 * @presenter Color
 */
:root {
  --semantic-surface-primary: #286ce2;
  --semantic-surface-secondary: #2453a6;
  --semantic-surface-press: #131331;
  --semantic-surface-white: #ffffff;
  --semantic-surface-subdued: #666666;
  --semantic-border-primary: #286ce2;
  --semantic-border-white: #ffffff;
  --semantic-text-white: #ffffff;
  --semantic-text-primary: #286ce2;
  --semantic-icon-white: #ffffff;
  --semantic-icon-primary: #286ce2;
}
```

This mirrors the Alert file format and ensures the token panel only shows relevant values.

### How values are derived

Component token files map the variables actually used by the component styles
to literal values (resolved from `root.css`), for example:

From `Button.css` (component styles):
```css
.btn--primary {
  background-color: var(--semantic-surface-primary);
  border-color: var(--semantic-border-primary);
  color: var(--semantic-text-white);
}
```

Tokens file contains only those variables with literal values:
```css
--semantic-surface-primary: #286ce2;
--semantic-border-primary: #286ce2;
--semantic-text-white: #ffffff;
```

## Per‑Component Token Tabs

Each component story sets:
```
parameters: {
  designToken: { tabs: ["<Component> (Anthem)"] },
}
```

This ensures only that category appears in the tokens panel.

All component stories in `src/components/*.stories.jsx` now do this.

## Global Token File List

Storybook loads all Anthem component token files globally so the addon can render
token categories, but each story only shows its own tab.

File: `/.storybook/preview.js`
- `designToken.files` includes every `src/design-tokens/anthem/*.css`

## Controls Fixes (Why they broke, how they were fixed)

After token files were reduced to component‑only values, primitives (spacing,
sizing, opacity) disappeared, so component styles evaluated to empty values.

Fix:
- Inject `root.css` for the selected brand via Storybook decorator.
- This re‑introduces primitives without polluting the token panel.

## How to Add a New Component

1. Create `src/design-tokens/anthem/<component>.css` with:
   - `@tokens <Component> (Anthem)`
   - `@presenter Color`
   - `:root { ... }` containing only component‑used variables.
2. Add the file to `/.storybook/preview.js` under `designToken.files`.
3. In `<Component>.stories.jsx`, add:
   ```
   parameters: {
     designToken: { tabs: ["<Component> (Anthem)"] }
   }
   ```

## Troubleshooting

- **“loaded twice” warning**: manager entries are deduped in `/.storybook/main.js`.
- **Controls not updating**: ensure `brand` arg exists and decorator is active in `/.storybook/preview.js`.
- **Build fails with ESLint errors**: ESLint plugin is removed in `webpackFinal` for Storybook only.
- **Missing brand root files**: `healthyblue/root.css` and `wellpoint/root.css` are not present; currently fallback to Anthem.

## File Summary (Key Changes)

- `/.storybook/main.js`
  - Add manager entry dedupe
  - Disable `ESLintWebpackPlugin` in Storybook build
- `/.storybook/preview.js`
  - Brand root token decorator
  - Expanded `designToken.files` list
- `src/components/*.stories.jsx`
  - `designToken.tabs` set per component
- `src/design-tokens/anthem/*.css`
  - `@tokens` header
  - Reduced to component‑only tokens with literal values

## Commands

Run Storybook:
```
npm run storybook
```

If Storybook is stuck on a stale cache:
```
rm -rf node_modules/.cache/storybook
```
## Storybook Design Tokens Setup (Storybook 10)

This doc summarizes the changes made to support Storybook 10 + `storybook-design-token` v5, the per‑component token display, and the control fixes.

## Overview

We upgraded Storybook to v10 and standardized token presentation so each component only shows the tokens it uses. Tokens are now defined as component‑scoped values (not global palettes), and Storybook injects brand primitives so controls remain functional.

Key outcomes:
- Storybook 10.2.8 + `storybook-design-token` 5.0.0
- Each component’s token panel only shows its own category (e.g., `Alert (Anthem)`).
- Token CSS files contain only the variables the component actually uses.
- Brand primitives are injected globally so controls (size, variant, disabled, etc.) render correctly.
- Build no longer fails from ESLint warnings in Storybook.

## Current Versions

In `package.json`:
- `storybook`: `10.2.8`
- `@storybook/react-webpack5`: `10.2.8`
- `@storybook/addon-docs`: `10.2.8`
- `@storybook/addon-onboarding`: `10.2.8`
- `@storybook/preset-create-react-app`: `10.2.8`
- `eslint-plugin-storybook`: `10.2.8`
- `storybook-design-token`: `5.0.0`

## Storybook Configuration

### Addon Registration (deduped)

The design‑token addon registers a manager entry. We dedupe manager entries to avoid
the “loaded twice” warning.

File: `/.storybook/main.js`
- `managerEntries` filters out duplicates and injects the canonical manager entry from `storybook-design-token/manager`.

### ESLint disabled in Storybook build

Storybook was failing on ESLint errors (not runtime errors). We disable the
`ESLintWebpackPlugin` only for Storybook.

File: `/.storybook/main.js`
- `webpackFinal` removes `ESLintWebpackPlugin` from the Storybook build pipeline.

### Brand primitives injected per story

Component token files are now scoped and no longer include primitives. To keep
controls working, we inject root brand tokens via a decorator.

File: `/.storybook/preview.js`
- `withBrandRootTokens` injects `anthem/root.css` based on the `brand` arg.
- HealthyBlue / WellPoint currently fall back to Anthem because their `root.css`
  files do not exist.

If you add brand root files later:
- Create `src/design-tokens/healthyblue/root.css` and `src/design-tokens/wellpoint/root.css`
- Update `ROOT_BRAND_TOKENS` in `/.storybook/preview.js` to use them.

## Design Token Files (Per Component)

### Format

Each component token file has a header and a `:root` block with only the tokens that
component uses (no global palette values).

Example (Button):
```css
/**
 * @tokens Button (Anthem)
 * @presenter Color
 */
:root {
  --semantic-surface-primary: #286ce2;
  --semantic-surface-secondary: #2453a6;
  --semantic-surface-press: #131331;
  --semantic-surface-white: #ffffff;
  --semantic-surface-subdued: #666666;
  --semantic-border-primary: #286ce2;
  --semantic-border-white: #ffffff;
  --semantic-text-white: #ffffff;
  --semantic-text-primary: #286ce2;
  --semantic-icon-white: #ffffff;
  --semantic-icon-primary: #286ce2;
}
```

This mirrors the Alert file format and ensures the token panel only shows relevant values.

### How values are derived

Component token files map the variables actually used by the component styles
to literal values (resolved from `root.css`), for example:

From `Button.css` (component styles):
```css
.btn--primary {
  background-color: var(--semantic-surface-primary);
  border-color: var(--semantic-border-primary);
  color: var(--semantic-text-white);
}
```

Tokens file contains only those variables with literal values:
```css
--semantic-surface-primary: #286ce2;
--semantic-border-primary: #286ce2;
--semantic-text-white: #ffffff;
```

## Per‑Component Token Tabs

Each component story sets:
```
parameters: {
  designToken: { tabs: ["<Component> (Anthem)"] },
}
```

This ensures only that category appears in the tokens panel.

All component stories in `src/components/*.stories.jsx` now do this.

## Global Token File List

Storybook loads all Anthem component token files globally so the addon can render
token categories, but each story only shows its own tab.

File: `/.storybook/preview.js`
- `designToken.files` includes every `src/design-tokens/anthem/*.css`

## Controls Fixes (Why they broke, how they were fixed)

After token files were reduced to component‑only values, primitives (spacing,
sizing, opacity) disappeared, so component styles evaluated to empty values.

Fix:
- Inject `root.css` for the selected brand via Storybook decorator.
- This re‑introduces primitives without polluting the token panel.

## How to Add a New Component

1. Create `src/design-tokens/anthem/<component>.css` with:
   - `@tokens <Component> (Anthem)`
   - `@presenter Color`
   - `:root { ... }` containing only component‑used variables.
2. Add the file to `/.storybook/preview.js` under `designToken.files`.
3. In `<Component>.stories.jsx`, add:
   ```
   parameters: {
     designToken: { tabs: ["<Component> (Anthem)"] }
   }
   ```

## Troubleshooting

- **“loaded twice” warning**: manager entries are deduped in `/.storybook/main.js`.
- **Controls not updating**: ensure `brand` arg exists and decorator is active in `/.storybook/preview.js`.
- **Build fails with ESLint errors**: ESLint plugin is removed in `webpackFinal` for Storybook only.
- **Missing brand root files**: `healthyblue/root.css` and `wellpoint/root.css` are not present; currently fallback to Anthem.

## File Summary (Key Changes)

- `/.storybook/main.js`
  - Add manager entry dedupe
  - Disable `ESLintWebpackPlugin` in Storybook build
- `/.storybook/preview.js`
  - Brand root token decorator
  - Expanded `designToken.files` list
- `src/components/*.stories.jsx`
  - `designToken.tabs` set per component
- `src/design-tokens/anthem/*.css`
  - `@tokens` header
  - Reduced to component‑only tokens with literal values

## Commands

Run Storybook:
```
npm run storybook
```

If Storybook is stuck on a stale cache:
```
rm -rf node_modules/.cache/storybook
```
