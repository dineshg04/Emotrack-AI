import React from 'react'
import clendarimage from "../../assets/calendar.png"

const Secondpage = () => {
  return (
   <>
   <div className='flex mt-11 my-9 mx-10  '>
    <div className=' flex flex-col space-y-8 w-1/2 mt-40 px-3'>
        <h1 className='text-5xl font-semibold text-blue-800'>INTEGRATED CALENDER</h1>
        <div>
            <p className='text-3xl font-light mt-7  '>
            The Emotion-Tracking Calendar allows users to input their daily activities and emotions directly on selected calendar dates. This interactive calendar is built to offer seamless emotion analysis and tracking through a combination of text-based emotion detection using the Gemini API and manual emoji selection.
            </p>
        </div>
    </div>
    <div className='w-1/2'>
    <img alt='calendar' src={clendarimage} className='mt-12 ' />   
    </div>
   </div>
   </>
  )
}

export default Secondpage