# Orbit Jira Dashboard

A high-performance, Chief-of-Staff grade dashboard for Jira, built with Next.js, Docker, and Recharts.

![Dashboard Preview](public/dashboard-preview.png)

## Features

- **Strategic Roadmap**: Gantt-style visualization of initiatives.
- **Engineering Radar**: Multi-dimensional health metrics.
- **Rovo Intelligence**: AI-powered Q&A for project risks (powered by Gemini).
- **Dockerized**: specific container support for easy deployment.

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Jira Cloud Account (API Token)
- Gemini API Key

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/danielherrington/jira-dashboard.git
   cd jira-dashboard
   ```

2. **Configure Environment**
   Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your keys in `.env.local`.

3. **Run with Docker**

   ```bash
   docker compose up --build
   ```

   Access the dashboard at [http://localhost:3000](http://localhost:3000).

### Data Discovery (Optional)

To inspect your Jira configuration and customize the mapping:

1. Ensure `.env` exists with your keys (Note: the script uses `.env`, Next.js uses `.env.local`).
2. Run the discovery script:

   ```bash
   # If running locally with Node
   npx tsx scripts/discover-jira-structure.ts
   
   # Or via Docker (if Node is not installed locally)
   docker run --rm -v "$(pwd):/app" -w /app --env-file .env node:20-alpine npx -y tsx scripts/discover-jira-structure.ts
   ```

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
