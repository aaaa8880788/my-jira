import { useAsync } from '@/utils/useAsync'
import { useEffect } from "react"
import { cleanObject } from '@/utils'
import { useHttp } from '@/service'

interface List {
  id: number,
  name: string,
  personId: string,
  organization: string,
  created: number,
}

export const useProjects = (params?: Partial<List>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<List[]>()

  // 获取工程数据
  useEffect(() => {
    run(client(`/projects`, {
      data: cleanObject(params || {})
    }))
  }, [params])

  return result
}