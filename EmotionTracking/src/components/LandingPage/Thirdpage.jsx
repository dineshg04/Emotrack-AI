import React from 'react'
import chatbot from "../../assets/chatbot.png"

const Thirdpage = () => {
  return (
   <>
<div>
<div className='flex mt-20 my-9 mx-10 '>
 <div className='w-1/2'>
    <img alt='calendar' src={chatbot} className='mt-12' />
        
    </div>
    <div className=' flex flex-col space-y-8 w-1/2 mt-40 px-3'>
        <h1 className='text-4xl font-semibold font-sans text-blue-800 '>CHAT BOT</h1>
        <div>
            <p className='text-3xl font-light mt-7 '>
            The chatbot analyzes emotions from user-provided text to offer personalized suggestions aimed at enhancing emotional well-being. By detecting emotional cues, it delivers relevant insights tailored to how users feel, whether happy, stressed, or uncertain. Its intuitive interface provides real-time feedback for a seamless, emotionally-aware experience.
            </p>
        </div>
    </div>
    
   </div>

</div>

 
   </>
  )
}

export default Thirdpage