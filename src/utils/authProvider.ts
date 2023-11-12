// 注册/登录/退出登录
const localStorageKey = "auth_token"
import { http } from "@/service"

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
      return Promise.resolve(handleUserResponse(res.data))
    }else {
      return Promise.reject(res)
    }
  }).catch(err => {
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
      return Promise.resolve(handleUserResponse(res.data))
    }else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

export const logout = async() => window.localStorage.removeItem(localStorageKey)

export const initUser = async() => {
  let user = null
  const token = getToken()
  if(token) {
    const result = await http('/getUserByToken', {
      data: {
        token: token
      }
    })
    user = result.data
  }
  return user
}