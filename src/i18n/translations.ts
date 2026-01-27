export type Translations = {
    setup: {
        title: string;
        subtitle: string;
        hintForImpostor: string;
        hintDescription: string;
        startGame: string;
        selectCategory: string;
    };
    discussion: {
        title: string;
        timeRemaining: string;
        alive: string;
        impostors: string;
        playersInGame: string;
        rules: string;
        giveClues: string;
        impostorMustBlend: string;
        watchSuspicious: string;
        goToVoting: string;
    };
    voting: {
        title: string;
        eachPlayerVotes: string;
        currentVoter: string;
        whoWasEliminated: string;
        voteConfirmed: string;
        confirmVote: string;
        votedPhysically: string;
        selectWhoEliminated: string;
        confirmEliminated: string;
        backToDigitalVoting: string;
    };
    resolution: {
        wasImpostor: string;
        wasInnocent: string;
        foundTheImpostor: string;
        foundAnImpostor: string;
        impostorSingular: string;
        impostorPlural: string;
        aliveSingular: string;
        alivePlural: string;
        innocentImpostorsWin: string;
        innocentGameContinues: string;
        playersAlive: string;
        alivePlayers: string;
        aliveImpostors: string;
        seeFinalResult: string;
        continueGame: string;
    };
    roleReveal: {
        privacyRequired: string;
        makeSureNobody: string;
        revealMyRole: string;
        player: string;
        of: string;
        youAreThe: string;
        yourWord: string;
        impostor: string;
        hint: string;
        memorizeRole: string;
        startingPlayer: string;
        nextPlayer: string;
        goToStarting: string;
    };
    endGame: {
        civilsWin: string;
        impostorsWin: string;
        allImpostorsEliminated: string;
        impostorsSurvived: string;
        roleReveal: string;
        impostor: string;
        civil: string;
        alive: string;
        eliminated: string;
        players: string;
        civils: string;
        impostors: string;
        playAgain: string;
    };
    cardReveal: {
        swipeUp: string;
        dragToReveal: string;
        revealed: string;
        drag: string;
    };
    categorySelector: {
        categories: string;
        categoriesSelected: string;
    };
    playerCounter: {
        numberOfPlayers: string;
        min: string;
        max: string;
    };
    impostorCounter: {
        numberOfImpostors: string;
        maximumAllowed: string;
    };
    playerNameInput: {
        customNames: string;
        assignNames: string;
        enterNames: string;
        player: string;
        leaveBlankInfo: string;
    };
    languageToggle: {
        spanish: string;
        english: string;
    };
    common: {
        round: string;
    };
    startingPlayer: {
        subtitle: string;
        cta: string;
        fallback: string;
    };
};

