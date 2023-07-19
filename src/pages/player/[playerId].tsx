
import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '@/utils/getError'
import PLAYERIMG from '../../assets/player.png'
import Header from '@/components/Header'

export const getServerSideProps:GetServerSideProps = async (ctx: any) => {
  let player;
  const data:any = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/players/player?playerId=${ctx.query.playerId}`)
    .then((res) => { 
      console.log(res.data.data,'response'),
      player = res.data.data 
      Promise.resolve(res.data);

      toast.success("Sucesso ao pegar os dados")
    }).catch((error: Error) => {
      console.log(error, 'erro'), 
      Promise.reject(error),
      toast.error(getError(error.message)
    )
  });

  if(player) {
    console.log(player,'data');
  } else {
    console.log("erro")
  }
  
  return {
    props: {
      player: player ? player : null,
      message: "success!"
    }
  }
}

const Player:FC<any> = (props) => {
  const router = useRouter();
  const { playerId } = router.query;
  
  return (
    <div className='flex-col'>
      <Header />
      
      <div className='flex w-full my-5 justify-around'>
        <h1 className='text-xl my-4 font-bold text-center uppercase'>
          Player: #{playerId}
        </h1>
        <button 
          onClick={() => router.back()} 
          className='p-4 bg-purple-800 text-white'
        >
          voltar
        </button>
      </div>

      <div className='flex lg:flex-row space-x-4 flex-col mt-20 justify-around items-center space-y-4'>
        
        <div className=''>
          <div className='flex flex-col items-start'>
            
            <span className='p-2 rounded-md bg-blue-700'>
              <p className='uppercase mx-4 text-bold text-white'>
                {props.player.positionPlayer}
              </p>
            </span>

            <h1 className='text-7xl text-white font-bold'>
              {props.player.fullName}
            </h1>

            <div className='flex flex-col mt-12 bg-[rgba(25,25,25,20%)] rounded-md p-12 w-full'>
              <div className='flex space-x-4 f-full justify-between'>
                <div className='flex p-4 flex-col'>
                  <p className='text-5xl text-white text-bold'>
                    {props.player.age}
                  </p>
                  <p className='text-gray-200'>
                    age
                  </p>
                </div>
                <div className='flex p-4 flex-col'>
                  <p className='text-5xl text-white text-bold'>
                    {props.player.weight}
                  </p>
                  <p className='text-gray-200'>
                    weight (kg)
                  </p>
                </div>
                <div className='flex p-4 flex-col'>
                  <p className='text-5xl text-white text-bold'>
                    {props.player.width}
                  </p>
                  <p className='text-gray-200'>
                    width (cm)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex mt-10 justify-center items-center space-x-4'>
            <button className='p-4 bg-purple-800 text-white rounded-md'>
              deletar
            </button>
            <button className='p-4 bg-purple-800 text-white rounded-md'>
              editar
            </button>
          </div>
        </div>

        <div className=''>
          <Image 
            width={300} 
            height={800} 
            className='w-full object-contain h-full' 
            alt='player' 
            src={PLAYERIMG} 
          />
        </div>

      </div>
    
    </div>
  )
}

export default Player