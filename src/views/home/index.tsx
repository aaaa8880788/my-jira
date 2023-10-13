import React, { memo, useEffect, useState } from 'react'
import SearchPanel from '@/components/search-panel'
import SearchList from '@/components/search-list'
import { useDebounce, useDocumentTitle } from '@/utils'
import { useAuth } from '@/context/auth-context'
import { Dropdown, Typography } from 'antd'
import type { MenuProps } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons'
import { useProjects } from '@/utils/project'
import { useUsers } from '@/utils/user'
import { Container, Footer, Header, HeaderLeft, HeaderRight, Main } from './style'

type Params = {
  name: string,
  personId: string
}

const Home = memo(() => {
  const [params, setParams] = useState<Params>({
    name: '',
    personId: ''
  })
  const debounceParams = useDebounce(params, 100)
  const { user,logout } = useAuth()
  // 获取工程数据data
  const { isLoading, error, data:list } = useProjects(debounceParams)
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
        <SearchPanel users={users || []} params={params} setParams={setParams}></SearchPanel>
        { error ? <Typography.Text type="danger">{ error.message }</Typography.Text> : null }
        <SearchList users={users || []} list={list || []} loading={isLoading}></SearchList>
      </Main>
      <Footer>footer</Footer>
    </Container>
  )
})

export default Home