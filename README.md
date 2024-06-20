# Inflexa Admin Site

A robust Bun-based Admin Site starter built using Vite, React, and Tailwind CSS. This starter offers a solid foundation for your Admin Site development, allowing you to focus on your unique business logic.

## Getting Started

To install bun and starter packages.

```bash
curl -fsSL https://bun.sh/install | bash

bun install
```

### Environment Variables

Create a `.env` file in the root directory of your project. Add environment-specific variables on new lines in the form of `VITE_API_URL=<The value of the inflexa-api>`. In this case it should be `VITE_API_URL=http://localhost:5050`.

## Development

To start the development server run:

```bash
$ bun run dev
$ vite
Re-optimizing dependencies because lockfile has changed

  VITE v5.2.11  ready in 153 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open <http://localhost:5173/> with your browser to see the result.

## Folder Structure

The project structure is as follows:

```
  src/api           # API client for interacting with the api server (Using TanStack Query)
  src/assets        # Assets such as images, fonts, etc.
  src/components    # Reusable components used throughout the application
  src/lib           # Utility functions, types, schemas, i18n etc.
  src/pages         # Page components that are used to render different routes
  src/routes        # Route configuration for the application
  src/layouts       # Layout components that are used to render different layouts
  src/contexts      # React context providers
  src/providers     # Custom providers for the application
```
