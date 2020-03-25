import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Tags from "../components/Tags"
import { Card, Row, Col, Select } from "antd"
import Helmet from "react-helmet"
const { Option } = Select
import theme from "../theme"
import { Menu, Input } from "antd"
import { EditFilled, CaretDownFilled } from "@ant-design/icons"
const { SubMenu } = Menu
const { Search } = Input
import Link from "../components/Link"

class BlogIndex extends React.Component {
  data
  location
  children = []
  posts
  group
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: [],
    }
    this.data = props.data
    this.location = props.location
    const { edges: posts, group } = this.data.allMdx
    this.posts = posts
    this.group = group
    this.group.forEach(tag => {
      this.children.push(<Option key={tag.fieldValue}>{tag.fieldValue}</Option>)
    })
  }
  handleChange(value) {
    this.setState({
      selectedKeys: value,
    })
  }
  render() {
    return (
      <Layout location={this.location} noMeta="true">
        <Helmet title="PKU Scholar"></Helmet>
        <h2>Welcome to PKU Scholar </h2>
        <div>
          <ul>
            <li>
              <Link to="/papers">Papers</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
          </ul>
        </div>
        <Search
          placeholder="键入进行搜索"
          onSearch={value => /*console.log(value)*/ value}
          style={{ "margin-top": 50, "margin-bottom": 300 }}
        />
      </Layout>
    )
  }
}
export const pageQuery = graphql`
  query blogIndex {
    allMdx {
      edges {
        node {
          id
          frontmatter {
            title
            tags
          }
          fields {
            slug
          }
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
export default BlogIndex
