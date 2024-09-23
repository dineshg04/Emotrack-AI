import React from 'react'
import PlaceHolder from '../ui/PlaceHolder'

function FirstPage() {

  const placeholders = [
    "The only limit to our realization of tomorrow is our doubts of today",
    "Success is not final, failure is not fatal: It is the courage to continue that counts",
    "It does not matter how slowly you go as long as you do not stop",
    "Life is 10% what happens to us and 90% how we react to it",
    "The best way to predict your future is to create it"
  ];


  return (
    <>
    <div className='bg-[url("/public/emojibg.png")] bg-cover '>
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-9xl font-bold text-center mb-11'>EmoTrack AI</h1>
      <p className='w-[800px] text-center font-normal text-2xl mb-40 '>Track your emotions and get AI driven suggestions</p>
      <PlaceHolder placeholders={placeholders}/>
    </div>

    </div>
   
    </>
    
  )
}

export default FirstPage