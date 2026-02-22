export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Onkar's Personal Site",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "About",
            href: "/about",
        },
        {
            label: "Open Source",
            href: "/open-source",
        },
        {
            label: "Resume",
            href: "/resume",
        },
        {
            label: "Contact Me",
            href: "/contact-me",
        },
    ],
    navMenuItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "About",
            href: "/about",
        },
        {
            label: "Open Source",
            href: "/open-source",
        },
        {
            label: "Resume",
            href: "/resume",
        },
        {
            label: "Contact Me",
            href: "/contact-me",
        },
    ],
    links: {
        github: "https://github.com/heroui-inc/heroui",
        twitter: "https://twitter.com/hero_ui",
        docs: "https://heroui.com",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
};