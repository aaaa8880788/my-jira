import React, { memo, useState, useRef, FormEvent } from 'react'
import { Button, Form, FormInstance, Input, Divider } from 'antd';
import { useAuth } from '@/context/auth-context';
import styled from 'styled-components'

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
`

const Contanter = styled.div`
  width: 400px;
  height: 500px;
  box-shadow: 0px 0px 20px 5px #ccc;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Header = styled.div`
  font-size: 20px;
  color: rgb(98, 100, 115);
  text-align: center;
  height: 50px;
  line-height: 50px;
  margin-top: 40px;
`

const Main = styled.div`
  width: 100%;
  padding: 10px 30px 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 100%;
  }
`
const Btns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80px;
`

const Footer = styled.div`
  padding: 0 30px;
`

const FooterSpan = styled.div`
  text-align: center;
  color: #0946c1;
  font-weight: 700;
  cursor: pointer;
`

const Login = memo(() => {
  const [isLogin, setIsLogin] = useState(true)
  const {login, register} = useAuth()
  const formRef = useRef<FormInstance>(null);
  const onFinish = ({username, password} :{username: string, password: string}) => {
    if(isLogin) {
      login({
        username,
        password
      })
    }else {
      register({
      username,
      password
      })
    }
  }

  const onChangeStatus = () => {
    setIsLogin(!isLogin)
  }

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <LoginWrapper>
      <Contanter>
        <Header>
          <span>请登录</span>
        </Header>
        <Main>
          <Form 
            ref={formRef}
            name="formRef"
            onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder='请输入用户名'/>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input type='password' placeholder='请输入密码'/>
            </Form.Item>
            <Form.Item>
              <Btns>
                <Button htmlType='submit' type="primary">{isLogin ? '登录' : '注册'}</Button>
                <Button onClick={onReset}>重置</Button>
              </Btns>
            </Form.Item>
          </Form>
        </Main>
        <Footer>
          <Divider></Divider>
          <FooterSpan onClick={onChangeStatus}>
            <span>没有账号？ 注册新账号</span>
          </FooterSpan>
        </Footer>
      </Contanter>
    </LoginWrapper>
  )
})

export default Login