import { create } from 'zustand';
import type { Category, GameConfig, GameState, Language, Player } from '../types/game';
import { calculateImpostorCount, checkVictory, selectWord, shufflePlayers } from '../utils/gameLogic';
import { LANGUAGES } from '@/config/constants';

interface GameStore extends GameState {
  setImpostorCount: (count: number) => void;
  setConfig: (config: Partial<GameConfig>) => void;
  toggleCategory: (category: Category) => void;
  setLanguage: (language: Language) => void;
  setTotalPlayers: (count: number) => void;
  setShowHint: (show: boolean) => void;

  customNames: string[];
  useCustomNames: boolean;
  setCustomName: (index: number, name: string) => void;
  toggleCustomNames: () => void;

  startGame: () => void;
  nextReveal: () => void;
  startDiscussion: () => void;
  startVoting: () => void;
  castVote: (voterId: number, votedId: number) => void;
  skipVoting: (eliminatedId: number) => void;
  resolveVoting: () => void;
  continueGame: () => void;
  endGame: () => void;
  resetGame: () => void;
}

const initialState: GameState = {
  totalPlayers: 5,
  impostorCount: 1,
  language: LANGUAGES.ES,
  selectedCategories: ['animals', 'places', 'food'],
  showHint: true,

  word: '',
  hint: '',
  category: 'animals',
  players: [],

  round: 1,
  gameStatus: 'setup',
  winner: null,

  currentRevealIndex: 0,
  votes: {},
  lastEliminatedPlayer: null,
  lastEliminatedWasImpostor: false,
  startingPlayerId: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  customNames: [],
  useCustomNames: false,

  impostorCount: 1,

  setConfig: (config) => set((state) => ({ ...state, ...config })),

  toggleCategory: (category) => set((state) => {
    const categories = state.selectedCategories.includes(category)
      ? state.selectedCategories.filter(c => c !== category)
      : [...state.selectedCategories, category];

    return { selectedCategories: categories.length > 0 ? categories : state.selectedCategories };
  }),

  setLanguage: (language) => set({ language }),

  setTotalPlayers: (totalPlayers) => {
    const state = get();
    const currentNames = state.customNames;

    const newNames = Array.from({ length: totalPlayers }, (_, i) =>
      currentNames[i] || ''
    );
    const maxImpostors = Math.max(1, Math.floor(totalPlayers / 2));
    const newImpostorCount = Math.min(state.impostorCount ?? 1, maxImpostors);

    set({ totalPlayers, customNames: newNames, impostorCount: newImpostorCount });
  },

  setImpostorCount: (impostorCount) => {
    const state = get();
    const maxImpostors = Math.max(1, Math.floor(state.totalPlayers / 2));
    const clamped = Math.min(Math.max(1, impostorCount), maxImpostors);
    set({ impostorCount: clamped });
  },

  setShowHint: (showHint) => set({ showHint }),

  setCustomName: (index, name) => set((state) => {
    const newNames = [...state.customNames];
    newNames[index] = name;
    return { customNames: newNames };
  }),

  toggleCustomNames: () => set((state) => {
    const newValue = !state.useCustomNames;

    if (newValue && state.customNames.length === 0) {
      return {
        useCustomNames: newValue,
        customNames: Array(state.totalPlayers).fill(''),
      };
    }

    return { useCustomNames: newValue };
  }),

  startGame: () => {
    const state = get();
    const { totalPlayers, language, selectedCategories, showHint, useCustomNames, customNames } = state;

    const wordData = selectWord(language, selectedCategories);

    const impostorCount = state.impostorCount ?? calculateImpostorCount(totalPlayers);

    const players: Player[] = Array.from({ length: totalPlayers }, (_, i) => {
      let playerName = `${language === 'es' ? 'Jugador' : 'Player'} ${i + 1}`;

      if (useCustomNames && customNames[i] && customNames[i].trim() !== '') {
        playerName = customNames[i].trim();
      }

      return {
        id: i + 1,
        name: playerName,
        role: 'civil',
        isAlive: true,
        hasSeenCard: false,
      };
    });

    const shuffled = shufflePlayers(players);
    shuffled.slice(0, impostorCount).forEach(p => p.role = 'impostor');
    const startingPlayerId = players[Math.floor(Math.random() * players.length)]?.id ?? null;

    set({
      word: wordData.word,
      hint: showHint ? wordData.hint : '',
      category: wordData.category,
      players,
      round: 1,
      gameStatus: 'reveal',
      currentRevealIndex: 0,
      votes: {},
      lastEliminatedPlayer: null,
      winner: null,
      startingPlayerId,
    });
  },

  nextReveal: () => {
    const state = get();
    const nextIndex = state.currentRevealIndex + 1;

    if (nextIndex >= state.players.length) {
      set({ gameStatus: 'starting' });
    } else {
      set({ currentRevealIndex: nextIndex });
    }
  },

  startDiscussion: () => set({ gameStatus: 'discussion' }),

  startVoting: () => set({ gameStatus: 'voting', votes: {} }),

  castVote: (voterId, votedId) => set((state) => ({
    votes: { ...state.votes, [voterId]: votedId },
  })),

  skipVoting: (eliminatedId) => {
    const state = get();
    const eliminated = state.players.find(p => p.id === eliminatedId);

    if (!eliminated) return;

    const updatedPlayers = state.players.map(p =>
      p.id === eliminatedId ? { ...p, isAlive: false } : p
    );

    set({
      players: updatedPlayers,
      lastEliminatedPlayer: eliminated,
      lastEliminatedWasImpostor: eliminated.role === 'impostor',
      gameStatus: 'resolution',
      votes: {},
    });
  },

  resolveVoting: () => {
    const state = get();

    const voteCounts: Record<number, number> = {};
    Object.values(state.votes).forEach(votedId => {
      voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
    });

    const entries = Object.entries(voteCounts);
    if (entries.length === 0) return;

    const [eliminatedId] = entries.reduce((a, b) =>
      b[1] > a[1] ? b : a
    );

    const eliminated = state.players.find(p => p.id === Number(eliminatedId));

    if (!eliminated) return;

    const updatedPlayers = state.players.map(p =>
      p.id === eliminated.id ? { ...p, isAlive: false } : p
    );

    set({
      players: updatedPlayers,
      lastEliminatedPlayer: eliminated,
      lastEliminatedWasImpostor: eliminated.role === 'impostor',
      gameStatus: 'resolution',
      votes: {},
    });
  },

  continueGame: () => {
    const state = get();
    const alivePlayers = state.players.filter(p => p.isAlive);
    const aliveImpostors = alivePlayers.filter(p => p.role === 'impostor');

    const winner = checkVictory(alivePlayers.length, aliveImpostors.length);
    if (winner) {
      set({ gameStatus: 'ended', winner });
      return;
    }

    set((state) => ({
      round: state.round + 1,
      gameStatus: 'discussion',
      lastEliminatedPlayer: null,
    }));
  },

  endGame: () => set({ gameStatus: 'ended' }),

  resetGame: () => set({
    ...initialState,
    customNames: [],
    useCustomNames: false,
    impostorCount: 1,
  }),
}));
