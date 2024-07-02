import React from 'react'
import './Avatar.css'

export default function Avatar({userAvatarImage, backgroundColor}) {
  return (
    <div>
      <div className='avatarImageWrap' style={{backgroundColor}}>
        <img src={userAvatarImage} alt="" />
      </div>
    </div>
  )
}
