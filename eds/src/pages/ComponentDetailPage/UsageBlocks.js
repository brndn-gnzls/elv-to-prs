export function usageBlocks() {
    return [
        // 1) Main heading + paragraph
        { type: "h2", content: "Usage" },
        {
            type: "p",
            content:
                "Explore the diverse states of our button component, designed for optimal user experience. " +
                "This section covers Primary, Secondary, Tertiary/Ghost, Disabled, and On Surface states, " +
                "each with a specific role in our interface design. Detailed descriptions provide insight " +
                "into their functionality and design rationale."
        },
        // Some spacing (48px) to match your pattern from Overview
        { type: "spacing", height: 48 },

        // 2) "Responsive Buttons: Adaptive Design in Action"
        { type: "h3", content: "Responsive Buttons: Adaptive Design in Action" },
        {
            type: "p",
            content:
                "Buttons in the design system are built to adapt seamlessly across devices, ensuring usability " +
                "and consistency. On mobile, buttons automatically fill their container for maximum touch area " +
                "and alignment. On desktop, buttons hug their content for a balanced and refined layout. This " +
                "responsiveness is powered by dynamic configurations that prioritize accessibility, readability, " +
                "and an optimal user experience at any screen size."
        },
        // Maybe smaller spacing, e.g., 32, before the image
        { type: "spacing", height: 32 },

        // 2a) Image + italic caption
        {
            type: "img",
            folder: "componentDetailUsage",
            src: "img-button-usage-desktop-light-001.svg"
        },
        {
            type: "pItalicSmall",
            content: "Button width Hug Contents vs Fill Container"
        },
        // 48px spacing afterwards
        { type: "spacing", height: 48 },

        // 3) "Button or Link? Know the Difference"
        { type: "h3", content: "Button or Link? Know the Difference" },
        {
            type: "p",
            content:
                "Use a button for actions that trigger changes, such as submitting forms or opening modals. " +
                "Opt for a text link to navigate users to different pages or sections, ensuring clarity and " +
                "consistency in user flow."
        },
        { type: "spacing", height: 32 },
        {
            type: "img",
            folder: "componentDetailUsage",
            src: "img-button-usage-desktop-light-002.svg"
        },
        {
            type: "pItalicSmall",
            content: "Primary Action paired with Secondary Action as a link"
        },
        { type: "spacing", height: 48 },

        // 4) "Two Line Button"
        { type: "h3", content: "Two Line Button" },
        {
            type: "p",
            content:
                "The two-line button is an efficient UI component designed for scenarios where users need to quickly modify " +
                "inputs while maintaining clarity and focus on distinct actions. This type of button is particularly useful in " +
                "interfaces requiring immediate adjustments or confirmations. The top line of text is used to display the original " +
                "value, while the bottom line of text displays the CTA associated with the value."
        },
        { type: "spacing", height: 32 },
        {
            type: "img",
            folder: "componentDetailUsage",
            src: "img-button-usage-desktop-light-003.svg"
        },
        {
            type: "pItalicSmall",
            content: "Two Line Button Example used to modify search location."
        },
        { type: "spacing", height: 48 },

        // 5) "Order and Placement"
        { type: "h3", content: "Order and Placement" },
        {
            type: "p",
            content:
                "When designing interfaces, place primary buttons on the right to facilitate natural progression of " +
                "reading through actions. Secondary buttons should be placed on the left to maintain a clear visual hierarchy, " +
                "guiding users towards the primary task without distraction. This setup helps to create intuitive and efficient " +
                "user experiences, ensuring that critical actions are easily accessible and that alternative options remain visible " +
                "but less emphasized. Ensure all buttons are consistently styled and accessible, meeting design system standards for " +
                "usability and inclusivity."
        },
        { type: "spacing", height: 32 },
        {
            type: "img",
            folder: "componentDetailUsage",
            src: "img-button-usage-desktop-light-004.svg"
        },
        {
            type: "pItalicSmall",
            content: "Primary and Secondary Button placement at the end of a form."
        },
        { type: "spacing", height: 48 },
        { type: "hr" },
        { type: "spacing", height: 72 },

        // 6) GettingHelpInternal + final spacing
        { type: "gettingHelpInternal" },
        { type: "spacing", height: 92 }
    ];
}
