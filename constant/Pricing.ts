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
    includes?: string[];
    href?: string
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
                serviceName: "Hero Section Design / Develop",
                description: "Creating your hero section to be more conversion-friendly, visually engaging, and impactful.",
                deliveryTime: "15 Days Delivery",
                urgentDelivery: "Urgent delivery (3 days)",
                price: 99,
                requirements: [
                    "Screenshots or Link of the Website Hero",
                    "A little brief of what you are expecting"
                ],
                deliverables: [
                    "Figma File of Hero Section or",
                    "Figma to Code conversion (HTML/CSS/JS)"
                ],
                href: "https://cal.com/vinod-kr/15min"
            },
            {
                id: 2,
                title: "Landing Page",
                serviceName: "Landing Page Design / Develop",
                description: "A full-service design or development solution to create a powerful user experience, drive conversions, and bring your brand vision to life.",
                deliveryTime: "15 Days Delivery",
                urgentDelivery: "Urgent delivery (5 days)",
                price: 149,
                requirements: [
                    "Website Link",
                    "A little brief of what you are expecting"
                ],
                deliverables: [
                    "Figma File of Revamped Landing Page or",
                    "Figma to Code conversion (HTML/CSS/JS)"
                ]
            },
            {
                id: 3,
                title: "Custom Apps",
                serviceName: "Custom Apps Design/Develop",
                description: "Creating your app or website screens for a seamless, modern, and user-friendly experience.",
                deliveryTime: "30 Days Delivery",
                urgentDelivery: "Urgent delivery (5 days)",
                price: null, // Contact for pricing
                requirements: [
                    "Screenshots or Figma File containing screens",
                    "A little brief of what you are expecting"
                ],
                deliverables: [
                    "Figma File of design screens",
                    "Figma to Code conversion (React/JS components)",
                    "Cohesive Design System"
                ]
            },
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

