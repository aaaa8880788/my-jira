import React, { memo } from 'react'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'

interface SearchListProps extends TableProps<dataSourceType> {
  users: User[],
  list: List[],
}

interface User {
  id: number,
  name: string
}

interface List {
  id: number,
  name: string,
  personId: string | number,
  organization: string,
  created: number,
}

interface dataSourceType {
  key: number,
  projectName: string,
  organization: string,
  leader: string,
  created: string,
}

const SearchList = memo(({ users, list, ...props }:SearchListProps) => {
  return (
    <Table  
      dataSource={
        list.map(project => ({
          key: project.id,
          projectName: project.name,
          organization: project.organization,
          leader: users.find(user => user.id === project.personId)?.name || '-',
          created: dayjs(project.created).format('YYYY-MM-DD') ,
        }))
      } 
      columns={[
        {
          title: '项目名称',
          dataIndex: 'projectName',
          key: 'projectName',
          sorter: (a, b) => a.projectName.localeCompare(b.projectName)
        },
        {
          title: '组织',
          dataIndex: 'organization',
          key: 'organization',
          sorter: (a, b) => a.organization.localeCompare(b.organization)
        },
        {
          title: '负责人',
          dataIndex: 'leader',
          key: 'leader',
          sorter: (a, b) => a.leader.localeCompare(b.leader)
        },
        {
          title: '创建时间',
          dataIndex: 'created',
          key: 'created',
          sorter: (a, b) => a.created.localeCompare(b.created)
        },
      ]} 
      {...props}/>
  )
})

export default SearchList