import { graphql } from 'gatsby'
import React from 'react'
import Doc from '../components/doc'
// import "../other/css/style.css"

export default ({ data, location }) => {
  // console.log(data)
  return <Doc data={data} location={location} />
}

export const query = graphql`
  query($id: String!) {
    mdx: papersJson(id: { eq: $id }) {
      id
      article_key
        author_names
        title
        author_keys
        ee
        bib_text
      parent {
        ... on File {
          relativePath
          modifiedTime(formatString: "YYYY/MM/DD")
        }
      }
    }
  }
`
