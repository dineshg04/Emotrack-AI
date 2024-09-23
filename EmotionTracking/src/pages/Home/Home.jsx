import React from 'react'
import Secondpage from '../../components/LandingPage/Secondpage'
import Thirdpage from '../../components/LandingPage/Thirdpage'
import AiTrack from '../AITrack/AiTrack'
import Plans from '../../components/LandingPage/Plans'
import Footer from '../../components/LandingPage/Footer'
import FirstPage from '../../components/LandingPage/FirstPage'


function Home() {
  return (
    <div>
      <FirstPage/>
       <Secondpage/>
       <Thirdpage/>
       <Plans/>
       <Footer/>
       {/*  <AiTrack/>*/}
    </div>
  )
}

export default Home


