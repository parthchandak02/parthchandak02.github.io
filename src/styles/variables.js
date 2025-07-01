import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #000000;          /* Pure black for background */
    --navy: #000000;               /* Black */
    --light-navy: #111111;         /* Very dark gray for cards */
    --lightest-navy: #1a1a1a;      /* Dark gray for subtle elements */
    --navy-shadow: rgba(0, 0, 0, 0.7);
    --dark-slate: #666666;         /* Medium gray for secondary text */
    --slate: #888888;              /* Light gray for secondary text */
    --light-slate: #cccccc;        /* Light gray for body text */
    --lightest-slate: #ffffff;     /* Pure white for headings */
    --white: #ffffff;              /* Pure white */
    --green: #cc4444;              /* Red for highlights/accents */
    --green-tint: rgba(204, 68, 68, 0.1); /* Red tint */
    --pink: #cc4444;               /* Red instead of pink */
    --blue: #cccccc;               /* Light gray instead of blue */

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 0px;
    --nav-scroll-height: 0px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
