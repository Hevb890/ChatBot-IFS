import React from 'react'
import './RecentChatTab.css'
import RecentChatIcon from './RecentChatIcon'
import DeleteRecentChatIcon from './DeleteRecentChatIcon'

export default function RecentChatTab({chat, onClick, isSelected}) {
  const handleClick = () => {
    onClick(chat.id)
  }
  return (
    <div className={`recentchatwrap ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
        <RecentChatIcon />
        <p className='recentChatName'>{chat.name}</p>
        <DeleteRecentChatIcon />
    </div>
  )
}
