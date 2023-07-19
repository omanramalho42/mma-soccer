import React, { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let teams: any[] = [];
  await axios.get(`http://localhost:3000/api/team/teams`)
  .then((res) => (
    teams.push(res.data.json())
  )).catch(error => toast.error(error.message))

  return {
    props: {
      teams
    }
  }
}

const Teams:NextPage = ({ teams }: any) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(!session?.user) {
      router.push(`/login?redirect=teams`)
    }
  },[session, router]);

  useEffect(() => {
    if(teams) {
      console.log(teams,'teams');
    }
  },[teams])

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