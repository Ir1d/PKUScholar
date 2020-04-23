import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Layout from '../components/Layout'
import PaperIntro from '../components/PaperIntro'

function mdx ({ data: { mdx }, location }) {
  const headingTitle = mdx.headings[0] && mdx.headings[0].value
  const title = mdx.slug === '/' ? null : mdx.frontmatter.title
  const description = mdx.description || mdx.excerpt
  const authors = mdx.frontmatter.authors || null
  const tags = mdx.frontmatter.tags || null
  const noMeta = mdx.frontmatter.noMeta || 'false'
  const link = mdx.frontmatter.article_link || 'false'
  const year = mdx.frontmatter.year || 'false'
  const venue = mdx.frontmatter.venue || 'false'
  const bibtex = mdx.frontmatter.bibex || 'false'
  const authors_key = mdx.frontmatter.authors_key || null
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
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  )
}

export default mdx
