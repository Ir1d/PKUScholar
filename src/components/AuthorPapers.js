/** @jsx jsx */
import { jsx } from "theme-ui"
import Link from './Link'
import { Avatar, Row, Col, Card } from "antd"
import { ChipSet, Chip } from "@material/react-chips"

function AuthorIntro({ papers, cn_name }) {
  const { edges, totalCount } = papers
  const authorHeader = `我们收录了 "${cn_name}" 的 ${totalCount} 篇 paper`

  return (
      <div>
        <h1>{authorHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
  )
}

export default AuthorIntro
