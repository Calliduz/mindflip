import type { Theme } from '../types';

// Vibrant color palettes for each theme
const palettes = {
  classic: {
    colors: ['#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#FBBF24', '#22C55E', '#06B6D4', '#3B82F6'],
    accent: '#FFE135',
  },
  animals: {
    colors: ['#22C55E', '#16A34A', '#84CC16', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#6366F1'],
    accent: '#BBF7D0',
  },
  food: {
    colors: ['#F97316', '#EF4444', '#F59E0B', '#EC4899', '#8B5CF6', '#22C55E', '#06B6D4', '#E11D48'],
    accent: '#FED7AA',
  },
  anime: {
    colors: ['#EC4899', '#F472B6', '#A855F7', '#8B5CF6', '#6366F1', '#0EA5E9', '#14B8A6', '#F43F5E'],
    accent: '#FBCFE8',
  },
  tech: {
    colors: ['#3B82F6', '#6366F1', '#8B5CF6', '#06B6D4', '#0EA5E9', '#10B981', '#22C55E', '#F97316'],
    accent: '#BFDBFE',
  },
};

// Create colorful comic-style card with branding
const createVibrantCard = (
  symbol: string,
  label: string,
  bgColor: string,
  symbolColor: string,
  accentColor: string
) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <!-- Gradient background -->
        <linearGradient id="bg-${label.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgColor}"/>
          <stop offset="100%" stop-color="${adjustColor(bgColor, -30)}"/>
        </linearGradient>
        
        <!-- Halftone pattern -->
        <pattern id="halftone-${label.replace(/\s/g, '')}" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="3" cy="3" r="1.2" fill="rgba(0,0,0,0.12)"/>
        </pattern>
        
        <!-- Starburst -->
        <pattern id="burst-${label.replace(/\s/g, '')}" patternUnits="userSpaceOnUse" width="40" height="40">
          <polygon points="20,0 22,15 35,10 24,20 35,30 22,25 20,40 18,25 5,30 16,20 5,10 18,15" fill="rgba(255,255,255,0.08)"/>
        </pattern>
      </defs>
      
      <!-- Main background -->
      <rect width="200" height="200" rx="16" fill="url(#bg-${label.replace(/\s/g, '')})"/>
      
      <!-- Starburst pattern -->
      <rect width="200" height="200" rx="16" fill="url(#burst-${label.replace(/\s/g, '')})"/>
      
      <!-- Halftone overlay -->
      <rect width="200" height="200" rx="16" fill="url(#halftone-${label.replace(/\s/g, '')})"/>
      
      <!-- Decorative circles -->
      <circle cx="30" cy="30" r="25" fill="${accentColor}" opacity="0.15"/>
      <circle cx="170" cy="170" r="30" fill="${accentColor}" opacity="0.15"/>
      
      <!-- Inner decorative frame -->
      <rect x="10" y="10" width="180" height="180" rx="12" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-dasharray="8 4"/>
      
      <!-- Symbol glow -->
      <ellipse cx="100" cy="85" rx="50" ry="45" fill="${symbolColor}" opacity="0.2"/>
      
      <!-- Main symbol with shadow -->
      <text x="104" y="108" text-anchor="middle" font-size="70" font-family="Arial Black, sans-serif" fill="rgba(0,0,0,0.3)">${symbol}</text>
      <text x="100" y="105" text-anchor="middle" font-size="70" font-family="Arial Black, sans-serif" fill="${symbolColor}">${symbol}</text>
      
      <!-- Label banner -->
      <rect x="15" y="148" width="170" height="38" rx="8" fill="rgba(0,0,0,0.75)"/>
      <rect x="15" y="148" width="170" height="38" rx="8" fill="none" stroke="${accentColor}" stroke-width="2"/>
      <text x="100" y="173" text-anchor="middle" font-size="14" font-family="Arial Black, sans-serif" fill="white" letter-spacing="2">${label.toUpperCase()}</text>
      
      <!-- MindFlip branding -->
      <rect x="60" y="5" width="80" height="18" rx="9" fill="rgba(0,0,0,0.6)"/>
      <text x="100" y="17" text-anchor="middle" font-size="8" font-family="Arial Black" fill="${accentColor}" letter-spacing="1">🧠 MINDFLIP</text>
      
      <!-- Corner decorations -->
      <polygon points="0,0 25,0 0,25" fill="${accentColor}" opacity="0.4"/>
      <polygon points="200,200 175,200 200,175" fill="${accentColor}" opacity="0.4"/>
      <polygon points="200,0 175,0 200,25" fill="${symbolColor}" opacity="0.3"/>
      <polygon points="0,200 25,200 0,175" fill="${symbolColor}" opacity="0.3"/>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// Helper to darken/lighten colors
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Preview card generator
const createPreview = (symbols: string[], themeName: string, colors: string[], accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="pbg-${themeName}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>
        <pattern id="pdots-${themeName}" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" fill="rgba(0,0,0,0.1)"/>
        </pattern>
      </defs>
      
      <rect width="400" height="300" rx="20" fill="url(#pbg-${themeName})"/>
      <rect width="400" height="300" rx="20" fill="url(#pdots-${themeName})"/>
      
      <!-- Branding -->
      <rect x="125" y="12" width="150" height="24" rx="12" fill="rgba(0,0,0,0.5)"/>
      <text x="200" y="29" text-anchor="middle" font-size="11" font-family="Arial Black" fill="${accent}" letter-spacing="1">🧠 MINDFLIP</text>
      
      <!-- Theme title -->
      <text x="200" y="70" text-anchor="middle" font-size="32" font-family="Arial Black" fill="white" letter-spacing="3">${themeName.toUpperCase()}</text>
      
      <!-- Card previews -->
      ${symbols.slice(0, 4).map((s, i) => `
        <g transform="translate(${50 + i * 82}, 90)">
          <rect width="70" height="90" rx="10" fill="${colors[i % colors.length]}" stroke="#000" stroke-width="3"/>
          <rect width="70" height="90" rx="10" fill="url(#pdots-${themeName})" opacity="0.5"/>
          <text x="35" y="60" text-anchor="middle" font-size="40">${s}</text>
        </g>
      `).join('')}
      
      <!-- Info banner -->
      <rect x="80" y="255" width="240" height="32" rx="16" fill="rgba(0,0,0,0.6)"/>
      <text x="200" y="276" text-anchor="middle" font-size="12" font-family="Arial" fill="white" letter-spacing="1">8 UNIQUE CARDS • COMIC STYLE</text>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// Theme data
const classicSymbols = ['♠', '♥', '♦', '♣', '★', '♛', '⚡', '☆'];
const classicLabels = ['SPADE', 'HEART', 'DIAMOND', 'CLUB', 'STAR', 'QUEEN', 'BOLT', 'SHINE'];
const classicSymbolColors = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFE135', '#FFFFFF', '#FFE135', '#FFFFFF'];

const animalsSymbols = ['🦁', '🐼', '🦊', '🐸', '🦋', '🐙', '🦜', '🐨'];
const animalsLabels = ['LION', 'PANDA', 'FOX', 'FROG', 'BUTTERFLY', 'OCTOPUS', 'PARROT', 'KOALA'];

const foodSymbols = ['🍕', '🍔', '🍦', '🍩', '🍣', '🌮', '🍪', '🧁'];
const foodLabels = ['PIZZA', 'BURGER', 'ICE CREAM', 'DONUT', 'SUSHI', 'TACO', 'COOKIE', 'CUPCAKE'];

const animeSymbols = ['⛩', '🌸', '🎌', '🗻', '🎎', '🍱', '🎐', '🏯'];
const animeLabels = ['SHRINE', 'SAKURA', 'FLAG', 'FUJI', 'DOLLS', 'BENTO', 'CHIME', 'CASTLE'];

const techSymbols = ['💻', '📱', '🎮', '🎧', '💡', '🚀', '⚡', '🔮'];
const techLabels = ['LAPTOP', 'PHONE', 'GAMING', 'AUDIO', 'IDEA', 'ROCKET', 'POWER', 'MAGIC'];

export const themes: Theme[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional playing card symbols - Timeless fun!',
    previewImage: createPreview(classicSymbols, 'Classic', palettes.classic.colors, palettes.classic.accent),
    cardImages: classicSymbols.map((s, i) => 
      createVibrantCard(s, classicLabels[i], palettes.classic.colors[i], classicSymbolColors[i], palettes.classic.accent)
    ),
    isPremium: false,
  },
  {
    id: 'animals',
    name: 'Animals', 
    description: 'Cute creatures from around the world!',
    previewImage: createPreview(animalsSymbols, 'Animals', palettes.animals.colors, palettes.animals.accent),
    cardImages: animalsSymbols.map((s, i) =>
      createVibrantCard(s, animalsLabels[i], palettes.animals.colors[i], '#FFFFFF', palettes.animals.accent)
    ),
    isPremium: true,
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Delicious treats for hungry players!',
    previewImage: createPreview(foodSymbols, 'Food', palettes.food.colors, palettes.food.accent),
    cardImages: foodSymbols.map((s, i) =>
      createVibrantCard(s, foodLabels[i], palettes.food.colors[i], '#FFFFFF', palettes.food.accent)
    ),
    isPremium: true,
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese culture and kawaii vibes!',
    previewImage: createPreview(animeSymbols, 'Anime', palettes.anime.colors, palettes.anime.accent),
    cardImages: animeSymbols.map((s, i) =>
      createVibrantCard(s, animeLabels[i], palettes.anime.colors[i], '#FFFFFF', palettes.anime.accent)
    ),
    isPremium: true,
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern technology and digital icons!',
    previewImage: createPreview(techSymbols, 'Tech', palettes.tech.colors, palettes.tech.accent),
    cardImages: techSymbols.map((s, i) =>
      createVibrantCard(s, techLabels[i], palettes.tech.colors[i], '#FFFFFF', palettes.tech.accent)
    ),
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
