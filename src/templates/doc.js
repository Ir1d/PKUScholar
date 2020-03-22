import { graphql } from "gatsby"
import React from "react"
import Doc from "../components/doc"
import "../other/css/style.css"

export default ({ data, location }) => {
  // console.log(data)
  return <Doc data={data} location={location} />
}

export const query = graphql`
  query($id: String!) {
    mdx: mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      excerpt
      body
      headings {
        value
      }
      frontmatter {
        author
        tags
        title
        noMeta
        noComment
      }
      toc: tableOfContents
      parent {
        ... on File {
          relativePath
          modifiedTime(formatString: "YYYY/MM/DD")
        }
      }
    }
  }
`
