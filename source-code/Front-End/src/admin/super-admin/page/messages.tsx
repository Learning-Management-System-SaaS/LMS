import React from 'react'
import MessagesTable from '../components/messagesList'
import MessageTable from '../components/messageTable'
import MessagesList from '../components/messagesList'
import { Outlet, useLocation } from 'react-router-dom'
import Breadcrumbs from '../common/breadcrumbs'

const Messages = () => {
  const location =useLocation()
  const pages = location.pathname.split("/")
  return (
    <div className="px-8 py-8 bg-gray-50 min-h-screen overflow-y-auto">
      <Breadcrumbs pages ={pages} />
      <Outlet />
    </div>
  )
}

export default Messages


