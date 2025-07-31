# Bigscreen Survey Frontend

This project is the frontend for the Bigscreen survey application, built with React, Vite, and TypeScript.

## Features
- Public survey page (20 questions, all required)
- Unique URL for users to consult their answers
- Admin interface (login, dashboard with charts, questions table, answers table)
- Modern UI, ready to connect to a Laravel backend

## Project Structure
- `/src/pages/Survey.tsx` — Public survey form
- `/src/pages/Answers.tsx` — User answers consultation
- `/src/admin/` — Admin area (login, dashboard, questions, answers)

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

## Tech Stack
- React + Vite + TypeScript
- Chart.js (for admin statistics)
- React Router (for navigation)

## Notes
- All code, variables, and UI fields are in English.
- camelCase/PascalCase naming is enforced.
- All methods and properties are commented.
- Forms are validated according to backend rules.

---
For more details, see `.github/copilot-instructions.md`.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
