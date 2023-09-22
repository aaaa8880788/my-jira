import React, { memo } from 'react'
import { Table } from 'antd'

interface SearchListProps {
  users: User[],
  list: List[]
}

interface User {
  id: number,
  name: string
}

interface List {
  id: number,
  name: string,
  personId: number,
  organization: string,
  created: number,
}

const SearchList = memo(({ users, list }:SearchListProps) => {
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      key: 'leader',
    },
  ]
  const dataSource = list.map(project => ({
    key: project.id,
    projectName: project.name,
    leader: users.find(user => user.id === project.personId)?.name
  }))
  return (
    <Table dataSource={dataSource} columns={columns} />
  )
})

export default SearchList