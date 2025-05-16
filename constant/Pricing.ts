interface Service {
    id: number;
    title: string;
    serviceName: string;
    description: string;
    deliveryTime: string;
    urgentDelivery: string;
    price: number | string | null;
    requirements: string[];
    deliverables: string[];
    includes?: string[]; // Optional for packages
}

interface ServiceCategory {
    name: string;
    services: Service[];
}

interface DesignServices {
    coreServices: ServiceCategory;
    additionalServices: ServiceCategory;
}

export const designServices: DesignServices = {
    coreServices: {
        name: "Core Design Services",
        services: [
            {
                id: 1,
                title: "Hero Section",
                serviceName: "Hero Section Revamp",
                description: "Redesigning your hero section to be more conversion-friendly, visually engaging, and impactful.",
                deliveryTime: "15 Days Delivery",
                urgentDelivery: "Urgent delivery (3 days)",
                price: 229,
                requirements: [
                    "Screenshots or Link of the Website Hero",
                    "A little brief of what you are expecting"
                ],
                deliverables: [
                    "Figma file of Revamped Hero Section",
                    "Figma to Code conversion (HTML/CSS/JS)"
                ]
            },
            {
                id: 2,
                title: "Landing Page",
                serviceName: "Landing Page Revamp",
                description: "A complete redesign to enhance user experience, boost conversions, and align with your brand goals.",
                deliveryTime: "15 Days Delivery",
                urgentDelivery: "Urgent delivery (5 days)",
                price: 689,
                requirements: [
                    "Website Link",
                    "A little brief of what you are expecting"
                ],
                deliverables: [
                    "Figma file of Revamped Landing Page",
                    "Figma to Code conversion (HTML/CSS/JS)"
                ]
            },
            {
                id: 3,
                title: "App/Dashboard Screens",
                serviceName: "App/Dashboard Screens Revamp",
                description: "Redesigning your app or website screens for a seamless, modern, and user-friendly experience.",
                deliveryTime: "15 Days Delivery",
                urgentDelivery: "Urgent delivery (5 days)",
                price: null, // Contact for pricing
                requirements: [
                    "Screenshots or Figma file containing screens",
                    "A little brief of what you are expecting"
                ],
                deliverables: [
                    "Figma file of Revamped screens",
                    "Figma to Code conversion (React/JS components)",
                    "Cohesive Design System"
                ]
            },
            {
                id: 4,
                title: "Pitch Deck",
                serviceName: "Pitch Deck Design",
                description: "Creating an impactful pitch deck that effectively communicates your business value proposition.",
                deliveryTime: "15 Days Delivery",
                urgentDelivery: "Urgent delivery (5 days)",
                price: null, // Contact for pricing
                requirements: [
                    "Content for the pitch deck",
                    "Brand guidelines (if available)"
                ],
                deliverables: [
                    "Editable presentation file (PPT/Keynote/Figma)",
                    "PDF version",
                    "Figma source files"
                ]
            }
        ]
    },
    additionalServices: {
        name: "Additional Services",
        services: [
            {
                id: 5,
                title: "Figma to Code",
                serviceName: "Figma to Code Conversion",
                description: "Convert your Figma designs into clean, responsive HTML/CSS/JS or React components.",
                deliveryTime: "Varies by project size",
                urgentDelivery: "Urgent delivery available",
                price: "Starting from $299",
                requirements: [
                    "Figma design file",
                    "Design specifications"
                ],
                deliverables: [
                    "Production-ready code",
                    "Responsive implementation",
                    "Documentation"
                ]
            },
            {
                id: 6,
                title: "Full Website Development",
                serviceName: "Complete Website Development",
                description: "Complete website development including design, coding, and basic SEO setup.",
                deliveryTime: "30 Days Delivery",
                urgentDelivery: "Urgent delivery (10 days)",
                price: "Starting from $999",
                requirements: [
                    "Project requirements",
                    "Content assets",
                    "Brand guidelines"
                ],
                deliverables: [
                    "Figma design files",
                    "Fully coded website",
                    "Hosting setup assistance",
                    "Basic SEO configuration"
                ]
            },
            {
                id: 7,
                title: "Website Hosting Setup",
                serviceName: "Hosting Configuration",
                description: "Professional hosting configuration and deployment for your website.",
                deliveryTime: "2 Days Delivery",
                urgentDelivery: "Same day delivery available",
                price: "$99 setup + hosting fees",
                requirements: [
                    "Website files",
                    "Domain information"
                ],
                deliverables: [
                    "Hosting configuration",
                    "DNS setup",
                    "SSL certificate installation",
                    "Deployment"
                ]
            },
            {
                id: 8,
                title: "Comprehensive Package",
                serviceName: "End-to-End Solution",
                description: "Complete package including design, development, and hosting setup.",
                deliveryTime: "45 Days Delivery",
                urgentDelivery: "Urgent delivery (20 days)",
                price: "Starting from $1,899",
                requirements: [
                    "Project brief",
                    "Content assets",
                    "Brand guidelines"
                ],
                deliverables: [
                    "Figma design files",
                    "Fully coded website",
                    "Hosting configuration",
                    "Basic SEO setup",
                    "1 month maintenance",
                    "Figma to Code implementation"
                ],
                includes: [
                    "Design",
                    "Development",
                    "Hosting Setup",
                    "Basic SEO",
                    "Maintenance"
                ]
            }
        ]
    }
};

