import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import FIELDIMG from '../../assets/field.jpg';
import FIELDIMG2 from '../../assets/mma.png';
import Header from '@/components/Header'

const JOGADORES = [
  { nome: 'Fernando' },
  { nome: 'Cléiton' },
  { nome: 'Fábio' },
  { nome: 'Dadá' },
  { nome: 'Crisão' },
  { nome: 'Guilherme' },
  { nome: 'Cadu' },
  { nome: 'Carioca' },
  { nome: 'Ricardo' },
  { nome: 'Joao' },
  { nome: 'Santiago' },
  { nome: 'Nutti' },
];

const Teams:NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if(!session?.user) {
  //     router.push(`/login?redirect=teams`)
  //   }
  // },[session, router]);

  const [teams,setTeams] = useState<null | any>(null);
  const fetchTeams = async () => {
    await axios.get(`${process.env.API_URL}/api/team/teams`)
      .then((res) => (
        setTeams(res.data.json())
      )).catch(error => toast.error(error.message))
    
  }
  useEffect(() => {
    fetchTeams();
  },[router]);

  return (
    <div className='flex flex-col w-full justify-center'>
      <Header />

      <div className='flex flex-row justify-center'>
        {/* <div className='w-50'>
          <button
            onClick={() => router.push("/team/create")} 
            className='p-4 bg-blue-400 rounded-xl shadow-full mx-2 my-2'
          >
            + Criar novo time
          </button>
        </div> */}

        <div className='flex flex-row-reverse w-50' style={{ backgroundImage: `url(${FIELDIMG})`, backgroundRepeat: 'no-repeat', height: 900, objectFit: 'contain' }}>
          <Image src={FIELDIMG} alt="" />
          <div className='rounded w-64 border'>
            <Image src={FIELDIMG2} height={400} alt="" />
            <div className='p-2 space-y-2'>
              { JOGADORES.map((item) => {
                return (
                  <div className='flex mx-2 items-center hover:scale-110 transition-all'>
                    <Image src={FIELDIMG2} width={42} height={42} alt='' />
                    <p className='text-gray-200'>
                      {item.nome}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teams