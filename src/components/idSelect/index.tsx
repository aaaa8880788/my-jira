import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'defaultOptionsName' | 'options'>{
  value: string | number | null | undefined,
  onChange: (value?:number) => void,
  defaultOptionsName?: string,
  options?: { name: string, id: number }[]
}
/* 
  value 可以传入多种类型的值
  onChange 只会回调 number|undefined 类型
  当 isNaN(Number(value)) 为true的时候,代表选择默认类型
  当选择默认类型时,onChange会回调undefined
  @param props
  @constructor
*/
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionsName, options, ...resetProps } = props
  return (
    <Select 
      value={options?.length ? toNumber(value) : 0}
      onChange={value => onChange(toNumber(value) || undefined)}
      { ...resetProps }>
        {
          defaultOptionsName ? <Select.Option value={0} key={0}>{ defaultOptionsName }</Select.Option> : null
        }
        {
          options?.map(option => <Select.Option value={option.id} key={option.id}>{ option.name }</Select.Option>)
        }
    </Select>
  )
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)