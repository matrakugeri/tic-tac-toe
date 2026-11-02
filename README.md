# Tic Tac Toe Tournament

## Overview

A modern, fully reactive Tic Tac Toe tournament application built with **Angular v22**. The application allows two players to set up custom tournaments, track series scores in real time and experience a real competition.

## Features

- **Tournament Management:** Play multi-game series with automatic round transitions, live score updates, and win/draw analytics.
- **Reactive State Flow:** Fine-grained state updates powered by RxJS streams bridged with Angular Signals.
- **Guarded Navigation:** Protected routing flow preventing access to active games without setup, or accidental navigation away mid-tournament.
- **Custom UI Components:** Independent components for Setup, Game Board, Scoreboard, and Tournament Summary with custom SCSS design tokens.

## Documentation & Architecture

### Core Layer (`src/app/core`)

- **State & Logic (`services/game/`):** Separated into `game-service.ts` for handling game actions and business logic and `game-state.ts` for managing reactive tournament state.
- **Data Models (`models/`):** Contains TypeScript definitions and state interfaces (`game-model.ts`) enforcing strict typing throughout the application.
- **Route Security (`guards/`):** Implements functional Angular guards (`game-guard.ts` and `setup-guard.ts`) to validate tournament setup prior to match entry and protect active session state from unauthorized navigation.
- **Storage (`storage/`):** Provides a dedicated storage abstraction layer for preserving game settings or history.

### Application Pages & Standalone Components (`src/app/pages`)

- **Setup Feature (`pages/setup/`):** The main setup page and the `setup-form` component, handling form validation and inputs.
- **Game Feature (`pages/game/`):** Controls the active tournament lifecycle. Sub-components are divided into clear responsibilities:
  - **`board`:** Interactive 3x3 grid component responsible for handling move inputs and rendering board tiles.
  - **`scoreboard`:** Displays current round information, active turn indicators and real-time player scores.
  - **`tournament-summary`:** Renders final series results, winner announcements and game reset options.

### Global Styling System (`src/app/styles`)

- **`_variables.scss`:** Stores CSS custom properties for application colors, typography, etc.
- **`_mixins.scss`:** Provides reusable SCSS utility mixins.
- **`_buttons.scss`:** Button component variants (primary, secondary) used across forms and game action panels.
- **`_reset.scss`:** Normalizes default browser element styles and rules.


## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v22+)
- **npm**
- **Angular CLI** (v22)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/matrakugeri/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open the application**

   Navigate to `http://localhost:4200/` in your browser.
