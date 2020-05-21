const path = require("path")
const _ = require("lodash")
// import JSONData from "../../content/My-JSON-Content.json"

const { createFilePath } = require("gatsby-source-filesystem")
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  // console.log(node.internal.type);
  // if (node.internal.type === "PapersJson") {
  //   console.log(node.article_key)
  //   createNodeField({
  //     // Name of the field you are adding
  //     name: "slug",
  //     // Individual MDX node
  //     node,
  //     // Generated value based on filepath with "blog" prefix. you
  //     // don't need a separating "/" before the value because
  //     // createFilePath returns a path with the leading "/".
  //     value: `/paper/${encodeURI(node.article_key)}`,
  //     // value: `/author${value}`,
  //   })
  // }
  if (node.internal.type === "Mdx") {
    // console.log(node)
    const value = encodeURI(createFilePath({ node, getNode }))
    const parent = getNode(node.parent)

    if (parent.internal.type === "File") {
      createNodeField({
        name: `sourceName`,
        node,
        value: parent.sourceInstanceName,
      })
    }
    // if (node.fileAbsolutePath.indexOf("author") > -1)
    if (parent.sourceInstanceName === "author") {
      createNodeField({
        // Name of the field you are adding
        name: "slug",
        // Individual MDX node
        node,
        // Generated value based on filepath with "blog" prefix. you
        // don't need a separating "/" before the value because
        // createFilePath returns a path with the leading "/".
        value: `/author/${encodeURI(node.frontmatter.pid)}`,
        // value: `/author${value}`,
      })
      // console.log(`/author/${encodeURI(node.frontmatter.en_name)}`)
    }
  }
}

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   // Destructure the createPage function from the actions object
//   const { createPage } = actions

//   const result = await graphql(`
//     query {
//       allMdx {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (result.errors) {
//     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
//   }

//   // Create blog post pages.
//   const posts = result.data.allMdx.edges

//   // you'll call `createPage` for each result
//   posts.forEach(({ node }, index) => {
//     createPage({
//       // This is the slug you created before
//       // (or `node.frontmatter.slug`)
//       path: node.fields.slug,
//       // This component will wrap our MDX content
//       component: path.resolve(`./src/components/posts-page-layout.js`),
//       // You can use the values in this context in
//       // our page layout component
//       context: { id: node.id },
//     })
//   })
// }

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const docTemplate = path.resolve("src/templates/doc.js")
  // const jsonTemplate = path.resolve("src/templates/json.js")
  const authorTemplate = path.resolve("src/templates/authorPage.js")
  // const tagTemplate = path.resolve("src/templates/tags.js")

  const result = await graphql(`
    {
      authors: allMdx(
        sort: { order: DESC, fields: [frontmatter___title] }
        limit: 2000
        filter: { fields: { sourceName: { eq: "author" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            id
            frontmatter {
              pid
            }
          }
        }
      }
      papersGroup: allPapersJson {
        edges {
          node {
            article_key
            id
          }
        }
      }
    }
    `)
    // tagsGroup: allPapersJson(limit: 2000) {
    //   group(field: tags) {
    //     fieldValue
    //   }
    // }
    
  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // const papers = result.data.papers.edges
  // // console.log(posts)
  // // Create post detail pages
  // papers.forEach(({ node }, index) => {
  //   const previous = index === papers.length - 1 ? null : papers[index + 1]
  //   const next = index === 0 ? null : papers[index - 1]
  //   createPage({
  //     path: node.fields.slug,
  //     component: docTemplate,
  //     context: {
  //       id: node.id,
  //       previous,
  //       next,
  //     },
  //   })
  // })
  // const papers = JSON.parse(fs.readFileSync("./papers.json", "utf-8"))

  // Object.entries(papers).forEach((data) => {
  //   // console.log(papers[key])
  //   const id = data[0];
  //   const curPaper = data[1];
  //   createPage({
  //     path: id,
  //     component: jsonTemplate,
  //     context: {
  //       title: curPaper['title'],
  //       authors: curPaper['authors'],
  //       year: curPaper['year'],
  //       article_link: curPaper['article_link'],
  //       venue: curPaper['venue'],
  //       bibex: curPaper['bibex'],
  //     }
  //   })
  // });

  const authors = result.data.authors.edges
  // console.log(authors)
  // Create post detail pages
  authors.forEach(({ node }, index) => {
    // console.log(node.frontmatter.en_name)
    const previous = index === authors.length - 1 ? null : authors[index + 1]
    const next = index === 0 ? null : authors[index - 1]
    createPage({
      path: node.fields.slug,
      component: authorTemplate,
      context: {
        id: node.id,
        pid: node.frontmatter.pid,
        previous,
        next,
      },
    })
    // console.log(node.frontmatter)
  })

  // const tags = result.data.tagsGroup.group

  // // Make tag pages
  // tags.forEach(tag => {
  //   createPage({
  //     path: `/tag/${_.kebabCase(tag.fieldValue)}/`,
  //     component: tagTemplate,
  //     context: {
  //       tag: tag.fieldValue,
  //     },
  //   })
  // })

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // const docs = result.data.allMdx.nodes

  /*
  docs.forEach((doc, index) => {
    // const previous = index === docs.length - 1 ? null : docs[index + 1]
    // const next = index === 0 ? null : docs[index - 1]
    const { slug } = doc.fields.slug
    console.log(slug)

    createPage({
      path: slug,
      component: DocTemplate,
      // context: {
      //   ...doc,
      //   previous,
      //   next
      // }
    })
  })
  */

  const papers = result.data.papersGroup.edges;
  papers.forEach(({ node }, index) => {
    // console.log(node.frontmatter.en_name)
    // const previous = index === authors.length - 1 ? null : authors[index + 1]
    // const next = index === 0 ? null : authors[index - 1]
    createPage({
      path: node.article_key,
      component: docTemplate,
      context: {
        id: node.id,
        // en_name: node.frontmatter.en_name,
        // previous,
        // next,
      },
    })
  })
}
