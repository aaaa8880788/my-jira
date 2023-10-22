import React, { memo } from 'react'
import { Form, Input } from 'antd'
import { UserSelect } from '../userSelect'
import { Container } from './css/style'

interface SearchPanelProps {
  users: User[],
  param: Params
  setParam: (params: Params) => void
}

interface User {
  id: number,
  name: string
}

interface Params {
  name: string,
  personId: number | undefined
}


const SearchPanel = memo(({ users, param, setParam }:SearchPanelProps) => {

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setParam({
      ...param,
      name: value
    })
  }

  const onSelectChange = (value: number | undefined) => {
    setParam({
      ...param,
      personId: value
    })
  }
  
  return (
    <Form 
      name="formRef">
      <Form.Item>
        <Container>
          <Input 
            placeholder='请输入项目名称' 
            value={param.name} 
            allowClear= {true}
            onChange = { onInputChange }>
          </Input>
          <UserSelect 
            value={param.personId} 
            onChange={onSelectChange}
            defaultOptionsName={'负责人'}>
          </UserSelect>
        </Container>
      </Form.Item>
    </Form>
  )
})

export default SearchPanel