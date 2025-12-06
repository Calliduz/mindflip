/**
 * Fisher-Yates shuffle algorithm
 * Creates a new shuffled array without mutating the original
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Creates pairs of cards from an array of image URLs
 * @param imageUrls - Array of all available image URLs
 * @param pairCount - Number of pairs to create (default: all images)
 */
export function createCardPairs(
  imageUrls: string[],
  pairCount?: number
): { id: string; imageUrl: string }[] {
  // Shuffle and pick the required number of images
  const shuffledImages = shuffle(imageUrls);
  const selectedImages = pairCount 
    ? shuffledImages.slice(0, Math.min(pairCount, imageUrls.length))
    : shuffledImages;

  const pairs = selectedImages.flatMap((imageUrl, index) => [
    { id: `${index}-a`, imageUrl },
    { id: `${index}-b`, imageUrl },
  ]);
  return shuffle(pairs);
}

// Difficulty definitions
export const DIFFICULTIES = {
  easy: { pairs: 4, label: 'Easy', emoji: '😊', cols: 4 },
  medium: { pairs: 6, label: 'Medium', emoji: '🎯', cols: 4 },
  hard: { pairs: 8, label: 'Hard', emoji: '🔥', cols: 4 },
} as const;

export type DifficultyKey = keyof typeof DIFFICULTIES;
