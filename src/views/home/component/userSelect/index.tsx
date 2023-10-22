import React from "react";
import { useUsers } from '@/views/home/utils/user'
import { IdSelect } from "@/components/idSelect";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers()
  return (
    <IdSelect options={users || []} {...props}></IdSelect>
  )
}