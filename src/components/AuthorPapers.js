import React from 'react'
import Link from './Link'

function AuthorPapers ({ papers, cn_name }) {
  const { edges, totalCount } = papers
  const authorHeader = `我们收录了 "${cn_name}" 的 ${totalCount} 篇 paper：`
  // console.log(publicationTitles)
  // console.log(papers)
  return (
    <div>
      <h2>{authorHeader}</h2>
      <ul>
        {edges.map(({ node }, index) => {
          const { article_key, title, mdate } = node
          return (
            <li key={index}>
              <Link to={article_key}>{title}, {mdate}</Link>
            </li>
          )
        })}
      </ul>
      {/* <h2>Google Scholar 收录情况：{publicationTitles.length} 篇 </h2>
      <ul>
        {publicationTitles.map((title, index) => {
          return <li key={index}>{title}</li>
        })}
      </ul> */}
    </div>
  )
}

export default AuthorPapers
