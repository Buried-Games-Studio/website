import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/_next/static/media/'],
        },
        sitemap: 'https://buriedgames.com/sitemap.xml',
    };
}
