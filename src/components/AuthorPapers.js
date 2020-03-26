/** @jsx jsx */
import { jsx } from "theme-ui"
import Link from "./Link"
import { Avatar, Row, Col, Card } from "antd"
import { ChipSet, Chip } from "@material/react-chips"

function AuthorIntro({ papers, cn_name, publicationTitles }) {
  const { edges, totalCount } = papers
  const authorHeader = `我们收录了 "${cn_name}" 的 ${totalCount} 篇 paper：`
  // console.log(publicationTitles)
  return (
    <div>
      <h2>{authorHeader}</h2>
      <ul>
        {edges.map(({ node }, index) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={index}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <h2>待收录 paper：</h2>
      <ul>
        {publicationTitles.map((title, index) => {
          return <li key={index}>{title}</li>
        })}
      </ul>
    </div>
  )
}

export default AuthorIntro
