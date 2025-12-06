import type { Theme } from '../types';

// Palette definitions
const palettes = {
  classic: { colors: ['#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#FBBF24', '#22C55E', '#06B6D4', '#3B82F6'], accent: '#FFE135' },
  animals: { colors: ['#4ADE80', '#A3E635', '#FACC15', '#FB923C', '#F87171', '#60A5FA', '#818CF8', '#C084FC'], accent: '#DCFCE7' },
  food:    { colors: ['#FCA5A5', '#FDBA74', '#FDE047', '#86EFAC', '#67E8F9', '#93C5FD', '#C4B5FD', '#F0ABFC'], accent: '#FFF7ED' },
  anime:   { colors: ['#F472B6', '#E879F9', '#A78BFA', '#818CF8', '#60A5FA', '#38BDF8', '#2DD4BF', '#34D399'], accent: '#FCE7F3' },
  tech:    { colors: ['#1E293B', '#334155', '#475569', '#64748B', '#0F172A', '#1E1B4B', '#312E81', '#172554'], accent: '#00F0FF' }, // Cyberpunk dark
};

// Helper color adjuster
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// --- SVG GENERATORS ---

// 1. CLASSIC: Halftone & Starburst (The "Comic Book" Look)
const createClassicCard = (symbol: string, label: string, bgColor: string, symbolColor: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="g-${label}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bgColor}"/><stop offset="1" stop-color="${adjustColor(bgColor, -40)}"/></linearGradient>
        <pattern id="p-${label}" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.2" fill="rgba(0,0,0,0.15)"/></pattern>
        <pattern id="b-${label}" width="40" height="40" patternUnits="userSpaceOnUse"><polygon points="20,0 22,15 35,10 24,20 35,30 22,25 20,40 18,25 5,30 16,20 5,10 18,15" fill="rgba(255,255,255,0.1)"/></pattern>
      </defs>
      <rect width="200" height="200" rx="16" fill="url(#g-${label})"/>
      <rect width="200" height="200" rx="16" fill="url(#b-${label})"/>
      <rect width="200" height="200" rx="16" fill="url(#p-${label})"/>
      <rect x="10" y="10" width="180" height="180" rx="12" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="8 4"/>
      <ellipse cx="100" cy="85" rx="55" ry="50" fill="rgba(255,255,255,0.2)"/>
      <text x="104" y="108" text-anchor="middle" font-size="75" font-family="Arial Black" fill="black" opacity="0.3">${symbol}</text>
      <text x="100" y="105" text-anchor="middle" font-size="75" font-family="Arial Black" fill="${symbolColor}">${symbol}</text>
      <rect x="20" y="150" width="160" height="35" rx="8" fill="rgba(0,0,0,0.8)" stroke="${accent}" stroke-width="2"/>
      <text x="100" y="174" text-anchor="middle" font-size="16" font-family="Arial Black" fill="white" letter-spacing="1">${label}</text>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// 2. ANIMALS: Organic Shapes & Leaf Pattern (Nature Look)
const createAnimalCard = (symbol: string, label: string, bgColor: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="g-${label}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bgColor}"/><stop offset="1" stop-color="${adjustColor(bgColor, -30)}"/></linearGradient>
        <path id="leaf" d="M10,0 Q20,10 10,20 Q0,10 10,0" fill="rgba(255,255,255,0.15)"/>
        <pattern id="p-${label}" width="30" height="30" patternUnits="userSpaceOnUse"><use href="#leaf" x="5" y="5"/><use href="#leaf" x="20" y="20" transform="rotate(45 20 20)"/></pattern>
      </defs>
      <rect width="200" height="200" rx="24" fill="url(#g-${label})"/>
      <rect width="200" height="200" rx="24" fill="url(#p-${label})"/>
      <circle cx="100" cy="90" r="55" fill="rgba(255,255,255,0.9)" stroke="${accent}" stroke-width="4"/>
      <text x="100" y="115" text-anchor="middle" font-size="70">${symbol}</text>
      <path d="M40,160 Q100,190 160,160" fill="none" stroke="white" stroke-width="30" stroke-linecap="round"/>
      <text x="100" y="169" text-anchor="middle" font-size="16" font-family="Arial Black" fill="${adjustColor(bgColor, -60)}" font-weight="bold">${label}</text>
      <text x="100" y="15" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.6)" font-weight="bold">MINDFLIP</text>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// 3. FOOD: Checkerboard Pattern (Picnic Look)
const createFoodCard = (symbol: string, label: string, bgColor: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <pattern id="check-${label}" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="${bgColor}"/>
          <rect width="20" height="20" fill="${adjustColor(bgColor, 20)}"/>
          <rect x="20" y="20" width="20" height="20" fill="${adjustColor(bgColor, 20)}"/>
        </pattern>
      </defs>
      <rect width="200" height="200" rx="8" fill="url(#check-${label})"/>
      <rect x="10" y="10" width="180" height="180" rx="4" fill="none" stroke="white" stroke-width="6" stroke-dasharray="15 10"/>
      <circle cx="100" cy="100" r="60" fill="white" stroke="${bgColor}" stroke-width="3" shadow="dropdown"/>
      <text x="100" y="120" text-anchor="middle" font-size="75" filter="drop-shadow(2px 2px 0 rgba(0,0,0,0.2))">${symbol}</text>
      <rect x="40" y="165" width="120" height="25" rx="12" fill="${accent}"/>
      <text x="100" y="182" text-anchor="middle" font-size="14" font-family="Arial Rounded MT Bold, Arial" fill="${adjustColor(bgColor, -60)}">${label}</text>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// 4. ANIME: Speed Lines (Manga Look)
const createAnimeCard = (symbol: string, label: string, bgColor: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="g-${label}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bgColor}"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>
        <pattern id="lines-${label}" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M100,100 L0,0 M100,100 L200,0 M100,100 L0,200 M100,100 L200,200 M100,100 L100,0" stroke="${accent}" stroke-width="2" opacity="0.5"/>
          <circle cx="100" cy="100" r="80" fill="none" stroke="${accent}" stroke-width="20" stroke-dasharray="5 15"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="${bgColor}"/>
      <rect width="200" height="200" fill="url(#lines-${label})"/>
      <!-- Burst bubble -->
      <path d="M100,30 L115,70 L160,60 L130,90 L170,120 L125,130 L130,170 L100,140 L70,170 L75,130 L30,120 L70,90 L40,60 L85,70 Z" fill="white" stroke="black" stroke-width="3"/>
      <text x="100" y="115" text-anchor="middle" font-size="60">${symbol}</text>
      <rect x="0" y="170" width="200" height="30" fill="black"/>
      <text x="100" y="190" text-anchor="middle" font-size="18" font-family="Arial Black" fill="#FF0055" letter-spacing="2" style="text-shadow: 2px 2px 0 white">${label}</text>
      <text x="195" y="15" text-anchor="end" font-size="10" font-family="Arial" font-weight="bold" fill="white">JP</text>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// 5. TECH: Grid & Neon (Cyberpunk Look)
const createTechCard = (symbol: string, label: string, bgColor: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <pattern id="grid-${label}" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20,0 L0,0 L0,20" fill="none" stroke="${accent}" stroke-width="0.5" opacity="0.3"/>
        </pattern>
        <filter id="glow-${label}"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="200" height="200" fill="#050510"/>
      <rect width="200" height="200" fill="url(#grid-${label})"/>
      <rect x="5" y="5" width="190" height="190" fill="none" stroke="${bgColor}" stroke-width="2"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="40 10" opacity="0.7"/>
      <text x="100" y="115" text-anchor="middle" font-size="65" fill="${bgColor}" filter="url(#glow-${label})">${symbol}</text>
      <text x="20" y="25" fill="${accent}" font-family="monospace" font-size="10">SYS.ID.${label}</text>
      <rect x="50" y="160" width="100" height="2" fill="${accent}"/>
      <text x="100" y="180" text-anchor="middle" font-family="Courier New, monospace" font-weight="bold" fill="white" font-size="14">&lt;${label}/&gt;</text>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

// --- DATA ---
const classicSymbols = ['♠', '♥', '♦', '♣', '★', '♛', '⚡', '☆'];
const classicLabels = ['SPADE', 'HEART', 'DIAMOND', 'CLUB', 'STAR', 'QUEEN', 'BOLT', 'SHINE'];

const animalsSymbols = ['🦁', '🐼', '🦊', '🐸', '🦋', '🐙', '🦜', '🐨'];
const animalsLabels = ['LION', 'PANDA', 'FOX', 'FROG', 'FLY', 'OCTO', 'BIRD', 'BEAR'];

const foodSymbols = ['🍕', '🍔', '🍦', '🍩', '🍣', '🌮', '🍪', '🧁'];
const foodLabels = ['PIZZA', 'BURGER', 'ICE', 'DONUT', 'SUSHI', 'TACO', 'CHIP', 'CAKE'];

const animeSymbols = ['⛩', '🌸', '🎌', '🗻', '🎎', '🍱', '🎐', '🏯'];
const animeLabels = ['SHRINE', 'SAKURA', 'JAPAN', 'FUJI', 'DOLLS', 'BENTO', 'WIND', 'CASTLE'];

const techSymbols = ['💻', '📱', '🎮', '🎧', '💡', '🚀', '⚡', '💎'];
const techLabels = ['LAPTOP', 'PHONE', 'GAME', 'SOUND', 'IDEA', 'SPACE', 'VOLT', 'CRYPTO'];

// --- THEME PREVIEW GENERATOR (Simplified) ---
const createPreview = (symbols: string[], themeName: string, color: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#1a1a2e"/>
      <text x="200" y="50" text-anchor="middle" font-size="24" fill="white" font-family="Arial Black">${themeName.toUpperCase()}</text>
      <g transform="translate(50, 100)">
        <rect width="60" height="80" fill="${color}" rx="8"/>
        <text x="30" y="50" text-anchor="middle" font-size="30">${symbols[0]}</text>
      </g>
      <g transform="translate(130, 100)">
        <rect width="60" height="80" fill="${color}" rx="8"/>
        <text x="30" y="50" text-anchor="middle" font-size="30">${symbols[1]}</text>
      </g>
      <g transform="translate(210, 100)">
        <rect width="60" height="80" fill="${color}" rx="8"/>
        <text x="30" y="50" text-anchor="middle" font-size="30">${symbols[2]}</text>
      </g>
      <g transform="translate(290, 100)">
        <rect width="60" height="80" fill="${color}" rx="8"/>
        <text x="30" y="50" text-anchor="middle" font-size="30">${symbols[3]}</text>
      </g>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};

export const themes: Theme[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional style with bold colors.',
    previewImage: createPreview(classicSymbols, 'Classic', palettes.classic.colors[0]),
    cardImages: classicSymbols.map((s, i) => createClassicCard(s, classicLabels[i], palettes.classic.colors[i], '#FFFFFF', palettes.classic.accent)),
    isPremium: false,
  },
  {
    id: 'animals',
    name: 'Animals', 
    description: 'Wild beasts with a nature vibe.',
    previewImage: createPreview(animalsSymbols, 'Animals', palettes.animals.colors[1]),
    cardImages: animalsSymbols.map((s, i) => createAnimalCard(s, animalsLabels[i], palettes.animals.colors[i], palettes.animals.accent)),
    isPremium: false, // FREE NOW
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Picnic pattern with tasty treats.',
    previewImage: createPreview(foodSymbols, 'Food', palettes.food.colors[0]),
    cardImages: foodSymbols.map((s, i) => createFoodCard(s, foodLabels[i], palettes.food.colors[i], palettes.food.accent)),
    isPremium: false, // FREE NOW
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Manga style speed lines.',
    previewImage: createPreview(animeSymbols, 'Anime', palettes.anime.colors[0]),
    cardImages: animeSymbols.map((s, i) => createAnimeCard(s, animeLabels[i], palettes.anime.colors[i], palettes.anime.accent)),
    isPremium: true,
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Cyberpunk neon aesthetics.',
    previewImage: createPreview(techSymbols, 'Tech', palettes.tech.colors[6]),
    cardImages: techSymbols.map((s, i) => createTechCard(s, techLabels[i], palettes.tech.colors[6], palettes.tech.accent)),
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
