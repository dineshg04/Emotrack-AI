import React from 'react'
import Secondpage from '../../components/Landingpage/Secondpage'
import Thirdpage from '../../components/Landingpage/Thirdpage'
import AiTrack from '../AITrack/AiTrack'
import Plans from '../../components/Landingpage/Plans'
import Footer from '../../components/Landingpage/Footer'
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


