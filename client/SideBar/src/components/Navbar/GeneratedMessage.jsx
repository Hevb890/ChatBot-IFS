import React from 'react'
import Avatar from './Avatar'
import './GeneratedMessage.css'
import chatbotLogo from '../../assets/ChatBotLogo.png'

export default function GeneratedMessage({generatedMessage}) {
    return (
        <div className='generatedMessageMainWrap'>
            <Avatar userAvatarImage={chatbotLogo} backgroundColor = '#8427E2'/>
            <div className='generatedMessageContent'>
                <p>{generatedMessage}</p>
            </div>
    </div>
  )
}
