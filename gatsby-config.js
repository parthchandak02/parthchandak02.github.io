module.exports = {
  siteMetadata: {
    title: 'Parth Chandak',
    description:
      'Parth Chandak is a creative technologist working on cutting-edge user experiences (HW & SW) for autonomous vehicles in dense urban environments.',
    siteUrl: 'https://parthchandak02.github.io', // No trailing slash allowed!
    image: '/og.png', // Path to your image you placed in the 'static' folder
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter:300,400,500,600,700,800,900`,
          `Space Grotesk:300,400,500,600,700`,
          `JetBrains Mono:300,400,500,600,700`,
        ],
        display: 'swap',
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Parth Chandak',
        short_name: 'Parth Chandak',
        start_url: '/',
        background_color: '#0a192f',
        theme_color: '#112240',
        display: 'minimal-ui',
        icon: 'src/images/logo-p.svg',
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
              tracedSVG: { color: '#64ffda' },
            },
          },
          {
            resolve: 'gatsby-remark-code-titles',
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },
        ],
      },
    },
  ],
};
