import { Popover, Typography, List, Divider, Button } from 'antd'
import React, { memo } from 'react'
import { useProjects } from '../../utils/project'
import { Container } from './css/style'


interface Props {
  projectButton?: JSX.Element
}
const PopOver = memo((props: Props) => {
  const {data: projectList, isLoading} = useProjects()
  const pinnedProjects = projectList?.filter(project => project.pin)
  const content = (
    <Container>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {
          pinnedProjects?.map(project => (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name}></List.Item.Meta>
            </List.Item>
          ))
        }
      </List>
      <Divider></Divider>
      {props.projectButton}
    </Container>
  )
  return (
    <Popover placement={'bottom'} content={content}>项目</Popover>
  )
})

export default PopOver