import React, { memo } from 'react'
import { Table, Dropdown } from 'antd'
import type { TableProps, MenuProps } from 'antd';
import dayjs from 'dayjs'
import { Pin } from '@/components/pin'
import { useEditProject } from '../../utils/project'

interface SearchListProps extends TableProps<dataSourceType> {
  users: User[],
  list: List[],
  retry?: () => void
  projectButton?: JSX.Element
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
  pin: boolean,
  created: number,
}

interface dataSourceType {
  key: number,
  id: number,
  pin: boolean,
  projectName: string,
  organization: string,
  leader: string,
  created: string,
}

const SearchList = memo(({ users, list, retry,projectButton, ...props }:SearchListProps) => {
  const tableList = list.map(project => ({
    key: project.id,
    id: project.id,
    projectName: project.name,
    organization: project.organization,
    leader: users.find(user => user.id === project.personId)?.name || '-',
    // created: dayjs(project.created).format('YYYY-MM-DD HH:mm:ss') ,
    created: dayjs(project.created).format('YYYY-MM-DD') ,
    pin: project.pin,
  }))
  const {mutate} = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(() => retry?.())
  const menuItems: MenuProps['items'] = []
  if(projectButton) {
    menuItems.push({
      key: 'edit',
      label: (
        <>{projectButton}</>
      ),
    })
  }
  return (
    <Table  
      rowKey={'key'}
      dataSource={tableList} 
      pagination={false}
      columns={[
        {
          title: (<Pin checked={true} disabled={true}></Pin>),
          align: 'center',
          dataIndex: 'id',
          render(value, row, index) {
            return (
              <Pin 
                key={row.id}
                checked={row.pin} 
                onCheckedChange={pinProject(row.id)}
              />
            )
          }
        },
        {
          title: '项目名称',
          dataIndex: 'projectName',
          key: 'projectName',
          align: 'center'
        },
        {
          title: '组织',
          dataIndex: 'organization',
          key: 'organization',
          align: 'center'
        },
        {
          title: '负责人',
          dataIndex: 'leader',
          key: 'leader',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'created',
          key: 'created',
          sorter: (a, b) => a.created.localeCompare(b.created),
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          render(value, row, index) {
            return (
              <Dropdown menu={{
                items: menuItems
              }}>
                <span style={{cursor: 'pointer'}}>···</span>
              </Dropdown>
            )
          }
        },
      ]} 
      {...props}/>
  )
})

export default SearchList