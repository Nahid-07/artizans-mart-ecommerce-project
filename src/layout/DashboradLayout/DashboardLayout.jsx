import { Sidebar } from '../../components/dashboardComponents/Sidebar'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {
  return (
    <div className='flex gap-5'>
        <aside className='flex-1'>
            <Sidebar/>
        </aside>
        <aside className='flex-4'>
            <Outlet></Outlet>
        </aside>
    </div>
  )
}
