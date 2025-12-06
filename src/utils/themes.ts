import type { Theme } from '../types';

// Theme definitions with copyright-free placeholder images
// Using emoji-based SVGs that work without external dependencies

// Helper to create colorful emoji card SVGs
const createEmojiCard = (emoji: string, bgGradient: string) => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          ${bgGradient}
        </linearGradient>
      </defs>
      <rect fill="url(#bg)" width="200" height="200" rx="20"/>
      <text x="100" y="115" text-anchor="middle" font-size="80">${emoji}</text>
    </svg>
  `)}`;
};

// Classic theme - playing card symbols
const classicGradient = '<stop offset="0%" stop-color="#8B5CF6"/><stop offset="100%" stop-color="#EC4899"/>';
const classicCards = ['♠️', '♥️', '♣️', '♦️', '🃏', '👑', '⭐', '🎴'];

// Animals theme - cute animals
const animalsGradient = '<stop offset="0%" stop-color="#22C55E"/><stop offset="100%" stop-color="#16A34A"/>';
const animalCards = ['🦁', '🐼', '🦊', '🐸', '🦋', '🐙', '🦜', '🐨'];

// Food theme - delicious food
const foodGradient = '<stop offset="0%" stop-color="#F97316"/><stop offset="100%" stop-color="#EF4444"/>';
const foodCards = ['🍕', '🍔', '🍦', '🍩', '🍣', '🌮', '🍪', '🧁'];

// Anime theme - Japanese culture
const animeGradient = '<stop offset="0%" stop-color="#EC4899"/><stop offset="100%" stop-color="#8B5CF6"/>';
const animeCards = ['⛩️', '🌸', '🎌', '🗾', '🎎', '🍱', '🎐', '🏯'];

// Logos theme - tech/brand inspired
const logosGradient = '<stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#06B6D4"/>';
const logosCards = ['💻', '📱', '🎮', '🎧', '💡', '🚀', '⚡', '🔮'];

// Theme preview gradients
const createPreview = (emoji: string, gradient: string) => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          ${gradient}
        </linearGradient>
      </defs>
      <rect fill="url(#bg)" width="400" height="300" rx="20"/>
      <text x="200" y="100" text-anchor="middle" font-size="60">${emoji}</text>
      <text x="200" y="170" text-anchor="middle" fill="white" font-size="40" font-family="Arial Black" opacity="0.9">${emoji === '🃏' ? 'CLASSIC' : emoji === '🦁' ? 'ANIMALS' : emoji === '🍕' ? 'FOOD' : emoji === '🌸' ? 'ANIME' : 'LOGOS'}</text>
      <text x="200" y="250" text-anchor="middle" font-size="30">🎴 🎴 🎴 🎴</text>
    </svg>
  `)}`;
};

export const themes: Theme[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional playing card symbols - Perfect for beginners!',
    previewImage: createPreview('🃏', classicGradient),
    cardImages: classicCards.map(emoji => createEmojiCard(emoji, classicGradient)),
    isPremium: false,
  },
  {
    id: 'animals',
    name: 'Animals',
    description: 'Cute and wild animals from around the world! 🌍',
    previewImage: createPreview('🦁', animalsGradient),
    cardImages: animalCards.map(emoji => createEmojiCard(emoji, animalsGradient)),
    isPremium: true,
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Delicious treats that will make you hungry! 😋',
    previewImage: createPreview('🍕', foodGradient),
    cardImages: foodCards.map(emoji => createEmojiCard(emoji, foodGradient)),
    isPremium: true,
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese culture and kawaii vibes! ✨',
    previewImage: createPreview('🌸', animeGradient),
    cardImages: animeCards.map(emoji => createEmojiCard(emoji, animeGradient)),
    isPremium: true,
  },
  {
    id: 'logos',
    name: 'Tech',
    description: 'Modern tech and digital icons! 🚀',
    previewImage: createPreview('💻', logosGradient),
    cardImages: logosCards.map(emoji => createEmojiCard(emoji, logosGradient)),
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
