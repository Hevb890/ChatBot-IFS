import React from 'react'
import ChatBotIcon from './ChatBotIcon'
import Options from './Options'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='navbar'>
      <ChatBotIcon />
      <Options />
    </div>
  )
}
