import React from 'react'
import PlaceHolder from '../ui/PlaceHolder'

function FirstPage() {

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-9xl font-bold text-center mb-5'>EmoTrack AI</h1>
      <p className='w-[800px] text-center font-normal text-2xl mb-5 '>Track your emotions and get AI driven suggestions</p>
      <PlaceHolder placeholders={placeholders}/>
    </div>
  )
}

export default FirstPage