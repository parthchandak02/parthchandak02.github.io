This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

## Component Architecture

The portfolio site is built with a modular component structure:

### Core Components

1. `LiquidGlass.tsx` - Base component that provides the glass morphism effect used throughout the site
   - Implements customizable glass presets (primary/secondary)
   - Used by all other components for consistent glass styling

### Layout Components

2. `LeftNavigation.tsx` - Main navigation sidebar
   - Uses LiquidGlass for styling
   - Handles section filtering and navigation
   - Displays main content categories

3. `RightSocialBar.tsx` - Social media links sidebar
   - Uses LiquidGlass for styling
   - Shows social media and contact links

4. `PortfolioTimeline.tsx` - Main content display
   - Uses LiquidGlass for card styling
   - Displays timeline of projects, experience, etc.
   - Handles content filtering based on selected section

### Supporting Components

5. `BackgroundProvider.tsx` - Manages site-wide background effects
   - Controls background patterns and animations

6. `ExpandableTag.tsx` & `TagsDisplay.tsx` - Tag system components
   - Handle display and interaction of skill/technology tags
   - Used within timeline cards

7. `TypewriterText.tsx` - Animated text component
   - Provides typewriter animation effect for text

### Data Management

- `portfolio-data.ts` - Central data store
  - Contains all portfolio content
  - Structured by sections (experience, projects, etc.)

- `organizePortfolioData.ts` - Data processing utility
  - Organizes and sorts portfolio data for display

### Type Definitions

- `portfolio.ts` - TypeScript interfaces
  - Defines data structure types
  - Ensures type safety across components

### Page Structure

- `page.tsx` - Main page component
  - Assembles all components
  - Handles layout and component coordination

- `layout.tsx` - Root layout
  - Sets up global styles and providers
  - Manages font loading and meta data

- `globals.css` - Global styles
  - Defines common styles and variables
  - Sets up glass effect base styles

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Portfolio deployment ready
Deployment confirmed working Sun Jul  6 05:40:01 PDT 2025
