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
 */
export function createCardPairs(imageUrls: string[]): { id: string; imageUrl: string }[] {
  const pairs = imageUrls.flatMap((imageUrl, index) => [
    { id: `${index}-a`, imageUrl },
    { id: `${index}-b`, imageUrl },
  ]);
  return shuffle(pairs);
}
