import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import kebabCase from "lodash/kebabCase"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Link from "../components/Link"

const AuthorsPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => (
  <Layout location={location} noMeta="true">
    <Helmet title="标签页 - OI Wiki"></Helmet>
    <div>
      <h1>Authors</h1>
      <ul>
        {group.map(author => (
          <li key={author.fieldValue}>
            <Link to={`/author/${kebabCase(author.fieldValue)}/`}>
              {author.fieldValue} ({author.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

AuthorsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default AuthorsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___authors) {
        fieldValue
        totalCount
      }
    }
  }
`
