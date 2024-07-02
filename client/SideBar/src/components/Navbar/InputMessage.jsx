import React from 'react'
import { useState } from 'react';
import { IoPaperPlaneOutline } from "react-icons/io5";
import './InputMessage.css'

export default function InputMessage({onNewMessage}) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    await onNewMessage(inputValue);
    // Clear the input field after submission
    setInputValue('');
  }
  return (
    <div>
      <form onSubmit={handleSubmit} method='POST'>
        <div className='inputMessageWrap'>
          <input type="text" placeholder='Ask Your Question' value={inputValue} onChange={handleChange}/>
          <button type='submit' className='sendButton'>
            <IoPaperPlaneOutline />
          </button>
        </div>
      </form>
    </div>
  )
}
