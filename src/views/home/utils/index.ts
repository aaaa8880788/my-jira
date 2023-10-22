import { useUrlQueryParams } from '@/utils/getUrlQueryParam'
import { useMemo } from 'react'

// 根据 project 查询参数中获取并设置页面 URL
export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(['name', 'personId'])
  return [
    useMemo(() => ({ 
      ...params, 
      personId: Number(params.personId) || undefined 
    }), [params]),
    setParams
  ]  as const
}