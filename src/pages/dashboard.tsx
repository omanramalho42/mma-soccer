import React from 'react'
import Image from 'next/image'
import RadarChart from '@/components/RadarChart'
import RadialChart from '@/components/RadialChart'
import PLAYERIMG from '../assets/player.png'
import Header from '@/components/Header'

const dashboard = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      <div className='grid grid-cols-2 justify-center items-center'>
        {/* <h1 className='text-3xl text-white font-bold uppercase'>
          estastisticas
        </h1> */}
        <RadarChart />
        <RadialChart />
        <Image className='absolute top-2/4 z-0' src={PLAYERIMG} alt='' width={300} height={300} />
      </div>
    </div>
  )
}

export default dashboard