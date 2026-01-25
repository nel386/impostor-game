# 🎭 Impostor Game

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite)

**Juego de deducción social para 3-16 jugadores. Encuentra al impostor antes de que sea tarde.**

[🎮 Jugar Ahora](https://nel386.github.io/impostor-game/) · [🐛 Reportar Bug](https://github.com/nel386/impostor-game/issues) · [✨ Sugerir Feature](https://github.com/nel386/impostor-game/issues)

</div>

---

## 🎯 Características

- 🎮 **3-16 jugadores** - Configurable para grupos pequeños o grandes
- 🎭 **Roles secretos** - Civiles e Impostores con objetivos diferentes
- 📱 **Responsive** - Juega desde móvil, tablet o PC
- 🌙 **Dark Mode** - Modo oscuro con persistencia
- 🌍 **Bilingüe** - Español e Inglés con sistema i18n tipado
- 🎨 **UI Moderna** - Animaciones fluidas con Framer Motion
- 📊 **20+ categorías** - Palabras variadas para cada partida
- 👤 **Nombres personalizados** - Asigna nombres a los jugadores
- 💾 **Sin backend** - Todo funciona en el navegador
- ⚡ **Optimizado** - Path aliases, barrel exports y clean code

## 📸 Screenshots

### Pantalla de configuración
![Setup Screen](https://via.placeholder.com/800x450/eab308/ffffff?text=Setup+Screen)

### Revelación de roles
![Role Reveal](https://via.placeholder.com/800x450/1e293b/ffffff?text=Role+Reveal)

### Votación
![Voting](https://via.placeholder.com/800x450/3b82f6/ffffff?text=Voting+Screen)

## 🎲 Cómo jugar

1. **Configuración**: Elige número de jugadores, impostores y categorías
2. **Revelación**: Cada jugador ve su rol en privado (privacidad requerida)
3. **Discusión**: Los jugadores dan pistas sobre su palabra (menos el impostor)
4. **Votación**: Vota en secreto o físicamente para eliminar al sospechoso
5. **Victoria**: 
   - 🔵 **Civiles ganan** si eliminan a todos los impostores
   - 🔴 **Impostores ganan** si sobreviven hasta el final

## 🚀 Tecnologías

### **Core**
- **React 18.3** - UI Library
- **TypeScript 5.7** - Tipado estático
- **Vite 6.0** - Build tool ultrarrápido
- **Tailwind CSS** - Utility-first CSS

### **Estado y UI**
- **Zustand** - State management ligero con persistencia
- **Framer Motion** - Animaciones fluidas y gestos
- **React Icons** - Iconos de Lucide

### **Arquitectura**
- ✅ **Path aliases** (`@/`) - Imports limpios
- ✅ **Barrel exports** - Organización modular
- ✅ **Constantes centralizadas** - Configuración única
- ✅ **Sistema i18n tipado** - Traducciones con autocompletado
- ✅ **Clean code** - Patrones de diseño y buenas prácticas

## 💻 Instalación local

```bash
# Clonar repositorio
git clone https://github.com/nel386/impostor-game.git

# Instalar dependencias
cd impostor-game
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Deploy a GitHub Pages
npm run deploy
```

## 🏗️ Estructura del proyecto

```
impostor-game/
├── src/
│   ├── components/
│   │   ├── layout/          # Layouts generales
│   │   ├── screens/         # Pantallas del juego (Setup, Discussion, Voting...)
│   │   └── ui/              # Componentes UI reutilizables
│   │       ├── index.ts     # Barrel exports
│   │       ├── Counter/     # Counter con estilos colocados
│   │       └── ...
│   ├── config/
│   │   └── constants.ts     # Constantes centralizadas (MIN_PLAYERS, etc.)
│   ├── contexts/
│   │   └── ThemeContext.tsx # Context de tema (dark/light)
│   ├── data/
│   │   └── words.ts         # Categorías y palabras del juego
│   ├── i18n/
│   │   ├── index.ts         # Barrel export
│   │   ├── translations.ts  # Traducciones ES/EN tipadas
│   │   └── useTranslation.ts # Hook personalizado i18n
│   ├── store/
│   │   └── gameStore.ts     # Zustand store con persistencia
│   ├── types/
│   │   └── game.ts          # TypeScript types
│   └── utils/
│       ├── gameLogic.ts     # Lógica del juego
│       └── wordSelector.ts  # Selector de palabras aleatorias
├── public/
├── index.html
└── vite.config.ts           # Config con path aliases
```

## 🎨 Componentes principales

### **UI Components**
- **Button** - Botón base con variantes (primary, danger, ghost)
- **Counter** - Contador animado con variantes de color
- **LanguageToggle** - Selector de idioma con banderas SVG
- **ThemeToggle** - Switch dark/light mode con persistencia
- **CategorySelector** - Grid de categorías con selección múltiple
- **CardReveal** - Animación de revelación tipo "scratch card"
- **PlayerNameInput** - Input con scroll personalizado y nombres custom

### **Screens**
- **GameSetupScreen** - Configuración inicial (jugadores, impostores, categorías)
- **RoleRevealScreen** - Revelación privada de roles con animaciones
- **DiscussionScreen** - Timer de 3 minutos y reglas de discusión
- **VotingScreen** - Sistema de votación digital/física
- **ResolutionScreen** - Resultado de eliminación y continuación
- **EndGameScreen** - Pantalla final con ganadores y revelación de roles

## 🛠️ Convenciones de código

### **Imports con Path Aliases**
```typescript
// ✅ Correcto
import { useGameStore } from '@/store/gameStore';
import { useTranslation } from '@/i18n';
import { Button, Counter } from '@/components/ui';

// ❌ Evitar
import { useGameStore } from '../../store/gameStore';
```

### **Componentes**
```typescript
// PascalCase para componentes
export default function GameSetupScreen() { }

// camelCase para hooks
export function useTranslation() { }

// UPPER_SNAKE_CASE para constantes
export const GAME_CONFIG = { ... } as const;
```

### **Archivos**
- Componentes: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utils: `camelCase.ts`
- Types: `camelCase.ts`

## 📦 Scripts disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo (localhost:5173)

# Build
npm run build            # Build optimizado para producción
npm run preview          # Preview del build

# Deploy
npm run deploy           # Deploy automático a GitHub Pages

# Linting
npm run lint             # ESLint check
```

## 🎮 Reglas del juego

### **Roles**
- **Civil**: Conoce la palabra secreta. Debe dar pistas para encontrar al impostor
- **Impostor**: NO conoce la palabra. Debe fingir que la conoce e identificar la categoría

### **Fases**
1. **Setup** - Configurar partida (3-16 jugadores, 1-N impostores)
2. **Revelación** - Cada jugador ve su rol EN PRIVADO
3. **Discusión** - 3 minutos para dar pistas y debatir
4. **Votación** - Votar al jugador más sospechoso
5. **Resolución** - Ver si era impostor o civil
6. **Repetir** hasta que gane un equipo

### **Victoria**
- **Civiles**: Eliminan a TODOS los impostores
- **Impostores**: Sobreviven hasta que queden pocos civiles

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### **Commits Convencionales**
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `refactor:` Refactorización de código
- `style:` Cambios de estilos
- `docs:` Documentación
- `chore:` Tareas de mantenimiento

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## 👤 Autor

**nel386**
- GitHub: [@nel386](https://github.com/nel386)
- Project: [impostor-game](https://github.com/nel386/impostor-game)

## 🙏 Agradecimientos

- Inspirado en juegos como **Among Us** y **Mafia**
- UI inspirada en **shadcn/ui** y **Radix UI**
- Iconos de **React Icons (Lucide)**
- Animaciones con **Framer Motion**
- State management con **Zustand**

## 📊 Stats del proyecto

- **Componentes**: 15+ componentes reutilizables
- **Screens**: 6 pantallas completas
- **Categorías**: 20+ categorías con 100+ palabras
- **Idiomas**: 2 (Español e Inglés)
- **Líneas de código**: ~2500 LOC
- **Bundle size**: < 200KB (optimizado)

---

<div align="center">

⭐️ **Dale una estrella si te ha gustado el proyecto** ⭐️

Hecho con ❤️ por [nel386](https://github.com/nel386)

</div>
