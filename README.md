# EXIT Spiel Collection

A **React + Vite + TypeScript** app to manage and explore **EXIT: Das Spiel** board games.  
Features include filtering by difficulty, sorting by title/year/difficulty, and linking to BoardGameGeek pages.

![EXIT Games Screenshot](screenshot.png)

## Features

- ✅ Display all EXIT games in German with cover images
- ✅ Show year published and BGG difficulty (average weight)
- ✅ Filter by minimum difficulty
- ✅ Sort by title, year, or difficulty (ascending/descending)
- ✅ Responsive grid layout with TailwindCSS
- ✅ Components powered by [shadcn/ui](https://ui.shadcn.com)

## Tech Stack

- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/) (React + TypeScript)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com) (prebuilt UI components)
- [BoardGameGeek JSON](./src/data/games.json) (scraped via Node.js)

## Installation

1. Clone the repo:

```bash
git clone https://github.com/your-username/exit-games-app.git
cd exit-games-app
