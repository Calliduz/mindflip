// Card type
export interface Card {
  id: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Theme type
export interface Theme {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  cardImages: string[];
  isPremium: boolean;
  isLocked?: boolean;
}

// User type
export interface User {
  email: string;
  isPremium: boolean;
}

// Game state type
export interface GameState {
  cards: Card[];
  selectedCards: Card[];
  turns: number;
  isGameComplete: boolean;
  isProcessing: boolean;
}

// API Response types
export interface AuthResponse {
  token: string;
  user: User;
}

export interface ThemeListResponse {
  themes: Theme[];
}

export interface CheckoutResponse {
  url: string;
}

// Timer state
export interface TimerState {
  seconds: number;
  isRunning: boolean;
}
