
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '@/utils/getError'
import PLAYERIMG from '../../assets/player.png'
import Header from '@/components/Header'

const Player:FC<any> = (props) => {
  const router = useRouter();
  const { playerId } = router.query;

  const [player,setPlayer] = useState<null | any>(null);
  const fetchPlayerId = async () => {
    await axios.get(`${process.env.API_URL}/api/players/player?playerId=${playerId}`)
    .then((res) => { 
      setPlayer(res.data.data) 
      Promise.resolve(res.data);

      toast.success("Sucesso ao pegar os dados")
    }).catch((error: Error) => {
      // Promise.reject(error),
      toast.error(getError(error.message)
    )});
  }
  
  const [players, setPlayers] = useState();
  const fetchPlayers = async () => {
    await axios.get(`${process.env.API_URL}/api/players/`)
    .then((res) => { 
      setPlayers(res.data.data) 
      Promise.resolve(res.data);

      toast.success("Sucesso ao pegar os jogadores")
    }).catch((error: Error) => {
      // Promise.reject(error),
      toast.error(getError(error.message)
    )});
  }

  useEffect(() => {
    fetchPlayerId();
    fetchPlayers();

    console.log(players,'players');
  }, [router, playerId])
  
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
        
        <div className='w-full'>
          <div className='flex mx-5 flex-col items-start'>
            
            <div className='flex flex-row justify-between items-center space-x-4'>
              <span className='p-2 rounded-md bg-blue-700'>
                <p className='uppercase mx-4 text-bold text-white'>
                  {player?.positionPlayer}
                </p>
              </span>

              <span className='p-2 rounded-md bg-purple-700'>
                <p className='uppercase mx-4 text-bold text-white'>
                  🔰 frança
                </p>
              </span>
            </div>

            <h1 className='text-7xl text-white font-bold'>
              {player?.fullName}
            </h1>

            <div className='flex flex-col mt-12 bg-[rgba(25,25,25,20%)] rounded-md p-12 w-full'>
              <div className='flex space-x-4 f-full justify-between'>
                <div className='flex p-4 flex-col'>
                  <p className='text-5xl text-white text-bold'>
                    {player?.age}
                  </p>
                  <p className='text-gray-200'>
                    age
                  </p>
                </div>
                <div className='flex p-4 flex-col'>
                  <p className='text-5xl text-white text-bold'>
                    {player?.weight}
                  </p>
                  <p className='text-gray-200'>
                    weight (kg)
                  </p>
                </div>
                <div className='flex p-4 flex-col'>
                  <p className='text-5xl text-white text-bold'>
                    {player?.width}
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

        <div className='w-full flex flex-row items-end'>
          <Image 
            width={300} 
            height={800} 
            className='w-full object-contain h-full'
            alt='player' 
            src={PLAYERIMG} 
          />
          <div className='flex flex-col mx-10 items-center my-20'>
            
            <div className='flex flex-col my-40 justify-center space-y-5'>
              <p className='rounded-full w-10 text-white bg-gray-400 items-center p-2 text-center'>{'>'}</p>
              <p className='rounded-full w-10 text-white bg-gray-400 items-center p-2 text-center'>{'<'}</p>
            </div>

            <div className='flex flex-col justify-center items-center space-y-2 mt-10'>
              <div className='flex justify-center rounded-full p-10' style={{ border: '2px solid white' }}>
                <p className='text-white text-md font-bold'>
                  36%
                </p>
              </div>
              <p className='text-white'>
                Rating
              </p>
            </div>
            <div className='flex flex-col justify-center items-center space-y-2 mt-10'>
              <div className='flex justify-center rounded-full p-10' style={{ border: '2px solid white' }}>
                <p className='text-white text-md font-bold'>
                  36%
                </p>
              </div>
              <p className='text-white'>
                Shooting
              </p>
            </div>
          </div>
        </div>

      </div>
    
    </div>
  )
}

export default Player