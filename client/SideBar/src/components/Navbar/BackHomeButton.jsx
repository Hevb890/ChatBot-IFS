import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import './BackHomeButton.css'

export default function BackHomeButton() {
  return (
    <div className='backhomebutton'>
      <div className='backhomebuttonwrap'>
        <IoIosArrowBack />
        <p>Back to Home</p>
      </div>
    </div>
  )
}
