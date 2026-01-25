import type { IconType } from "react-icons";

export type Language = 'es' | 'en';

export type Category =
  | 'animals'
  | 'places'
  | 'professions'
  | 'movies'
  | 'food'
  | 'sports'
  | 'objects'
  | 'football';

export type Role = 'civil' | 'impostor';

export type GameStatus =
  | 'setup'
  | 'reveal'
  | 'discussion'
  | 'voting'
  | 'resolution'
  | 'ended';

export type Winner = 'civils' | 'impostors' | null;

export interface Player {
  id: number;
  name: string;
  role: Role;
  isAlive: boolean;
  hasSeenCard: boolean;
}

export interface WordData {
  word: string;
  hint: string;
  category: Category;
}

export interface GameConfig {
  totalPlayers: number;
  impostorCount: number;
  language: Language;
  selectedCategories: Category[];
  showHint: boolean;
}

export interface GameState extends GameConfig {
  word: string;
  hint: string;
  category: Category;

  players: Player[];

  round: number;
  gameStatus: GameStatus;
  winner: Winner;

  currentRevealIndex: number; 
  votes: Record<number, number>; 
  lastEliminatedPlayer: Player | null;
  lastEliminatedWasImpostor: boolean;
}

export interface CategoryInfo {
  id: Category;
  label: {
    es: string;
    en: string;
  };
  icon: IconType
}
