import type { Theme } from '../types';

// Comic-style SVG card generator with halftone patterns, bold outlines, and vibrant colors
const createComicCard = (symbol: string, label: string, colors: { bg1: string; bg2: string; accent: string }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="bg-${label}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors.bg1}"/>
          <stop offset="100%" stop-color="${colors.bg2}"/>
        </linearGradient>
        <pattern id="dots-${label}" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" fill="rgba(0,0,0,0.15)"/>
        </pattern>
        <filter id="shadow-${label}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="0" flood-color="#000" flood-opacity="1"/>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="200" height="200" rx="16" fill="url(#bg-${label})"/>
      
      <!-- Halftone overlay -->
      <rect width="200" height="200" rx="16" fill="url(#dots-${label})"/>
      
      <!-- Inner border -->
      <rect x="8" y="8" width="184" height="184" rx="12" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      
      <!-- Symbol background burst -->
      <circle cx="100" cy="95" r="55" fill="${colors.accent}" opacity="0.3"/>
      
      <!-- Main symbol -->
      <text x="100" y="115" text-anchor="middle" font-size="72" font-family="Arial Black, sans-serif" fill="white" filter="url(#shadow-${label})">${symbol}</text>
      
      <!-- Label banner -->
      <rect x="20" y="155" width="160" height="32" rx="6" fill="#000" opacity="0.7"/>
      <text x="100" y="177" text-anchor="middle" font-size="14" font-family="Arial Black, sans-serif" fill="white" letter-spacing="1">${label.toUpperCase()}</text>
      
      <!-- Corner accents -->
      <polygon points="0,0 30,0 0,30" fill="${colors.accent}" opacity="0.5"/>
      <polygon points="200,200 170,200 200,170" fill="${colors.accent}" opacity="0.5"/>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// Preview card with multiple symbols
const createPreview = (symbols: string[], themeName: string, colors: { bg1: string; bg2: string; accent: string }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="pbg-${themeName}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors.bg1}"/>
          <stop offset="100%" stop-color="${colors.bg2}"/>
        </linearGradient>
        <pattern id="pdots-${themeName}" patternUnits="userSpaceOnUse" width="10" height="10">
          <circle cx="5" cy="5" r="2" fill="rgba(0,0,0,0.1)"/>
        </pattern>
      </defs>
      
      <rect width="400" height="300" rx="20" fill="url(#pbg-${themeName})"/>
      <rect width="400" height="300" rx="20" fill="url(#pdots-${themeName})"/>
      
      <!-- Theme title -->
      <text x="200" y="50" text-anchor="middle" font-size="28" font-family="Arial Black" fill="white" letter-spacing="2">${themeName.toUpperCase()}</text>
      
      <!-- Card previews -->
      ${symbols.slice(0, 4).map((s, i) => `
        <g transform="translate(${55 + i * 80}, 80)">
          <rect width="60" height="75" rx="8" fill="rgba(255,255,255,0.2)" stroke="#000" stroke-width="3"/>
          <text x="30" y="52" text-anchor="middle" font-size="36">${s}</text>
        </g>
      `).join('')}
      
      <!-- Bottom label -->
      <rect x="100" y="260" width="200" height="30" rx="15" fill="#000" opacity="0.6"/>
      <text x="200" y="281" text-anchor="middle" font-size="12" font-family="Arial" fill="white">8 UNIQUE CARDS • 16 TOTAL</text>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// Classic theme - Playing cards
const classicColors = { bg1: '#8B5CF6', bg2: '#7C3AED', accent: '#DDD6FE' };
const classicSymbols = ['♠', '♥', '♦', '♣', '★', '♛', '⚡', '☆'];
const classicLabels = ['SPADE', 'HEART', 'DIAMOND', 'CLUB', 'STAR', 'QUEEN', 'BOLT', 'SHINE'];

// Animals theme
const animalsColors = { bg1: '#22C55E', bg2: '#16A34A', accent: '#BBF7D0' };
const animalsSymbols = ['🦁', '🐼', '🦊', '🐸', '🦋', '🐙', '🦜', '🐨'];
const animalsLabels = ['LION', 'PANDA', 'FOX', 'FROG', 'BUTTERFLY', 'OCTOPUS', 'PARROT', 'KOALA'];

// Food theme
const foodColors = { bg1: '#F97316', bg2: '#EA580C', accent: '#FED7AA' };
const foodSymbols = ['🍕', '🍔', '🍦', '🍩', '🍣', '🌮', '🍪', '🧁'];
const foodLabels = ['PIZZA', 'BURGER', 'ICE CREAM', 'DONUT', 'SUSHI', 'TACO', 'COOKIE', 'CUPCAKE'];

// Anime theme
const animeColors = { bg1: '#EC4899', bg2: '#DB2777', accent: '#FBCFE8' };
const animeSymbols = ['⛩', '🌸', '🎌', '🗻', '🎎', '🍱', '🎐', '🏯'];
const animeLabels = ['SHRINE', 'SAKURA', 'FLAG', 'FUJI', 'DOLLS', 'BENTO', 'CHIME', 'CASTLE'];

// Tech theme
const techColors = { bg1: '#3B82F6', bg2: '#2563EB', accent: '#BFDBFE' };
const techSymbols = ['💻', '📱', '🎮', '🎧', '💡', '🚀', '⚡', '🔮'];
const techLabels = ['LAPTOP', 'PHONE', 'GAMING', 'AUDIO', 'IDEA', 'ROCKET', 'POWER', 'MAGIC'];

export const themes: Theme[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional playing card symbols - Perfect for all ages!',
    previewImage: createPreview(classicSymbols, 'Classic', classicColors),
    cardImages: classicSymbols.map((s, i) => createComicCard(s, classicLabels[i], classicColors)),
    isPremium: false,
  },
  {
    id: 'animals',
    name: 'Animals',
    description: 'Cute and wild animals from around the world!',
    previewImage: createPreview(animalsSymbols, 'Animals', animalsColors),
    cardImages: animalsSymbols.map((s, i) => createComicCard(s, animalsLabels[i], animalsColors)),
    isPremium: true,
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Delicious treats that will make you hungry!',
    previewImage: createPreview(foodSymbols, 'Food', foodColors),
    cardImages: foodSymbols.map((s, i) => createComicCard(s, foodLabels[i], foodColors)),
    isPremium: true,
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese culture and kawaii vibes!',
    previewImage: createPreview(animeSymbols, 'Anime', animeColors),
    cardImages: animeSymbols.map((s, i) => createComicCard(s, animeLabels[i], animeColors)),
    isPremium: true,
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern technology and digital icons!',
    previewImage: createPreview(techSymbols, 'Tech', techColors),
    cardImages: techSymbols.map((s, i) => createComicCard(s, techLabels[i], techColors)),
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
