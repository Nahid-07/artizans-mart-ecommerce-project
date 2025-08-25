import React from 'react'
import { Sidebar } from '../../components/dashboardComponents/Sidebar'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {
  return (
    <div className='flex gap-5'>
        <aside>
            <Sidebar/>
        </aside>
        <aside>
            <Outlet></Outlet>
        </aside>
    </div>
  )
}
