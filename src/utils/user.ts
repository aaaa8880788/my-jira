import { useAsync } from '@/utils/useAsync'
import { useEffect } from "react"
import { cleanObject } from '@/utils'
import { useHttp } from '@/service'

interface User {
  id: number,
  name: string
}

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()

  // 获取用户数据
  useEffect(() => {
    run(client(`/users`, {
      data: cleanObject(params || {})
    }))
  }, [params])

  return result
}