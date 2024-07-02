import React from 'react'
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";
import './Options.css'

export default function Options() {
  return (
    <div>
        <div className='optionsWrap'>
            <div className='headphone'>
                <TfiHeadphoneAlt />
            </div>
            <div className='settings'>
                <IoSettingsOutline />
            </div>
        </div>
    
    </div>
  )
}
