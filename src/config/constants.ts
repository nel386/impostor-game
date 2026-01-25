export const GAME_CONFIG = {
    MIN_PLAYERS: 3,
    MAX_PLAYERS: 16,
    MIN_IMPOSTORS: 1,
    DISCUSSION_TIME_SECONDS: 180,
    MAX_PLAYER_NAME_LENGTH: 15,
    MAX_CATEGORIES_DISPLAY: 5,
} as const;

export const COLOR_VARIANTS = {
    PRIMARY: 'primary',
    DANGER: 'danger',
    SUCCESS: 'success',
    WARNING: 'warning',
} as const;

export const LANGUAGES = {
    ES: 'es',
    EN: 'en',
} as const;
