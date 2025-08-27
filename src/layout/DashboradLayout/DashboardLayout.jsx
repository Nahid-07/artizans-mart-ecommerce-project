import { Sidebar } from '../../components/dashboardComponents/Sidebar'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {
  return (
    <div className='flex gap-5'>
        <aside className='flex-1'>
            <Sidebar/>
        </aside>
        <aside className='flex-4 mr-5 mb-5 mt-5 bg-gray-50'> 
            <Outlet></Outlet>
        </aside>
    </div>
  )
}
