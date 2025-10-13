import React from 'react'
import MessagesTable from '../components/messagesTable'

const Messages = () => {
    const onAddSubscription=()=>{}
    const onDeleteSubscription=()=>{}
  return (
    <MessagesTable onAddSubscription={onAddSubscription}  onDeleteSubscription={onDeleteSubscription}/>
  )
}

export default Messages