import React from 'react'
import { IoAdd } from "react-icons/io5";
import './NewChatButton.css'

export default function NewChatButton({onClick}) {
  return (
    <div>
        <div role='button' onClick={onClick} className='newchatbutton'>
            <IoAdd />
            <p>New Chat</p>
        </div>
    </div>
  )
}
