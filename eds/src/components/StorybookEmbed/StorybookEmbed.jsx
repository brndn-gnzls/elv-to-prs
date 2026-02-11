import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const toKebab = (s) =>
    String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const getComponentFromUrl = () => {
    try {
        const m = (window.location.hash || "").match(/#\/components\/([^/?#]+)/i);
        return m ? decodeURIComponent(m[1]) : null;
    } catch {
        return null;
    }
};

/** WG--Lots of comments because I keep forgetting how this works.
 * Seed Storybook manager layout so the Controls panel starts taller.
 * We write to a few known keys (Storybook persists layout in localStorage).
 */
const seedStorybookPanelLayout = (opts = {}) => {
    const {
        panelPosition = "bottom",
        // Pass either a ratio (0..1) or an absolute px height:
        bottomPanelHeightPx = 360,     // ~45% of 800px iframe;
        bottomPanelRatio,             
    } = opts;

    // Compute a ratio if not supplied, relative to the current viewport.
    const ratio =
        typeof bottomPanelRatio === "number"
            ? Math.max(0.1, Math.min(0.9, bottomPanelRatio))
            : Math.max(0.1, Math.min(0.9, bottomPanelHeightPx / Math.max(window.innerHeight, 1)));

    // Common keys Storybook manager uses to persist its layout.
    const candidateKeys = [
        "storybook-layout",
        "sb-layout",
        // Guard against namespaced variants.
        "__STORYBOOK_LAYOUT__",
    ];

    const payloads = [
        // Shape A: Storybook has used a flat layout object with explicit bottom height.
        JSON.stringify({
            panelPosition,
            // Some builds use a pixel height, others use a ratio; I include both hints:
            bottomPanelHeight: Math.round(ratio * 1000) / 1000,
            bottomPanelPixels: Math.round(bottomPanelHeightPx),
        }),
        // Shape B: nested sizes map.
        JSON.stringify({
            panelPosition,
            panelSizes: { bottom: Math.round(ratio * 1000) / 1000 },
        }),
    ];

    try {
        candidateKeys.forEach((key) => {
            payloads.forEach((value) => localStorage.setItem(key, value));
        });
    } catch {
        // If local storage is blocked, just let the user deal with the default value.
    }
};

const StorybookEmbed = ({
                            componentName = "auto",
                            story = "default",
                            height = 800,                                  
                            group = "components",
                            idOverride,
                            baseUrl = "https://designsystem.elevancehealth.com/storybook",
                            panelHeightPx = 260,                           // ~45% of the 800px iframe.
                            hideNav = true,                                // Keep the side nav hidden.
                        }) => {
    // Compute componentName from URL hash if "auto"
    const resolvedComponent = useMemo(() => {
        if (componentName && componentName !== "auto") return componentName;
        return getComponentFromUrl() || "button";
    }, [componentName]);

    const comp    = toKebab(resolvedComponent);
    const variant = toKebab(story || "default");
    const storyId = idOverride || `${toKebab(group)}-${comp}--${variant}`;

    // manager URL (NOT iframe.html) so Controls panel exists
    const params = new URLSearchParams({
        path: `/story/${storyId}`,
        viewMode: "story",
        addons: "1",
        nav: hideNav ? "0" : "1",         // 1) request nav off
        panelPosition: "bottom",          // 1) controls at bottom
    });
    const srcUrl = `${baseUrl}/?${params.toString()}`;

    // Seeding localStorage for the manager.
    useEffect(() => {
        seedStorybookPanelLayout({ panelPosition: "bottom", bottomPanelHeightPx: panelHeightPx });
    }, [panelHeightPx]);

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 4,
                overflow: "hidden",
                margin: "1rem 0",
            }}
        >
            <iframe
                key={srcUrl} // Force a remount so new layout takes effect.
                title={`storybook-${resolvedComponent}-${variant}`}
                src={srcUrl}
                height={height}
                width="100%"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
};

StorybookEmbed.propTypes = {
    componentName: PropTypes.string, // "Duto" reads from #/components/<name>.
    story:         PropTypes.string, // "default"
    height:        PropTypes.number, // iframe height (default 800).
    group:         PropTypes.string, // Story title group (default "components").
    idOverride:    PropTypes.string, // Force a full id if needed.
    baseUrl:       PropTypes.string, // Storybook base.
    panelHeightPx: PropTypes.number, // Initial height of controls in px.
    hideNav:       PropTypes.bool,
};

export default StorybookEmbed;