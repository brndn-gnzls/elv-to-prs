export function getOverviewBlocks() {
    return [

        { type: "h2", content: "Overview" },
        {
            type: "p",
            content:
                "Buttons capture users' attention and guide them toward important actions. Used selectively, they highlight essential CTAs without overwhelming users with too many focal points.",
        },
        { type: "img", src: "img-button-overview-desktop-light-001.svg" },
        {
            type: "pItalicSmall",
            content:
                "The above examples illustrate the different button types, showcasing how each design variation serves a specific purpose and ensures consistency in user interaction.",
        },
        { type: "spacing", height: 48 },
        { type: "h3", content: "Live Demo" },
        {
            type: "p",
            content:
                "Explore the full capabilities of our button components with our advanced demo. This interactive tool lets you customize variants, states, sizes, themes, colors, icons, and text, providing instant visual feedback and code generation for seamless project integration.",
        },
        { type: "demoPlaceholder" },
        {
            type: "h3",
            content: "Implementation Tips"
        },
        {
            type: "bulletList",
            bullets: [
                {
                    boldLead: "Consistency is Key:",
                    body: "Maintain consistent use of button variants..."
                },
                {
                    boldLead: "Accessibility Matters:",
                    body: "Regularly check color contrast and ensure accessible labeling..."
                },
                {
                    boldLead: "Test Responsively:",
                    body: "Utilize the mobile viewport preview to guarantee..."
                }
            ]
        },
        { type: "spacing", height: 48 },
        { type: "hr" },
        { type: "spacing", height: 48 },
        { type: "h2", content: "Anatomy" },
        {
            type: "p",
            content:
                "Button anatomy is essential for effective interface design. Each element—icons, text labels, and background colors—enhances usability and appeal. This section provides insights into their roles and best practices.",
        },
        { type: "spacing", height: 16 },
        { type: "img", src: "img-button-anatomy-desktop-light-001.svg" },
        { type: "spacing", height: 16 },
        { type: "pBold", content: "1. Icons" },
        {
            type: "p",
            content:
                "Icons serve as visual cues that support the text label, offering a quicker recognition of the action the button performs. They can be placed either before (leading) or after (trailing) the text to enhance the button's message. When using icons:",
        },
        { type: "spacing", height: 16 },
        {
            type: "bulletList",
            bullets: [
                {
                    boldLead: "Size:",
                    body: "Icons are standardized to ensure clear visibility without overpowering the label."
                },
                {
                    boldLead: "Spacing:",
                    body: "A set space is provided between the icon and label to prevent visual clutter, keeping focus on the button's messages."
                },
                {
                    boldLead: "Placement margins:",
                    body: "Icons include preset margins within the button to maintain a balanced, touch-friendly area."
                }
            ]
        },
        { type: "spacing", height: 24 },
        { type: "pBold", content: "2. Text Label" },
        {
            type: "p",
            content:
                "The text label provides a direct indication of what action will be performed when the button is clicked. Effective text labels are key to usability:",
        },
        { type: "spacing", height: 16 },
        {
            type: "bulletList",
            bullets: [
                {
                    boldLead: "Font Family:",
                    body: "The font is specified according to the selected brand, ensuring consistency with the brand's design language."
                },
                {
                    boldLead: "Weight:",
                    body: "Labels are set in bold for prominence and readability, complementing other interface elements."
                },
                {
                    boldLead: "Size:",
                    body: "The font size is preset based on the selected button size and accessibility requirements to ensure readability across all styles."
                },
                {
                    boldLead: "Accessibility:",
                    body: "Text and background colors are carefully selected to meet AAA contrast requirements, ensuring optimal readability and accessibility for all users.."
                }
            ]
        },
        { type: "spacing", height: 24 },
        { type: "pBold", content: "3. Container" },
        {
            type: "p",
            content:
                "The button's container and corner radius are essential in distinguishing it from other interface elements and influencing user perception. Design considerations include:"
        },
        { type: "spacing", height: 16 },
        {
            type: "bulletList",
            bullets: [
                {
                    boldLead: "Color:",
                    body: "Button background colors are preset based on the selected brand, ensuring readability and accessibility while reflecting each button’s role within the color scheme."
                },
                {
                    boldLead: "Corner Radius:",
                    body: "The button style applies a brand-specific corner radius that aligns with each brand’s design language and overall system cohesion."
                },
                {
                    boldLead: "Spacing:",
                    body: "Button margins are preset to enhance visual balance and usability, ensuring sufficient clickability for all users.."
                }
            ]
        },
        { type: "spacing", height: 48 },
        { type: "hr" },
        { type: "spacing", height: 48 },
        { type: "h2", content: "Options" },
        {
            type: "p",
            content:
                "In the pursuit of providing a flexible and cohesive user interface, our design system categorizes buttons into three distinct types based on their appearance and intended use: Primary, Secondary, and Tertiary.",
        },
        { type: "spacing", height: 72 },
        {
            type: "appearanceSection",
            // an array of block objects for the 5 appearances
            appearanceData: [
                {
                    imageSrc: "img-button-options-desktop-light-001.svg",
                    heading: "Primary",
                    description: "For the principal call to action on the page. Primary buttons should only appear once per screen."
                },
                {
                    imageSrc: "img-button-options-desktop-light-002.svg",
                    heading: "Secondary",
                    description: "Utilize the secondary button to offer alternatives to the main action, or in situations where all actions hold equal importance."
                },
                {
                    imageSrc: "img-button-options-desktop-light-003.svg",
                    heading: "Tertiary / White",
                    description: "Employ the tertiary button for actions of lesser importance that offer convenience."
                },
                {
                    imageSrc: "img-button-options-desktop-light-004.svg",
                    heading: "Ghost",
                    description: "Use the ghost button for secondary actions on colored backgrounds."
                },
                {
                    imageSrc: "img-button-options-desktop-light-004b.svg",
                    heading: "Two Line",
                    description: "A two-line button enables quick input changes with distinct actions."
                }
            ]
        },
        { type: "spacing", height: 28 },
        {
            type: "statesSection",
            heading: "Button States",
            introParagraph:
                "Defining the visual and interactive variations of buttons, encompassing default, hover, focus, press, and disabled states to ensure consistent and intuitive user experiences.",
            leftImages: [
                "img-button-options-desktop-light-005.svg",
                "img-button-options-desktop-light-006.svg",
                "img-button-options-desktop-light-007.svg",
                "img-button-options-desktop-light-008.svg",
                "img-button-options-desktop-light-009.svg"
            ],
            rightStates: [
                {
                    boldTitle: "Default",
                    paragraph:
                        "The default state presents distinct features for each button type, improving visibility and helping users recognize them as interactive elements."
                },
                {
                    boldTitle: "Hover",
                    paragraph:
                        "The hover state activates when the cursor is over the button, providing visual feedback that it is clickable."
                },
                {
                    boldTitle: "Focus",
                    paragraph:
                        "The focus state activates when the button receives focus, providing a visual cue to indicate it is selectable."
                },
                {
                    boldTitle: "Press",
                    paragraph:
                        "The focus state activates when the button receives focus, providing a visual cue to indicate it is selectable."
                },
                {
                    boldTitle: "Disabled",
                    paragraph:
                        "The disabled state indicates when an action is unavailable. Buttons appear faded, showing no response to hover or click interactions."
                }
            ]
        },
        {
            type: "sizeSection",
            heading: "Size",
            introParagraph: "Understanding the appropriate usage of button sizes within an interface is crucial for maintaining hierarchy, ensuring accessibility, and enhancing user experience. Our design system provides four distinct sizes for buttons: Large, Medium, Small, and Extra Small.",
            imageSrc: "img-button-options-desktop-light-010.svg",
            italicParagraph: "Each size is designed to accommodate different screen sizes, contexts, and user needs, ensuring a versatile and adaptable component library.",
            tableHead: ["Size", "Description", ""],
            tableRows: [
                {
                    size: "Large",
                    description: "Large buttons are designed for high-priority actions that require prominence." +
                        "",
                    metrics: "Height: 44px\nFont Size: 14px\nInternal Padding: 48px"
                },
                {
                    size: "Small",
                    description: "Small buttons are used when space is limited / actions that are less prioritized.",
                    metrics: "Height: 30px\nFont Size: 12px\nInternal Padding: 30px"
                }
            ]
        },
        {
            type: "iconSection",
            heading: "Icon",
            introParagraph:
                "Icons in buttons enhance intuitiveness and appeal. Our design system allows leading and trailing icons, used independently for flexibility or together for richer interactions.",
            leftImageSrc: "img-button-options-desktop-light-011.svg",
            leftBoldTitle: "Leading Icon",
            leftParagraph:
                "Leading icons are positioned before the text label in a button, effectively highlighting its purpose and aiding quick recognition.",
            rightImageSrc: "img-button-options-desktop-light-012.svg",
            rightBoldTitle: "External Link / Trailing Icon",
            rightParagraph:
                "Trailing icons appear after the text label to denote an external link only"
        },
        { type: "pBold", content: "Implementation Considerations" },
        {
            type: "p",
            content:
                "By thoughtfully integrating icons into buttons, designers can leverage visual cues to enhance user understanding and engagement, enriching the user experience while maintaining a clean and coherent interface design.",
        },
        { type: "spacing", height: 16 },
        {
            type: "bulletList",
            bullets: [
                {
                    boldLead: "Consistency:",
                    body: "Use icons consistently across similar buttons to establish a recognizable pattern for users."
                },
                {
                    boldLead: "Accessibility:",
                    body: "Provide alternative text descriptions for icons to ensure that their purpose is communicated to users relying on screen readers."
                },
                {
                    boldLead: "Visual Balance:",
                    body: "Whether using leading, trailing, or combined icons, maintain a harmonious visual balance within the button to ensure that the text and icons are easily distinguishable and aesthetically pleasing."
                }
            ]
        },
        { type: "spacing", height: 48 },
        { type: "hr" },
        { type: "spacing", height: 48 },
        {
            type: "metricsSection",
            heading: "Metrics",
            introParagraph:
                "Metrics are vital for ensuring consistency, usability, and visual harmony in user interfaces." +
                "They define dimensions and spacing guidelines, including height, width, padding, and font size." +
                "Adhering to these guidelines ensures elements are aesthetically pleasing accessible, and functional across devices, creating a cohesive user experience.",
            row1Left: {
                imageSrc: "img-button-metrics-desktop-light-001.svg",
                boldTitle: "Large Button",
                description: "Large buttons are designed for primary actions requiring prominence and ease of interaction, especially on larger touch targets.",
                topSpacing: 24,  // space before bullet list
                bulletList: [
                    "Height: 45px",
                    "Width: Minimum 130px",
                    "Padding: 48px ↔; 11.5px ↕",
                    "Font Size: 14px"
                ],
                postBulletParagraph: "Large buttons are best used for key actions such as primary call-to-actions on landing pages, forms and modal dialogs."
            },
            row1Right: {
                imageSrc: "img-button-metrics-desktop-light-002.svg",
                boldTitle: "Small Button",
                description: "Small buttons are utilized for actions that are secondary or when space is limited, fitting neatly into compact areas.",
                topSpacing: 16,
                bulletList: [
                    "Height: 30px",
                    "Width: Minimum 80px",
                    "Padding: 30px ↔; 8px ↕",
                    "Font Size: 14px"
                ],
                postBulletParagraph: "Use small buttons for actions within lists, toolbars, or as secondary actions."
            },
            row2Left: {
                imageSrc: "g",
                boldTitle: "Large Button With Icon",
                description: "Large buttons with icons are designed for primary actions requiring prominence and ease of interaction.",
                topSpacing: 16,
                bulletList: [
                    "Padding: 48px ↔; 12px ↕",
                    "Icon Size: 20x20px, 8px spacing from text"
                ]
            },
            row2Right: {
                imageSrc: "img-button-metrics-desktop-light-004.svg",
                boldTitle: "Small Button With Icon",
                description: "Small buttons with icons are ideal for secondary actions or when space is limited, providing a compact solution.",
                topSpacing: 16,
                bulletList: [
                    "Padding: 30px ↔; 8px ↕",
                    "Icon Size: 16x16px, 4px spacing from text"
                ],
            }
        },
        { type: "hr" },
        { type: "spacing", height: 48 },
        {
            type: "bestPracticesSection",
            heading: "Best Practices",
            introParagraph:
                "Ensuring that buttons are effective in guiding user actions requires attention to detail in both desgin and implementation. Below are paired \"Do\" and \"Don't\" best practices, each addressing a specific aspect of button usage to help illustrate optimal and suboptimal practices.",
            doItems: [
                {
                    title: "Use Clear and Concise Labeling",
                    color: "#007032",
                    symbol: "✓",
                    paragraph: "Do use actionable, precise language that clearly describes the button's function.",
                    imageSrc: "img-button-best-practices-desktop-light-001.svg"
                },
                {
                    title: "Maintain Hierarchical Consistency",
                    color: "#007032",
                    symbol: "✓",
                    paragraph: "Do use button variants for visual hierarchies, reserve primary buttons for main actions.",
                    imageSrc: "img-button-best-practices-desktop-light-003.svg"
                },
                {
                    title: "Ensure Accessibility",
                    color: "#007032",
                    symbol: "✓",
                    paragraph: "Do design with adequate contrast and accessible labels, employing ARIA attributes where needed.",
                    imageSrc: "img-button-best-practices-desktop-light-005.svg"
                }
            ],
            dontItems: [
                {
                    title: "Avoid Using Vague or Long Labeling",
                    color: "#BF1722",
                    symbol: "✗",
                    paragraph: "Don't use ambiguous terms or lengthy descriptions that confuse users.",
                    imageSrc: "img-button-best-practices-desktop-light-002.svg"
                },
                {
                    title: "Avoid Multiple Primary Buttons",
                    color: "#BF1722",
                    symbol: "✗",
                    paragraph: "Don't clutter your interface with multiple primary buttons that dilute focus.",
                    imageSrc: "img-button-best-practices-desktop-light-004.svg"
                },
                {
                    title: "Avoid Unexplained Disabled Buttons",
                    color: "#BF1722",
                    symbol: "✗",
                    paragraph: "Don't use disabled buttons without explanation, this leads to user confusion.",
                    imageSrc: "img-button-best-practices-desktop-light-006.svg"
                }
            ]
        },
        { type: "spacing", height: 48 },
        { type: "hr" },
        { type: "spacing", height: 72 },
        { type: "gettingHelpInternal" },
        { type: "spacing", height: 92 },
    ];
}