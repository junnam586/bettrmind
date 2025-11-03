import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BetInBasket {
  id: string;
  sport: string;
  game: string;
  betType: string;
  odds: number;
  selection: string;
  tipPercentage?: number;
  bettorUsername?: string;
}

interface BasketContextType {
  basket: BetInBasket[];
  addToBasket: (bet: BetInBasket) => void;
  removeFromBasket: (id: string) => void;
  clearBasket: () => void;
  isInBasket: (id: string) => boolean;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<BetInBasket[]>([]);

  const addToBasket = (bet: BetInBasket) => {
    setBasket(prev => {
      // Check if already in basket
      if (prev.some(b => b.id === bet.id)) {
        return prev;
      }
      return [...prev, bet];
    });
  };

  const removeFromBasket = (id: string) => {
    setBasket(prev => prev.filter(bet => bet.id !== id));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const isInBasket = (id: string) => {
    return basket.some(bet => bet.id === id);
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket, isInBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within BasketProvider');
  }
  return context;
};
