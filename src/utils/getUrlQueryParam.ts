import { cleanObject } from '@/utils';
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { URLSearchParamsInit } from "react-router-dom"

// 返回页面url中，指定键的参数值
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((prev, key: K) => ({
        ...prev,
        [key]: searchParams.get(key) || ''
      }), {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const obj = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParams(obj)
    }
  ] as const
}