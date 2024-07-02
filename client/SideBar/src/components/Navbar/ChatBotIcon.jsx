import React from 'react'
import ChatBotLogo from '../../assets/ChatBotLogo.png'
import './ChatBotIcon.css'

export default function ChatBotIcon() {
  return (
    <div className='logomain'>
      <div className='chatbotimg'>
        <img src={ChatBotLogo} alt="" />
      </div>
      <h3>ChatBot</h3> 
    </div>
  )
}
