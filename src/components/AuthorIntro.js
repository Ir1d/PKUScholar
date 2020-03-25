/** @jsx jsx */
import { jsx } from "theme-ui"
import { Avatar, Row, Col, Card } from "antd"
import { ChipSet, Chip } from "@material/react-chips"

function AuthorIntro({ cn_name, intro, img_url }) {
  return (
    <div>
      <Row>
        <Col span={18}>
          <Card
            title={cn_name}
            headStyle={{ fontSize: "1rem" }}
            bodyStyle={{ fontSize: "16px" }}
            sx={{
              padding: "0 24px",
              p: {
                lineHeight: "2rem",
              },
              ol: {
                lineHeight: "2rem",
              },
              ul: {
                lineHeight: "2rem",
              },
              color: "#304455",
            }}
            bordered={false}
          >
            <ChipSet>
              {intro
                ? intro.map(item =>
                    item.indexOf("个人主页") > -1 ? (
                      // 去掉 intro 里面的个人主页，因为和 homepage 字段重复了
                      ""
                    ) : (
                      <Chip label={` ${item} `} key={item}></Chip>
                    )
                  )
                : ""}
            </ChipSet>
          </Card>
        </Col>

        <Col span={6}>
          <Avatar src={img_url} size={128} />
        </Col>
      </Row>
    </div>
  )
}

export default AuthorIntro
