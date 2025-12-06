import { useState, useCallback, useEffect } from 'react';
import type { Card, GameState } from '../types';
import { createCardPairs } from '../utils/shuffle';

const FLIP_BACK_DELAY = 1000; // 1 second

export function useGameLogic(cardImages: string[]) {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame(cardImages));

  // Initialize or reset the game
  function initializeGame(images: string[]): GameState {
    const cardPairs = createCardPairs(images);
    const cards: Card[] = cardPairs.map((pair) => ({
      ...pair,
      isFlipped: false,
      isMatched: false,
    }));

    return {
      cards,
      selectedCards: [],
      turns: 0,
      isGameComplete: false,
      isProcessing: false,
    };
  }

  // Handle card click
  const handleCardClick = useCallback((clickedCard: Card) => {
    setGameState((prev) => {
      // Ignore if processing, card already flipped, or card already matched
      if (
        prev.isProcessing ||
        clickedCard.isFlipped ||
        clickedCard.isMatched ||
        prev.selectedCards.length >= 2
      ) {
        return prev;
      }

      // Flip the clicked card
      const updatedCards = prev.cards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      );

      const newSelectedCards = [...prev.selectedCards, { ...clickedCard, isFlipped: true }];

      // If this is the second card
      if (newSelectedCards.length === 2) {
        return {
          ...prev,
          cards: updatedCards,
          selectedCards: newSelectedCards,
          isProcessing: true,
        };
      }

      return {
        ...prev,
        cards: updatedCards,
        selectedCards: newSelectedCards,
      };
    });
  }, []);

  // Process matches after two cards are selected
  useEffect(() => {
    if (gameState.selectedCards.length === 2 && gameState.isProcessing) {
      const [first, second] = gameState.selectedCards;
      const isMatch = first.imageUrl === second.imageUrl;

      const timer = setTimeout(() => {
        setGameState((prev) => {
          let updatedCards: Card[];

          if (isMatch) {
            // Mark as matched
            updatedCards = prev.cards.map((card) =>
              card.imageUrl === first.imageUrl ? { ...card, isMatched: true } : card
            );
          } else {
            // Flip back
            updatedCards = prev.cards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            );
          }

          const isGameComplete = updatedCards.every((card) => card.isMatched);

          return {
            ...prev,
            cards: updatedCards,
            selectedCards: [],
            turns: prev.turns + 1,
            isGameComplete,
            isProcessing: false,
          };
        });
      }, FLIP_BACK_DELAY);

      return () => clearTimeout(timer);
    }
  }, [gameState.selectedCards, gameState.isProcessing]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState(initializeGame(cardImages));
  }, [cardImages]);

  return {
    cards: gameState.cards,
    turns: gameState.turns,
    isGameComplete: gameState.isGameComplete,
    isProcessing: gameState.isProcessing,
    handleCardClick,
    resetGame,
  };
}
