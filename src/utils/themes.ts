import type { Theme } from '../types';

// Theme definitions with placeholder images
// Replace these image paths with your actual assets later

export const themes: Theme[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional memory card patterns',
    previewImage: '/themes/classic/preview.png',
    cardImages: [
      '/themes/classic/card-1.png',
      '/themes/classic/card-2.png',
      '/themes/classic/card-3.png',
      '/themes/classic/card-4.png',
      '/themes/classic/card-5.png',
      '/themes/classic/card-6.png',
      '/themes/classic/card-7.png',
      '/themes/classic/card-8.png',
    ],
    isPremium: false,
  },
  {
    id: 'animals',
    name: 'Animals',
    description: 'Cute and wild animals from around the world',
    previewImage: '/themes/animals/preview.png',
    cardImages: [
      '/themes/animals/card-1.png',
      '/themes/animals/card-2.png',
      '/themes/animals/card-3.png',
      '/themes/animals/card-4.png',
      '/themes/animals/card-5.png',
      '/themes/animals/card-6.png',
      '/themes/animals/card-7.png',
      '/themes/animals/card-8.png',
    ],
    isPremium: true,
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Delicious food from various cuisines',
    previewImage: '/themes/food/preview.png',
    cardImages: [
      '/themes/food/card-1.png',
      '/themes/food/card-2.png',
      '/themes/food/card-3.png',
      '/themes/food/card-4.png',
      '/themes/food/card-5.png',
      '/themes/food/card-6.png',
      '/themes/food/card-7.png',
      '/themes/food/card-8.png',
    ],
    isPremium: true,
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Popular anime characters and scenes',
    previewImage: '/themes/anime/preview.png',
    cardImages: [
      '/themes/anime/card-1.png',
      '/themes/anime/card-2.png',
      '/themes/anime/card-3.png',
      '/themes/anime/card-4.png',
      '/themes/anime/card-5.png',
      '/themes/anime/card-6.png',
      '/themes/anime/card-7.png',
      '/themes/anime/card-8.png',
    ],
    isPremium: true,
  },
  {
    id: 'logos',
    name: 'Logos',
    description: 'Famous brand logos and icons',
    previewImage: '/themes/logos/preview.png',
    cardImages: [
      '/themes/logos/card-1.png',
      '/themes/logos/card-2.png',
      '/themes/logos/card-3.png',
      '/themes/logos/card-4.png',
      '/themes/logos/card-5.png',
      '/themes/logos/card-6.png',
      '/themes/logos/card-7.png',
      '/themes/logos/card-8.png',
    ],
    isPremium: true,
  },
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find((theme) => theme.id === id);
}

export function getFreeThemes(): Theme[] {
  return themes.filter((theme) => !theme.isPremium);
}

export function getPremiumThemes(): Theme[] {
  return themes.filter((theme) => theme.isPremium);
}
