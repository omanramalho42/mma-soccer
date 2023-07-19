import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import FieldImage from '../assets/field.jpg'
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '@/utils/getError';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export const getServerSideProps:GetServerSideProps = async (ctx: any) => {
  let players;
  const data:any = await axios.get(`${window.location.href}/api/players/players`)
    .then((res) => { 
      console.log(res.data,'response'),
      players = res.data?.data, 
      Promise.resolve(res.data);

      toast.success("Sucesso ao pegar os dados")
    }).catch((error: Error) => {
      console.log(error, 'erro'), 
      Promise.reject(error),
      toast.error(getError(error.message)
    )
  });
  if(data) {
    console.log(data.data,'data');
  } else {
    console.log("erro")
  }
  
  return {
    props: {
      players: players ? players : null,
      message: "success!"
    }
  }
}

const squad:React.FC = (props: any) => {
  const { data: session } = useSession();
  
  const router = useRouter();
  const { redirect }: any = router.query;

  const [useTeamBlue, setUseTeamBlue] = useState<any[]>([])
  const [useTeamRed, setUseTeamRed]   = useState<any[]>([])

  useEffect(() => {
    // console.log(useTeamRed.map(i => i) ,'team red');
    // console.log(useTeamBlue.map(i => i) ,'team blue');
    props?.players.filter((i: any) => useTeamBlue.map((j: any) => j ==! i.name && (
      i.name
    )))
    console.log(props?.players,'all players');
  },[useTeamRed, useTeamBlue])


  // useEffect(() => {
  //   if(!session?.user) {
  //     router.push(redirect || `/login?redirect=${redirect || "/"}`);    
  //   } else {
  //     console.log(session,'session');
  //   }
  // },[redirect, router, session])


  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='flex space-x-4'>
        <button 
          className='absolute p-4 rounded-xl top-10 left-10 bg-purple-500 text-white'
          onClick={() => router.back()}
        >
          voltar
        </button>
        <div className='flex flex-col space-y-2 mt-5'>
          <label htmlFor="teamRed">
            Selecione os jogadores do time blue
          </label>
          <select 
            onChange={(event: any) => 
              setUseTeamRed((values) => [...values, event.target.value])
            } 
            name="teamRed" 
            id="teamRed" 
            className='p-3 rounded-lg bg-blue-500 w-100'
          >
            {props?.players?.map((player: any) => (
              <option key={player._id} value={player.name} className='p-3'>
                { player.name }
              </option>
            ))}
          </select>
        </div>
 
        <div className='flex flex-col space-y-2 mt-5'>
          <label htmlFor="teamBlue">
            Selecione os jogadores do time red
          </label>
          <select
            onChange={(event: any) => 
              setUseTeamBlue((values) => [...values, event.target.value])
            }  
            name="teamBlue" 
            id="teamBlue" 
            className='p-3 rounded-lg bg-red-500 w-100'
          >
            {props?.players?.map((i: any) => (
              <option key={i._id} value={i.name} className='p-3'>
                { i.name }
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className='flex mt-5'>
        <button className='flex w-full bg-gray-900 text-white justify-center rounded-xl p-4'>
          adicionar
        </button>
      </div>
       
      <div className='flex-1 w-full justify-center items-center flex'>
        <div className='bg-red-900 w-100 h-100'>
          {useTeamRed.map((i, idx) => idx === 0 ? (
            <span key={idx} className='absolute top-[48%] left-[40%] mt-10 w-2 bg-blue-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ) : idx === 2 ? (
            <span key={idx} className='absolute top-[35%] left-[30%] mt-10 w-2 bg-blue-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ) : idx === 3 ? (
            <span key={idx} className='absolute top-[62%] left-[30%] mt-10 w-2 bg-blue-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ) : idx === 4 ? (
            <span key={idx} className='absolute top-[35%] left-[45%] w-2 bg-blue-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ) : (
            <span key={idx} className='absolute top-[68%] left-[45%] mt-10 w-2 bg-blue-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ))}
        </div>
        <div className='bg-blue-100 w-100 h-100'>
          {useTeamBlue.map((i, idx) => idx === 0 ? (
            <span key={idx} className='absolute top-[48%] right-[40%] mt-10 w-2 bg-red-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ) : idx === 2 ? (
            <span key={idx} className='absolute top-[35%] right-[30%] mt-10 w-2 bg-red-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ) : idx === 3 ? (
            <span key={idx} className='absolute top-[62%] right-[30%] mt-10 w-2 bg-red-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ) : idx === 4 ? (
            <span key={idx} className='absolute top-[35%] right-[45%] w-2 bg-red-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ) : (
            <span key={idx} className='absolute top-[68%] right-[45%] mt-10 w-2 bg-red-500 rounded-full p-4 z-10'>
              { i }
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default squad