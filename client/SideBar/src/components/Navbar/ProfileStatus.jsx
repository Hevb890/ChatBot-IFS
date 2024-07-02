import React from 'react'
import { useEffect, useState } from 'react';
import { FaCircle } from "react-icons/fa6";
import './ProfileStatus.css'
import axios from 'axios';
import Avatar from './Avatar';
import userAvatarMale from '../../assets/user-avatar-male.png'

export default function ProfileStatus() {
  const [name, setName] = useState('')

  useEffect(() => {
    // Fetch the name from the backend
    axios.get('http://127.0.0.1:8080/data')
      .then(response => {
        setName(response.data);  // Assuming the response is just the name
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='profile-main'>
      <Avatar userAvatarImage={userAvatarMale}/>
      <div className='profileDetailsWrap'>
        <p>{name}</p>
        <div className='status'>
            <FaCircle />
            <p>Online</p>
        </div>
      </div>
    </div>
  )
}
