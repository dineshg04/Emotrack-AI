import React from 'react'
import { getInitials } from '../../utils/helper'

function ProfileInfo({onLogout}) {
  return (
    <div className='flex items-center gap-3'>
        <div className='border-3 w-12 h-12 bg-red-200 font-medium flex items-center justify-center rounded'>{getInitials('Dhanush Shankar')}</div>
        <div>
            <p className='text-sm font-medium'>Dhanush Shankar</p>
            <button className='text-sm underline' onClick={onLogout}>LogOut</button>
        </div>
    </div>
  )
}

export default ProfileInfo