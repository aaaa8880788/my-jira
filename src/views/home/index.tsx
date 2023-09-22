import React, { memo, useEffect, useState } from 'react'
import SearchPanel from '@/components/search-panel'
import SearchList from '@/components/search-list'
import { cleanObject,useDebounce } from '@/utils'
import { useHttp } from '@/service'
import { useAuth } from '@/context/auth-context'
import { Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons'
import styled from 'styled-components'

interface User {
  id: number,
  name: string
}

interface Params {
  name: string,
  personId: string
}

interface List {
  id: number,
  name: string,
  personId: number,
  organization: string,
  created: number,
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas: 
  "header header header"
  "main main main"
  "footer footer footer"
  ;
`

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 5px 5px #e7e7e7;
  padding: 0px 60px;
`
const HeaderLeft = styled.div`
  font-size: 20px;
  span {
    margin-right: 15px;
    cursor: pointer;
    font-weight: 700;
  }
`
const HeaderRight = styled.div`
`

const Main = styled.main`
  grid-area: main;
  padding: 40px;
`

const Footer = styled.footer`
  grid-area: footer;
`

const Home = memo(() => {
  const [params, setParams] = useState<Params>({
    name: '',
    personId: ''
  })
  const debounceParams = useDebounce(params, 100)
  
  const [list, setList] = useState<Array<List>>([])
  const [users, setUsers] = useState<Array<User>>([])
  const client = useHttp()
  const { login,register,user,logout } = useAuth()

  const menuItemClick: MenuProps['onClick'] = ({ key }) => {
    if(key === '0') {
      logout()
    }
  };

  // 获取工程数据
  useEffect(() => {
    client(`/projects`, {
      data: cleanObject(debounceParams)
    }).then(async res => {
      // console.log('获取工程数据------', res);
      const projectList = res
        setList(projectList)
    })
  }, [debounceParams])
  // 获取用户数据
  useEffect(() => {
    client(`/users`).then(async res => {
      // console.log('获取用户数据------', res);
      const users = res
        setUsers(users)
    })
  }, [])
  

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
        <SearchPanel users={users} params={params} setParams={setParams}></SearchPanel>
        <SearchList users={users} list={list}></SearchList>
      </Main>
      <Footer>footer</Footer>
    </Container>
  )
})

export default Home