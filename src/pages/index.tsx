export const revalidate = 3600;  // revalidate every hour

import { useEffect, useState } from "react"

import axios from 'axios'

import { useSession } from "next-auth/react"

import { useRouter } from "next/router"

import Header from "@/components/Header"

import { toast } from "react-toastify"

import { getError } from "@/utils/getError"

import Link from "next/link"
import PLAYERIMG from '../assets/player.png';
import AVATARIMG from '../assets/player2.png';
import AVATARIMG2 from '../assets/oman.png';
import AVATARIMG3 from '../assets/cleiton.png';
import AVATARIMG4 from '../assets/junior.png';
import AVATARIMG5 from '../assets/crisao.png';
import DADA from '../assets/dada.png';
import OMAN from '../assets/omsn.png';
import AVATAR5 from '../assets/jr.png'

const images = [
  PLAYERIMG,
  AVATARIMG,
  AVATARIMG5,
  AVATARIMG3,
  DADA
]

import Image from "next/image"

import useSWR from 'swr';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect }: any = router.query;

  useEffect(() => {
    if(!session?.user) {
      router.push(redirect || "/login");
    }
  },[session, redirect, router]);

  const fetchDataPlayers = async () => {
    const response: any = await axios.get(`/api/players/players`)
    .then((res) => {
        // Promise.resolve(res.data);
        toast.success("Sucesso ao pegar os dados");
        return res.data.data
    }).catch((error: Error) => {
      // Promise.reject(error),
      toast.error(getError(error.message),
    )});
    
    return response;
  }  

  const { data, error } = useSWR('data', fetchDataPlayers, { revalidateOnFocus: false });
  if(error) {
    <div>
      Erro ao buscar dados.
    </div>
  }
  if(!data) {
    <div>
      Carregando...
    </div>
  }

  return (
    <main className="flex-1 w-full">
    <Header />

    <div className="w-full flex flex-col h-full my-20">

      <div className="flex mx-5 lg:mx-20 md:mx-15 items-center justify-between">
        
        <div className="flex flex-wrap items-center">
          <button className="flex p-2 bg-gray-100 opacity-60 mx-2 hover:bg-white hover:text-blue-600 hover:opacity-100 rounded-full">
            <p className="uppercase mx-2">
              jogadores
            </p>
          </button>
          {/* <button disabled className="flex p-2 bg-gray-100 mx-2 my-2 opacity-60 hover:bg-white hover:text-blue-600 hover:opacity-100 rounded-full">
            <p className="uppercase mx-2">
              associados
            </p>
          </button> */}
        </div>

        <div className="d-flex">
          {["ataque", "goleiro","defesa","lateral"].map(i => (
            <button key={i} className="p-2 mx-2 my-2 bg-gray-100 opacity-60 hover:opacity-100 hover:bg-white hover:text-blue-600 rounded-full">
              <p className="uppercase mx-2">
                { i }
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 flex-row mt-10 max-w-8xl overflow-x-auto px-10 h-[800px] flex-nowrap">
        <div className="flex transition-all items-center justify-center">
          {data?.map((i: any, idx: number) => data ? (
            <div 
              key={i._id} 
              className={`flex-1 bg-no-repeat w-[400px] h-[470px] hover:scale-110 transition-all object-fill bg-[url('../assets/cardbg.png')] flex-col items-center flex justify-around`}
              style={{ backgroundPositionX: '-105px'}}
            >
              <span className="p-5 bg-blue-300 rounded-full relative top-[8.2em] shadow-full left-5 z-2">
                <p className="uppercase z-[10] font-bold text-6xl relative text-white">
                  { idx }
                </p>
              </span>

              <Link href={`/player/${i._id}`} className="z-1" tabIndex={-1} aria-checked={false}>
                <Image 
                  src={images[idx]} 
                  height={300}
                  className="h-full w-full bottom-[6em] right-3 relative" 
                  width={250}
                  alt="player"
                />
              </Link>
              <div className="flex flex-col space-y-4 text-white ufc__font relative bottom-[9em] right-[2em]">
                { i.name ? (
                  <p className="text-5xl text-center">
                    { i.name }
                  </p>
                ) : (
                  <p className="text-5xl text-center"> 
                    { i.fullName } 
                  </p>
                ) }
              </div>
            </div>
          ) : (
            <p>Nenhum jogador encontrado... </p>
          ))}
        </div>
      </div>
    </div>
   </main>
  )
}
