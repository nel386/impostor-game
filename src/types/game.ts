export type Language = 'es' | 'en';

export type Category = 
  | 'animals' 
  | 'places' 
  | 'professions' 
  | 'movies' 
  | 'food' 
  | 'sports' 
  | 'objects';

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
}

export interface GameConfig {
  totalPlayers: number;
  impostorCount: number;
  language: Language;
  selectedCategories: Category[];
  showHint: boolean;
}

export interface GameState extends GameConfig {
  // Palabra de la partida (NO cambia entre rondas)
  word: string;
  hint: string;
  
  // Jugadores
  players: Player[];
  
  // Estado del juego
  round: number;
  gameStatus: GameStatus;
  winner: Winner;
  
  // Tracking
  currentRevealIndex: number; // Para "pasa el móvil"
  votes: Record<number, number>; // { voterId: votedPlayerId }
  lastEliminatedPlayer: Player | null;
  lastEliminatedWasImpostor: boolean;
}

export interface CategoryInfo {
  id: Category;
  label: {
    es: string;
    en: string;
  };
  icon: string;
}
