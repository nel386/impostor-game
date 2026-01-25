import type { Language, Category, WordData } from '../types/game';
import { WORDS } from '../data/words';

export function calculateImpostorCount(totalPlayers: number): number {
  if (totalPlayers <= 4) return 1;
  if (totalPlayers <= 7) return 1;
  if (totalPlayers <= 10) return 2;
  return 3;
}

export function selectWord(language: Language, categories: Category[]): WordData {
  const availableWords: { category: Category; words: WordData[] }[] = [];
  
  categories.forEach(category => {
    const categoryWords = WORDS[language][category];
    availableWords.push({ category, words: categoryWords });
  });
  
  const allWords = availableWords.flatMap(({ category, words }) => 
    words.map(wordData => ({ ...wordData, category }))
  );
  
  const randomIndex = Math.floor(Math.random() * allWords.length);
  return allWords[randomIndex];
}


export function checkVictory(alivePlayers: number, aliveImpostors: number): 'civils' | 'impostors' | null {
  if (aliveImpostors === 0) return 'civils';
  if (alivePlayers <= 4 && aliveImpostors > 0) return 'impostors';
  return null;
}
