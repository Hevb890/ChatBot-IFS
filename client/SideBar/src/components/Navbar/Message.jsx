import React from 'react'
import Avatar from './Avatar'
import userAvatarMale from '../../assets/user-avatar-male.png'
import './Message.css'

export default function Message({message}) {
  return (
    <div className='messageMainWrap'>
        <Avatar userAvatarImage={userAvatarMale} backgroundColor = '#F1F6FC'/>
        <div className='messageContent'>
            <p>{message}</p>
        </div>
    </div>
  )
}
