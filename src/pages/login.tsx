import React, { useEffect } from 'react'

import { useForm } from "react-hook-form"
import { signIn, useSession } from 'next-auth/react'

import Link from 'next/link'

import { toast } from 'react-toastify'
import { getError } from '@/utils/getError'

import { useRouter } from 'next/router'

import Image from 'next/image'
import imageLogo from '../assets/mma.jpg'

const login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const router = useRouter();
  const { redirect }:any = router.query;

  const handleSignIn = async ({ email, password }:any) => {
    try {
      console.log(email,password,'credentials');

      const result: any = await signIn('credentials', {
        redirect: false,
        email,
        password
      })

      if(result.error) {
        toast.error(result.error);
      } else {
        toast.success("Login realizado com sucesso!")
      }
    } catch (error: any) {
      toast.error(getError(error))
    }
  }

  const { data: session } = useSession();

  useEffect(() => {
    console.log("user", session?.user);
    if(session?.user) {
      router.push(redirect || "/");
    }
  },[session, redirect, router]);

  return (
    <div className='flex flex-col mt-10 justify-center items-center'>
      <Image 
        src={imageLogo} 
        alt="logo" 
        width={200} 
        height={200} 
        className='my-10' 
      />
      <form 
        className="mx-auto max-w-xs" 
        onSubmit={handleSubmit(handleSignIn)}
      >
        <input 
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 text-black" 
          type="email" 
          placeholder="Email"
          id='email'
          autoComplete='email' 
          required
          autoFocus={false}
          {...register('email', {
            required: 'Please enter email',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: 'Please enter valid email',
            },
          })}
        />
          {errors.email && (
            //@ts-ignore
            <div className="text-red-500">{errors.email.message}</div>
          )}
        <input 
          className="w-full px-8 py-4 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 text-black mt-4" 
          type="password" 
          placeholder="Password"
          id="password"
          required
          autoComplete='current-password'
          {...register('password', {
            required: 'Please enter password',
            minLength: { value: 6, message: 'password is more than 5 chars' },
          })}
        />
        {errors.password && (
          //@ts-ignore
          <div className="text-red-500 ">{errors.password.message}</div>
        )}
        <button
          className="mt-5 space-x-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          {/* <LockClosedIcon className='h-6 w-6' /> */}
          <p>
            Login
          </p>
        </button>

        <div className="my-8 border-b text-center">
          <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            <Link href={"/register"}>
              <p>Não possui uma conta?</p>
            </Link>
          </div>
        </div>

        <Link 
          href={`/register?redirect=${redirect || '/'}`}
          className="mt-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span className="ml-3">
            <p>
              Sign Up
            </p>
          </span>
        </Link>
        <p className="mt-4 text-xs text-gray-600 text-center">
          Eu concordo com agym a cerca dos
          <Link href="#" className="ml-1 border-b border-gray-500 border-dotted">
            Termos de serviço
          </Link>
          e dos
          <Link href="#" className="ml-1 border-b border-gray-500 border-dotted">
            Termos de privacidade
          </Link>
        </p>
      </form>
    </div>
  )
}

export default login