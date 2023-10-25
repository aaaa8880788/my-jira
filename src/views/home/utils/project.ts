import { useAsync } from '@/utils/useAsync'
import { useEffect } from "react"
import { cleanObject } from '@/utils'
import { useHttp } from '@/service'

interface List {
  id: number,
  name: string,
  personId: number,
  organization: string,
  pin: boolean,
  created: number,
}

export const useProjects = (params?: Partial<List>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<List[]>()

  // 获取工程数据
  useEffect(() => {
    const projectPromise = () => client(`/projects`, {
      data: cleanObject(params || {})
    })
    run(projectPromise(), {
      retry: projectPromise
    })
  }, [params])

  return result
}

export const useEditProject = () => {
  const client = useHttp()
  const {run, ...asyncResult} = useAsync()
  const mutate = (param: Partial<List>) => {
    return run(client(`/projects/${param.id}`, {
      data: param,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const client = useHttp()
  const {run, ...asyncResult} = useAsync()
  const mutate = (param: Partial<List>) => {
    return run(client(`/projects/${param.id}`, {
      data: param,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}