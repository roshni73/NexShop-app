# NexShop - Ecommerce

This is a frontend application for an e-commerce platform,. The project is built with Next.js and utilizes the App Router.

## Core Technologies

*   **Framework:** Next.js
*   **Authentication:** NextAuth.js (Auth.js)
*   **State Management:** Redux Toolkit
*   **Linting:** ESLint
*   **Font:** Geist via `next/font`

## Getting Started

First, run the development server:

Make sure you have Node.js and a package manager (like pnpm, npm, or yarn) installed.

### Installation & Setup

1.  **Clone the repository and navigate into the project directory.**


2.  **Install dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project. You will need to add secrets for authentication providers.
    ```env
    # .env.local
    AUTH_SECRET="your-super-secret-auth-secret"

    # Example for Google Provider
    # AUTH_GOOGLE_ID="..."
    # AUTH_GOOGLE_SECRET="..."
    ```
    You can generate a suitable `AUTH_SECRET` by running:
    ```bash
    npx auth secret
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Linting

This project is set up with ESLint for linting. You can run the linter with the following command:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
# or
bun lint
```
### Knip

This project is set up with Knip to detect unused dependencies and exported types.
You can run Knip with the following commands:

```bash
npx knip
# or
yarn knip
# or
pnpm knip
# or
bun knip
```
