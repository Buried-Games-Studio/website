
import {
  Youtube,
  Instagram,
  Facebook,
  Twitch,
  Linkedin,
  Github,
} from 'lucide-react';
import TikTokIcon from '../icons/tiktok';
import DiscordIcon from '../icons/discord';
import { socialProfiles } from '@/lib/social';

// Profiles live in src/lib/social.ts (shared with Organization.sameAs); this
// file only maps each platform to its icon. "whatsapp" stays a string key —
// consumers render the brand-coloured WhatsAppIcon for it.
const icons: Record<string, React.ElementType | 'whatsapp'> = {
  YouTube: Youtube,
  Instagram: Instagram,
  TikTok: TikTokIcon,
  Facebook: Facebook,
  WhatsApp: 'whatsapp',
  Discord: DiscordIcon,
  Twitch: Twitch,
  LinkedIn: Linkedin,
  GitHub: Github,
};

export const socialLinks = socialProfiles.map((profile) => ({
  href: profile.footerHref ?? profile.url,
  icon: icons[profile.label] ?? Github,
  label: profile.label,
}));
