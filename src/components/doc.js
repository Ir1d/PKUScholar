import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Layout from '../components/Layout'
import PaperIntro from '../components/PaperIntro'

function mdx ({ data: { mdx }, location }) {
  // const headingTitle = mdx.headings[0] && mdx.headings[0].value
  const title = mdx.article_key === '/' ? null : mdx.title
  const description = mdx.description || mdx.excerpt
  const authors = mdx.author_names || null
  const tags = mdx.tags || null
  const noMeta = mdx.noMeta || 'false'
  const link = mdx.ee || 'false'
  const year = mdx.year || 'false'
  const venue = mdx.venue || 'false'
  const bibtex = mdx.bib_text || "false"
  const authors_key = mdx.author_keys || null
  const toc = mdx.toc || null
  // console.log(mdx)
  const relativePath = mdx.parent.relativePath || ''
  const modifiedTime = mdx.parent.modifiedTime || ''

  return (
    <Layout
      location={location}
      authors_key={authors_key}
      authors={authors}
      title={title}
      description={description}
      tags={tags}
      toc={toc}
      relativePath={relativePath}
      modifiedTime={modifiedTime}
      noMeta={noMeta}
    >
      <PaperIntro
        link={link}
        year={year}
        venue={venue}
        bibtex={bibtex}
        authors_key={authors_key}
      ></PaperIntro>
      {/* <MDXRenderer>{mdx.body}</MDXRenderer> */}
    </Layout>
  )
}

export default mdx
