import React, { memo, useEffect, useState } from 'react'
import SearchPanel from '@/views/home/component/searchPanel'
import SearchList from '@/views/home/component/searchList'
import { useDebounce, useDocumentTitle } from '@/utils'
import { useAuth } from '@/context/auth-context'
import { Dropdown, Typography } from 'antd'
import type { MenuProps } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons'
import { useProjects } from '@/views/home/utils/project'
import { useUsers } from '@/views/home/utils/user'
import { Container, Footer, Header, HeaderLeft, HeaderRight, Main, CustomButton } from './css/style'
import { useProjectsSearchParams } from './utils'
import PopOver from './component/popOver'
import ProjectDrawer from './component/projectDrawer'

const Home = memo(() => {
  const [param, setParam] = useProjectsSearchParams()
  const { user,logout } = useAuth()
  // 获取工程数据data
  const { isLoading, error, data:list, retry } = useProjects(useDebounce(param, 100))
  // 获取用户数据
  const { data:users } = useUsers()

  const menuItemClick: MenuProps['onClick'] = ({ key }) => {
    if(key === '0') {
      logout()
    }
  };

  const [projectDrawerOpen, setProjectDrawerOpen] = useState(false);
  const projectDrawerOnClose = () => {
    setProjectDrawerOpen(false)
  }

  const projectDrawerOnOpen = () => {
    setProjectDrawerOpen(true)
  }

  const CreateProjectButton = (<CustomButton type='link' onClick={projectDrawerOnOpen}>创建项目</CustomButton>)
  const EditProjectButton = (<CustomButton type='link' onClick={projectDrawerOnOpen}>编辑</CustomButton>)
  

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <AntDesignOutlined style={{color: '#2676fd'}} />
          <span>Jira Software</span>
          <PopOver projectButton={CreateProjectButton}/>
          <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
        <Dropdown menu={{ 
            items: [
              {
                label: (
                  <span>退出登录</span>
                ),
                key: '0',
              },
            ], 
            onClick: menuItemClick }}>
          <span style={{color: '#2676fd', fontWeight: 700, cursor: 'pointer'}}>{user ? `Hi, ${user.username}` : '-'}</span>
        </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <SearchPanel users={users || []} param={param} setParam={setParam} projectButton={CreateProjectButton}></SearchPanel>
        { error ? <Typography.Text type="danger">{ error.message }</Typography.Text> : null }
        <SearchList users={users || []} list={list || []} loading={isLoading} retry={retry} projectButton={EditProjectButton}></SearchList>
      </Main>  
      <Footer>footer</Footer>
      <ProjectDrawer onClose={projectDrawerOnClose} open={projectDrawerOpen}></ProjectDrawer>
    </Container>
  )
})

export default Home