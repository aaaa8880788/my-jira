import React, { memo, useState, useRef } from 'react'
import { Button, Form, FormInstance, Input, Divider, Spin } from 'antd';
import { useAuth } from '@/context/auth-context';
import { Header, Btns, Contanter, Footer, FooterSpan, LoginWrapper, Main } from './style';
import { useAsync } from '@/utils/useAsync';
import { useGlobal } from '@/context/global-context';
import { useDocumentTitle } from '@/utils';

const Login = memo(() => {
  const [isLogin, setIsLogin] = useState(true)
  const {login, register} = useAuth()
  const {run, isLoading} = useAsync()
  const {messageApi} = useGlobal()
  const formRef = useRef<FormInstance>(null);

  const onFinish = async ({username, password} :{username: string, password: string}) => {
    if(isLogin) {
      run(login({
        username,
        password
      })).then(res => {
        messageApi.open({
          type: 'success',
          content: '登录成功',
        });
      }).catch(err => {
        messageApi.open({
          type: 'error',
          content: `${err.message}`,
        });
      })
    }else {
      run(register({
        username,
        password
      })).then(res => {
        messageApi.open({
          type: 'success',
          content: '注册成功',
        });
      }).catch(err => {
        messageApi.open({
          type: 'error',
          content: `${err.message}`,
        });
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
    <Spin spinning={isLoading}>
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
              <span>{ isLogin ? '没有账号？ 注册新账号' : '前往登录' }</span>
            </FooterSpan>
          </Footer>
        </Contanter>
      </LoginWrapper>
    </Spin>
  )
})

export default Login