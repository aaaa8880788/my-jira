import React, { FormEvent, memo, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'
import styled from 'styled-components'

interface SearchPanelProps {
  users: User[],
  params: Params
  setParams: (params: Params) => void
}

interface User {
  id: number,
  name: string
}

interface Params {
  name: string,
  personId: string
}

const Container = styled.div`
  display: flex;
  width: 300px;
`

const SearchPanel = memo(({ users, params, setParams }:SearchPanelProps) => {

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setParams({
      ...params,
      name: e.target.value
    })
  }

  const onSelectChange = (value: string) => {
    setParams({
      ...params,
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
            value={params.name} 
            allowClear= {true}
            onChange = { onInputChange }>
          </Input>
          <Select 
            value={params.personId} 
            onChange={ onSelectChange }
            options={[
              { value: '', label: '负责人' },
              ...users.map(user => ({value: user.id, label: user.name}))
            ]}>
          </Select>
        </Container>
      </Form.Item>
    </Form>
  )
})

export default SearchPanel