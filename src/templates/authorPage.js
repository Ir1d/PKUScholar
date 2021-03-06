import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import AuthorIntro from '../components/AuthorIntro'
import AuthorPapers from '../components/AuthorPapers'
import Meta from '../components/Meta'

const Authors = ({ pageContext, data, curPaper, location }) => {
  // const { pid } = pageContext
  const mdx = data.mdx
  // console.log(data)
  const cn_name = mdx.frontmatter.cn_name || ''
  const img_src = mdx.frontmatter.img_src || ''
  const homePage = mdx.frontmatter.homepage || ''
  const intro = mdx.frontmatter.intro || ''
  // const publicationTitles = mdx.frontmatter.publicationTitles || ''
  // const google_info = mdx.frontmatter.google_info || ''
  // const affiliation = google_info.affiliation || ''
  // const citedby = google_info.citedby || ''
  const relativePath = mdx.parent.relativePath || ''
  const modifiedTime = mdx.parent.modifiedTime || ''
  // console.log(google_info)
  // console.log(data.curPaper)
  return (
    <Layout location={location} noMeta="true">
      <Helmet title={` ${cn_name} - PKU Scholar`}></Helmet>
      <div>
        <h1>{cn_name}</h1>
        <AuthorIntro
          intro={intro}
          cn_name={cn_name}
          img_src={img_src}
          // citedby={citedby}
          homePage={homePage}
        ></AuthorIntro>
        <AuthorPapers
          papers={data.curPaper}
          cn_name={cn_name}
          // publicationTitles={publicationTitles}
        ></AuthorPapers>
        <Link to="/authors">Click to see authors list</Link>
        <Meta
          authors=""
          tags=""
          relativePath={relativePath}
          modifiedTime={modifiedTime}
          noMeta="false"
          prefix="author/"
        ></Meta>
      </div>
    </Layout>
  )
}

// Authors.propTypes = {
//   pageContext: PropTypes.shape({
//     author: PropTypes.string.isRequired,
//   }),
//   data: PropTypes.shape({
//     allMdx: PropTypes.shape({
//       totalCount: PropTypes.number.isRequired,
//       edges: PropTypes.arrayOf(
//         PropTypes.shape({
//           node: PropTypes.shape({
//             frontmatter: PropTypes.shape({
//               title: PropTypes.string.isRequired,
//             }),
//             fields: PropTypes.shape({
//               slug: PropTypes.string.isRequired,
//             }),
//           }),
//         }).isRequired
//       ),
//     }),
//   }),
// }

export default Authors

export const pageQuery = graphql`
  query($id: String, $pid: String) {
    mdx: mdx(id: { eq: $id }, fields: { sourceName: { eq: "author" } }) {
      id
      fields {
        slug
      }
      frontmatter {
        cn_name
        img_src
        homepage
        intro
      }
      toc: tableOfContents
      parent {
        ... on File {
          relativePath
          modifiedTime(formatString: "YYYY/MM/DD")
        }
      }
    }
    curPaper: allPapersJson(
      limit: 2000
      sort: { fields: [mdate], order: DESC }
      filter: {
        author_keys: { in: [$pid] }
      }
    ) {
      totalCount
      edges {
        node {
          article_key
            title
            mdate
        }
      }
    }
  }
`
