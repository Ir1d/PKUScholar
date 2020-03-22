const path = require("path")

module.exports = {
  siteMetadata: {
    title: "OI Wiki",
    description: "Guide for OI",
    author: "OI Wiki Team",
  },
  plugins: [
    `gatsby-source-local-git`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "./docs/",
        path: "./docs/",
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              withWebp: true,
              tracedSVG: false,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              // By default, `.md` is specified
              // ignoreFileExtensions: ['.md']
              // These files will not be copied
              ignoreFileExtensions: [".md"],
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              isIconAfterHeader: true,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "Dark+ (default dark)", // Read on for list of included themes. Also accepts object and function forms.
              wrapperClassName: "", // Additional class put on 'pre' tag. Also accepts function to set the class dynamically.
              injectStyles: true, // Injects (minimal) additional CSS for layout and scrolling
              extensions: [], // Extensions to download from the marketplace to provide more languages and themes
              // Absolute path to the directory where extensions will be downloaded. Defaults to inside node_modules.
              extensionDataDirectory: path.resolve("extensions"),
              languageAliases: {}, // Map of custom/unknown language codes to standard/known language codes
              replaceColor: x => x, // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
              getLineClassName: ({
                // Function allowing dynamic setting of additional class names on individual lines
                content, //   - the string content of the line
                index, //   - the zero-based index of the line within the code fence
                language, //   - the language specified for the code fence
                meta, //   - any options set on the code fence alongside the language (more on this later)
              }) => "",
              logLevel: "warn", // Set to 'info' to debug if something looks wrong
            },
          },
        ],
        remarkPlugins: [require("remark-math"), require("remark-details")],
        rehypePlugins: [require("rehype-mathjax"), require("rehype-details")],
        extensions: [".mdx", ".md"],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `OI Wiki`,
        short_name: `OI Wiki`,
        start_url: `/`,
        display: `standalone`,
        icon: `icon/favicon_512x512.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [],
        workboxConfig: {
          importWorkboxFrom: `local`,
          globPatterns: ["page-data/**", "*.js"],
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$)/, // js and css
              handler: `CacheFirst`,
            },
            {
              urlPattern: /^https?:.*\.(json)$/, // page-data
              handler: `NetworkFirst`,
            },
            {
              urlPattern: /^https?:.*\.(woff|woff2)$/, // mathjax fonts
              handler: `StaleWhileRevalidate`,
            },
            {
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff)$/, // do not cache images
              handler: `NetworkOnly`,
            },
          ],
          skipWaiting: true,
          clientsClaim: true,
        },
      },
    },
    // "gatsby-plugin-webpack-bundle-analyser-v2"
    // when you need to analyze bundle size, enable it
  ],
}
