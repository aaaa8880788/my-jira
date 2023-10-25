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
import { Container, Footer, Header, HeaderLeft, HeaderRight, Main } from './css/style'
import { useProjectsSearchParams } from './utils'

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
  

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <AntDesignOutlined style={{color: '#2676fd'}} />
          <span>Jira Software</span>
          <span>项目</span>
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
        <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
        { error ? <Typography.Text type="danger">{ error.message }</Typography.Text> : null }
        <SearchList users={users || []} list={list || []} loading={isLoading} retry={retry}></SearchList>
      </Main>
      <Footer>footer</Footer>
    </Container>
  )
})

export default Home