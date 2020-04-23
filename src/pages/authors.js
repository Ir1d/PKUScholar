import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabCase'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Link from '../components/Link'

const AuthorsPage = ({ data, location }) => {
  // console.log(data)
  const group = data.allMdx.nodes
  return (
    <Layout location={location} noMeta="true">
      <Helmet title="作者页 - OI Wiki"></Helmet>
      <div>
        <h1>Authors</h1>
        <ul>
          {group.map(author => (
            <li key={author.frontmatter.en_name}>
              <Link to={`/author/${author.frontmatter.en_name}/`}>
                {author.frontmatter.cn_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

// AuthorsPage.propTypes = {
//   data: PropTypes.shape({
//     allMdx: PropTypes.shape({
//       group: PropTypes.arrayOf(
//         PropTypes.shape({
//           fieldValue: PropTypes.string.isRequired,
//           totalCount: PropTypes.number.isRequired,
//         }).isRequired
//       ),
//     }),
//     site: PropTypes.shape({
//       siteMetadata: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//       }),
//     }),
//   }),
// }

export default AuthorsPage

export const pageQuery = graphql`
  query {
    allMdx(filter: { fields: { sourceName: { eq: "author" } } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          cn_name
          en_name
        }
      }
    }
  }
`
