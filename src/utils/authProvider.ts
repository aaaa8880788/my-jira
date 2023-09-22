// 注册/登录/退出登录
const localStorageKey = "auth_token"
import { http } from "@/service"
import { message } from "antd"

interface User {
  username: string,
  token: string,
}

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (
  params: {
    username: string, 
    password: string
  },
) => {
  return http('/login', {
      method: 'POST',
      data: params
  }).then(async res => {
    if(res && res.code === 200) {
      message.success({
        content: res.data.message
      })
      return Promise.resolve(handleUserResponse(res.data))
    }else {
      return Promise.reject(res)
    }
  }).catch(err => {
    if(err.message) {
      message.error({
        content: err.message
      })
    }else {
      message.error({
        content: '登录失败,请稍后重试'
      })
    }
    return Promise.reject(err)
  })
}

export const register = (
  params: {
    username: string, 
    password: string
  }
) => {
  return http('/register', {
    method: 'POST',
    data: params
  }).then(async res => {
    if(res && res.code === 200) {
      message.success({
        content: res.data.message
      })
      return Promise.resolve(handleUserResponse(res.data))
    }else {
      return Promise.reject(res)
    }
  }).catch(err => {
    if(err.message) {
      message.error({
        content: err.message
      })
    }else {
      message.error({
        content: '登录失败,请稍后重试'
      })
    }
    return Promise.reject(err)
  })
}

export const logout = async() => window.localStorage.removeItem(localStorageKey)