import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arts.by Paul-Ray-vibes',
    short_name: 'ArtsByPaulRay',
    description: 'Professional creative photographer specializing in lifestyle, events, and portraits.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#d97706',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
