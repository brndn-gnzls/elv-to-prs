export function getAccessibilityBlocks() {

    return [
        // 1) Big heading + intro paragraph
        { type: "h2", content: "Accessibility" },
        {
            type: "p",
            content:
                "Our mission is clear: make our digital spaces accessible to everyone. This page outlines key " +
                "guidelines and practices to ensure our designs meet everyone's needs, focusing on usability and inclusivity. " +
                "Learn how we're making our content easy for all to access and engage with."
        },
        // Spacing if needed (consistent with your approach in Overview)
        { type: "spacing", height: 48 },

        // 2) Testing Status
        { type: "h3", content: "Testing Status" },
        {
            type: "p",
            content:
                "We track our components' accessibility through a clear testing status: manually tested, pending, " +
                "or not applicable. This ensures our designs are always up to standard and inclusive."
        },
        // The table
        {
            type: "accessibilityTable",
            rows: [
                { component: "Button", test: "Default State",   status: "Not Test" },
                { component: "",       test: "Advanced State",  status: "Tested" },
                { component: "",       test: "Typography",      status: "Tested" },
                { component: "",       test: "Screen Reader",   status: "Manually Tested" },
                { component: "",       test: "Keyboard Control",status: "Not Available" }
            ]
        },
        { type: "spacing", height: 48 },

        // 3) Further Guidance
        { type: "h2", content: "Further Guidance" },
        {
            type: "bulletList",
            bullets: [
                {
                    boldLead: "Keyboard Interaction:",
                    body: "When a button is in focus, users can activate it using either the Space or Enter keys..."
                },
                {
                    boldLead: "Color Contrast Compliance:",
                    body: "Each button variant has been rigorously tested for color contrast..."
                },
                {
                    boldLead: "Visual Focus Indicators:",
                    body: "To aid keyboard navigation, our buttons are designed with a clear focus state..."
                }
            ]
        },
        { type: "spacing", height: 48 },
        { type: "hr" },
        { type: "spacing", height: 48 },

        // 4) Additional Considerations
        { type: "h3", content: "Additional Considerations for Enhanced Accessibility" },
        {
            type: "p",
            content:
                "To further our commitment to accessibility, consider these additional guidelines when implementing our button components:"
        },
        {
            type: "bulletList",
            bullets: [
                {
                    boldLead: "Aria Attributes:",
                    body: "Utilize appropriate ARIA attributes to provide users with assistive technologies detailed information..."
                },
                {
                    boldLead: "Responsive Feedback:",
                    body: "Ensure that buttons provide visual and/or auditory feedback upon interaction..."
                },
                {
                    boldLead: "Text Size and Readability:",
                    body: "Maintain legible text sizes and fonts on all button variants..."
                }
            ]
        },
        { type: "spacing", height: 48 },
        { type: "hr" },
        { type: "spacing", height: 72 },

        // 5) Getting Help & final spacing
        { type: "gettingHelpInternal" },
        { type: "spacing", height: 92 }
    ];
}