export const translations: Record<'es' | 'en', Translations> = {
    es: {
        setup: {
            title: 'Juego del Impostor',
            subtitle: 'Configura tu partida y encuentra al impostor',
            hintForImpostor: 'Pista para impostor',
            hintDescription: 'El impostor verá una pista sobre la categoría',
            startGame: 'Empezar partida',
            selectCategory: 'Selecciona al menos una categoría',
        },
        discussion: {
            title: 'Discusión',
            timeRemaining: 'Tiempo restante',
            alive: 'Vivos',
            impostors: 'Impostores',
            playersInGame: 'Jugadores en juego',
            rules: 'Reglas',
            giveClues: 'Dad pistas sin decir la palabra',
            impostorMustBlend: 'El impostor debe disimular',
            watchSuspicious: 'Observad comportamientos sospechosos',
            goToVoting: 'Ir a votación',
        },
        voting: {
            title: 'Votación',
            eachPlayerVotes: 'Cada jugador vota en secreto',
            currentVoter: 'Turno de',
            whoWasEliminated: '¿Quién fue eliminado?',
            voteConfirmed: '¡Voto confirmado!',
            confirmVote: 'Confirmar voto',
            votedPhysically: 'Votamos físicamente',
            selectWhoEliminated: 'Selecciona quién fue eliminado en la votación física',
            confirmEliminated: 'Confirmar eliminado',
            backToDigitalVoting: '← Volver a votación digital',
        },
        resolution: {
            wasImpostor: 'ERA IMPOSTOR',
            wasInnocent: 'ERA INOCENTE',
            foundTheImpostor: '¡Habéis encontrado al impostor!',
            foundAnImpostor: '¡Habéis encontrado a un impostor!',
            impostorSingular: 'impostor',
            impostorPlural: 'impostores',
            aliveSingular: 'vivo',
            alivePlural: 'vivos',
            innocentImpostorsWin: 'Era inocente... ¡impostores ganan!',
            innocentGameContinues: 'Era inocente... juego continúa.',
            playersAlive: 'jugadores vivos.',
            alivePlayers: 'Jugadores vivos',
            aliveImpostors: 'Impostores vivos',
            seeFinalResult: 'Ver resultado final',
            continueGame: 'Continuar partida',
        },
        roleReveal: {
            privacyRequired: 'Privacidad requerida',
            makeSureNobody: 'Asegúrate de que nadie más pueda ver la pantalla',
            revealMyRole: 'Revelar mi rol',
            player: 'Jugador',
            of: 'de',
            youAreThe: 'Eres el',
            yourWord: 'Tu palabra',
            impostor: 'IMPOSTOR',
            hint: 'Pista',
            memorizeRole: 'Memoriza tu rol y pasa el dispositivo',
            startingPlayer: 'Comienza',
            nextPlayer: 'Siguiente jugador',
            goToStarting: 'Ver quién empieza',
        },
        endGame: {
            civilsWin: '¡Civiles Ganan!',
            impostorsWin: '¡Impostores Ganan!',
            allImpostorsEliminated: 'Todos los impostores fueron eliminados',
            impostorsSurvived: 'Los impostores sobrevivieron',
            roleReveal: 'Revelación de roles',
            impostor: 'Impostor',
            civil: 'Civil',
            alive: '✓ Vivo',
            eliminated: '✗ Eliminado',
            players: 'Jugadores',
            civils: 'Civiles',
            impostors: 'Impostores',
            playAgain: 'Jugar de nuevo',
        },
        cardReveal: {
            swipeUp: 'Desliza hacia arriba',
            dragToReveal: 'Arrastra para revelar tu rol',
            revealed: 'Revelado',
            drag: 'Arrastra',
        },
        categorySelector: {
            categories: 'Categorías',
            categoriesSelected: 'categoría(s) seleccionada(s)',
        },
        playerCounter: {
            numberOfPlayers: 'Número de jugadores',
            min: 'Mínimo',
            max: 'Máximo',
        },
        impostorCounter: {
            numberOfImpostors: 'Número de impostores',
            maximumAllowed: 'Máximo permitido',
        },
        playerNameInput: {
            customNames: 'Nombres personalizados',
            assignNames: 'Asigna nombres a los jugadores',
            enterNames: 'Introduce los nombres (opcional):',
            player: 'Jugador',
            leaveBlankInfo: 'Deja en blanco para usar nombres por defecto (Jugador 1, Jugador 2...)',
        },
        languageToggle: {
            spanish: 'ES',
            english: 'EN',
        },
        common: {
            round: 'Ronda',
        },
        startingPlayer: {
            subtitle: 'Este jugador da la primera pista',
            cta: 'Empezar discusión',
            fallback: 'Jugador',
        },
    },
    en: {
        setup: {
            title: 'Impostor Game',
            subtitle: 'Set up your game and find the impostor',
            hintForImpostor: 'Hint for impostor',
            hintDescription: 'Impostor will see a hint about the category',
            startGame: 'Start game',
            selectCategory: 'Select at least one category',
        },
        discussion: {
            title: 'Discussion',
            timeRemaining: 'Time remaining',
            alive: 'Alive',
            impostors: 'Impostors',
            playersInGame: 'Players in game',
            rules: 'Rules',
            giveClues: 'Give clues without saying the word',
            impostorMustBlend: 'The impostor must blend in',
            watchSuspicious: 'Watch for suspicious behavior',
            goToVoting: 'Go to voting',
        },
        voting: {
            title: 'Voting',
            eachPlayerVotes: 'Each player votes in secret',
            currentVoter: 'Turn of',
            whoWasEliminated: 'Who was eliminated?',
            voteConfirmed: 'Vote confirmed!',
            confirmVote: 'Confirm vote',
            votedPhysically: 'We voted physically',
            selectWhoEliminated: 'Select who was eliminated in the physical vote',
            confirmEliminated: 'Confirm eliminated',
            backToDigitalVoting: '← Back to digital voting',
        },
        resolution: {
            wasImpostor: 'WAS IMPOSTOR',
            wasInnocent: 'WAS INNOCENT',
            foundTheImpostor: 'You found the impostor!',
            foundAnImpostor: 'You found an impostor!',
            impostorSingular: 'impostor',
            impostorPlural: 'impostors',
            aliveSingular: 'remaining',
            alivePlural: 'remaining',
            innocentImpostorsWin: 'Was innocent... impostors win!',
            innocentGameContinues: 'Was innocent... game continues.',
            playersAlive: 'players alive.',
            alivePlayers: 'Alive players',
            aliveImpostors: 'Alive impostors',
            seeFinalResult: 'See final result',
            continueGame: 'Continue game',
        },
        roleReveal: {
            privacyRequired: 'Privacy required',
            makeSureNobody: 'Make sure nobody else can see the screen',
            revealMyRole: 'Reveal my role',
            player: 'Player',
            of: 'of',
            youAreThe: 'You are the',
            yourWord: 'Your word',
            impostor: 'IMPOSTOR',
            hint: 'Hint',
            memorizeRole: 'Memorize your role and pass the device',
            startingPlayer: 'Starting with',
            nextPlayer: 'Next player',
            goToStarting: 'See who starts',
        },
        endGame: {
            civilsWin: 'Civils Win!',
            impostorsWin: 'Impostors Win!',
            allImpostorsEliminated: 'All impostors eliminated',
            impostorsSurvived: 'Impostors survived',
            roleReveal: 'Role reveal',
            impostor: 'Impostor',
            civil: 'Civil',
            alive: '✓ Alive',
            eliminated: '✗ Killed',
            players: 'Players',
            civils: 'Civils',
            impostors: 'Impostors',
            playAgain: 'Play again',
        },
        cardReveal: {
            swipeUp: 'Swipe up',
            dragToReveal: 'Drag to reveal your role',
            revealed: 'Revealed',
            drag: 'Drag',
        },
        categorySelector: {
            categories: 'Categories',
            categoriesSelected: 'category(ies) selected',
        },
        playerCounter: {
            numberOfPlayers: 'Number of players',
            min: 'Min',
            max: 'Max',
        },
        impostorCounter: {
            numberOfImpostors: 'Number of impostors',
            maximumAllowed: 'Maximum allowed',
        },
        playerNameInput: {
            customNames: 'Custom names',
            assignNames: 'Assign names to players',
            enterNames: 'Enter names (optional):',
            player: 'Player',
            leaveBlankInfo: 'Leave blank to use default names (Player 1, Player 2...)',
        },
        languageToggle: {
            spanish: 'ES',
            english: 'EN',
        },
        common: {
            round: 'Round',
        },
        startingPlayer: {
            subtitle: 'This player gives the first clue',
            cta: 'Start discussion',
            fallback: 'Player',
        },
    },
};
