require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteTitle: 'ringlets',
    siteTitleDefault: 'ringlets',
    siteUrl: 'https://ringlets.gatsbyjs.io',
    hrefLang: 'ja',
    siteDescription:
      '数年間誰の手にも渡らなかったお洋服。いつか捨てられてしまうかもしれないお洋服。きっと誰かに可愛がってもらえる日を心待ちにしている。そんなお洋服を集め、販売するアウトレットショップです。',
    siteImage: '/default-og-image.jpg',
    twitter: '@gatsbyjs',
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ['collections'],
      },
    },
    {
      resolve: 'gatsby-source-datocms',
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area. Make sure to grant both CDA and CMA permissions.
        apiToken: process.env.DATO_API_TOKEN,

        // The project environment to read from. Defaults to the primary environment:
        environment: 'main',

        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,

        // Custom API base URL (most don't need this)
        // apiUrl: 'https://site-api.datocms.com',

        // Setup locale fallbacks
        // In this example, if some field value is missing in Italian, fall back to English
        localeFallbacks: {
          it: ['en'],
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-gatsby-cloud',
    // Add your Google Analytics ID to the .env file to enable
    // Otherwise, this plugin can be removed
    process.env.GOOGLE_ANALYTICS_ID && {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    'gatsby-plugin-less',
    'gatsby-plugin-postcss',
  ].filter(Boolean),

};
