import { useState, useCallback, useEffect } from 'react';
import type { Card, GameState } from '../types';
import { createCardPairs } from '../utils/shuffle';

const MATCH_DELAY = 500;

export function useGameLogic(cardImages: string[], pairCount?: number) {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame(cardImages, pairCount));

  function initializeGame(images: string[], pairs?: number): GameState {
    const cardPairs = createCardPairs(images, pairs);
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

  // Handle card click - allows unflipping and faster selection
  const handleCardClick = useCallback((clickedCard: Card) => {
    setGameState((prev) => {
      // Don't allow clicking matched cards
      if (clickedCard.isMatched) return prev;

      // If clicking an already flipped card, unflip it (deselect)
      if (clickedCard.isFlipped && prev.selectedCards.some(c => c.id === clickedCard.id)) {
        const updatedCards = prev.cards.map((card) =>
          card.id === clickedCard.id ? { ...card, isFlipped: false } : card
        );
        return {
          ...prev,
          cards: updatedCards,
          selectedCards: prev.selectedCards.filter(c => c.id !== clickedCard.id),
        };
      }

      // Don't flip already flipped or matched cards
      if (clickedCard.isFlipped || clickedCard.isMatched) return prev;

      // If already have 2 cards selected, allow starting a new selection
      if (prev.selectedCards.length >= 2) {
        const clearedCards = prev.cards.map((card) => {
          const wasSelected = prev.selectedCards.some(s => s.id === card.id);
          if (wasSelected && !card.isMatched) {
            return { ...card, isFlipped: false };
          }
          return card;
        });
        
        const updatedCards = clearedCards.map((card) =>
          card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        );

        return {
          ...prev,
          cards: updatedCards,
          selectedCards: [{ ...clickedCard, isFlipped: true }],
          isProcessing: false,
        };
      }

      // Flip the clicked card
      const updatedCards = prev.cards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      );

      const newSelectedCards = [...prev.selectedCards, { ...clickedCard, isFlipped: true }];

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
          const firstStillFlipped = prev.cards.find(c => c.id === first.id)?.isFlipped;
          const secondStillFlipped = prev.cards.find(c => c.id === second.id)?.isFlipped;
          
          if (!firstStillFlipped || !secondStillFlipped) {
            return {
              ...prev,
              selectedCards: [],
              isProcessing: false,
            };
          }

          let updatedCards: Card[];

          if (isMatch) {
            updatedCards = prev.cards.map((card) =>
              card.imageUrl === first.imageUrl ? { ...card, isMatched: true, isFlipped: true } : card
            );
          } else {
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
      }, MATCH_DELAY);

      return () => clearTimeout(timer);
    }
  }, [gameState.selectedCards, gameState.isProcessing]);

  // Reset game with optional new pair count
  const resetGame = useCallback((newPairCount?: number) => {
    setGameState(initializeGame(cardImages, newPairCount ?? pairCount));
  }, [cardImages, pairCount]);

  return {
    cards: gameState.cards,
    turns: gameState.turns,
    isGameComplete: gameState.isGameComplete,
    isProcessing: gameState.isProcessing,
    handleCardClick,
    resetGame,
  };
}
