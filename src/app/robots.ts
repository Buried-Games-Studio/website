import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // No '?s=' rule here: the proxy 308-redirects ?s= URLs to the
                // clean path, and Googlebot must be allowed to fetch them to see
                // that redirect and consolidate. Never block /_next/ — Google
                // needs page resources (fonts, CSS) to render and index pages.
                disallow: ['/private/', '/*.php', '/*.asp'],
            },
            {
                // AI/LLM crawlers are explicitly invited: being citable in
                // AI answers is a discovery channel for a GCC games studio.
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'OAI-SearchBot',
                    'ClaudeBot',
                    'Claude-SearchBot',
                    'Claude-User',
                    'PerplexityBot',
                    'Perplexity-User',
                    'Google-Extended',
                    'Applebot-Extended',
                    'meta-externalagent',
                ],
                allow: '/',
            },
        ],
        sitemap: 'https://buriedgames.com/sitemap.xml',
    };
}
