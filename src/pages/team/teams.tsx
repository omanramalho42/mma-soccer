import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

const Teams:NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(!session?.user) {
      router.push(`/login?redirect=teams`)
    }
  },[session, router]);

  const [teams,setTeams] = useState<null | any>(null);
  const fetchTeams = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/team/teams`)
      .then((res) => (
        setTeams(res.data.json())
      )).catch(error => toast.error(error.message))
    
  }
  useEffect(() => {
    fetchTeams();
  },[router]);

  return (
    <div className='flex w-full justify-center'>
      <button
        onClick={() => router.push("/team/create")} 
        className='p-4 bg-blue-400 rounded-xl shadow-full mx-2 my-2'
      >
        + Criar novo time
      </button>

      <div>
        
      </div>
    </div>
  )
}

export default Teams