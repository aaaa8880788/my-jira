import { useAuth } from '@/context/auth-context';
import qs from 'qs'
import * as auth from '@/utils/authProvider'
import { message } from 'antd';
interface Config extends RequestInit{
  data?: object,
  token?: string
}

const apiUrl = import.meta.env.VITE_API_URL
export const http = async (url: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-type': data ? 'application/json' : '',
    },
    ...customConfig
  }

  if(config.method.toUpperCase() === 'GET') {
    url += `?${qs.stringify(data || {})}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  // axios 和 fetch 的表现不一样,axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiUrl}${url}`, config).then(async response => {
    const data = await response.json()
    if(response.ok) {
      if(data.code === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({
          message: '请重新登录'
        })
      }else {
        return data
      }
    }else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const {user} = useAuth()
  return (...[url, config]: Parameters<typeof http>) => http(url, { ...config, token: user?.token })
}