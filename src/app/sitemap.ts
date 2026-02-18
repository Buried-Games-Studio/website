
import { type MetadataRoute } from 'next';
import { gamesContent } from '@/lib/content/games';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://buriedgames.com';
  const lastModified = new Date('2026-02-18');

  const gameUrls = gamesContent.map((game) => {
    return {
      url: `${baseUrl}/games/${game.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/games`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/devlog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...gameUrls,
  ];
}
