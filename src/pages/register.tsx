import React, { useEffect } from 'react'

import { useForm } from "react-hook-form"
import { signIn, useSession } from 'next-auth/react'

import axios from 'axios'

import { toast } from 'react-toastify'
import { getError } from '@/utils/getError'

import { useRouter } from 'next/router'
import { BirthdayPicker } from 'react-birthday-picker'


const register = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  
  const router = useRouter();
  const { redirect }:any = router.query;

  const { data: session } = useSession();
  
  useEffect(() => {
    if(session?.user) {
      router.push(redirect || '/')
    }
  },[router,session,redirect]);
  
  const submitHandler = async ({ 
    fullName, 
    email, 
    password,
    width,
    weight,
    age,
    name,
    birthday,
    descritpion,
    goodFoot,
    position,
    address,
    contact,
    description
  }: any ) => {
    try {
      await axios.post('/api/auth/signup', {
        fullName,
        email,
        password,
        width,
        weight,
        age,
        name,
        birthday,
        descritpion,
        goodFoot,
        position,
        address,
        contact,
        description
      });

      const result: any = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if(result.error) {
        toast.error(result.error);
      } else {
        toast.success("sucesso ao criar usuário");
      }

    } catch (error: any) {
      console.log(error,'errou');
      toast.error(getError(error))
    }
  }


  return (
    <div className='mx-20'>
      <h1 className='mt-5 ufc__font text-2xl'>
        Faça seu registro
      </h1>
      <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit(submitHandler)}>
        <div className='flex justify-between space-x-4 items-center'>
          {/* NAME */}
          <div className='w-full'>
            <label 
              htmlFor="fullName" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Seu nome completo
            </label>
            <input 
              type="text" 
              // name='fullName'
              id="name" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john doe" 
              required
              autoFocus
              {...register('fullName', {
                required: 'Please enter your name',
              })}
            />
            {errors.fullName && (
              //@ts-ignore
              <div className="text-red-500">{errors.fullName.message}</div>
            )}
          </div>
          {/* EMAIL */}
          <div className='w-full'>
            <label 
              htmlFor="email" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Seu email
            </label>
            <input 
              type="email" 
              // name="email" 
              id="email" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com" 
              required
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
          </div>
        </div>
        <div className='flex justify-between space-x-4 items-center'>
          {/* PASSWORD */}
          <div className='w-full'>
            <label 
              htmlFor="password" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Senha
            </label>
            <input 
              type="password" 
              // name="password" 
              id="password" 
              placeholder="••••••••" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required
              {...register('password', {
                required: 'Please enter password',
                minLength: { value: 6, message: 'password is more than 5 chars' },
              })}
            />
            {errors.password && (
              //@ts-ignore
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          {/* CONFIRM PASSWORD */}
          <div className='w-full'>
            <label 
              htmlFor="age" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Confirmar senha
            </label>
            <input 
              type="password" 
              // name="confirmPassword" 
              id="confirmPassword" 
              placeholder="••••••••" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required
              {...register('confirmPassword', {
                required: 'Please enter confirm password',
                validate: (value) => value === getValues('password'),
                minLength: {
                  value: 6,
                  message: 'Confirm password is more than 5 chars'
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {/* @ts-ignore */}
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'validate' && (
                <div className="text-red-500 ">
                  As senhas nao se conhecidem
                </div>
              )
            }
          </div>
        </div>

        <div className='flex justify-between space-x-4 items-center'>
          {/* weight */}
          <div className='w-full'>
            <label 
              htmlFor="weight" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Peso
            </label>
            <input 
              type="text" 
              // name="weight" 
              id="weight" 
              placeholder="Ex: 72.8" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required
              {...register('weight', {
                required: 'Please enter weight',
                maxLength: { value: 6, message: 'weight is more than 3 chars' },
              })}
            />
            {errors.weight && (
              //@ts-ignore
              <div className="text-red-500">{errors.weight.message}</div>
            )}
          </div>
          {/* age */}
          <div className='w-full'>
            <label 
              htmlFor="age" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              idade
            </label>
            <input 
              type="text" 
              // name="age" 
              id="age" 
              placeholder="22" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required
              {...register('age', {
                required: 'Please enter confirm password',
                maxLength: {
                  value: 2,
                  message: 'age is more than 2 chars'
                },
              })}
            />
            {errors.age && (
              <div className="text-red-500 ">
                {/* @ts-ignore */}
                {errors.age.message}
              </div>
            )}
          </div>
          
          {/* width */}
          <div className='w-full'>
            <label 
              htmlFor="width" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Altura
            </label>
            <input 
              type="text" 
              // name="width" 
              id="width" 
              placeholder="1.72" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required
              {...register('width', {
                required: 'Please enter width',
                maxLength: { value: 6, message: 'width is more than 3 chars' },
              })}
            />
            {errors.width && (
              //@ts-ignore
              <div className="text-red-500">{errors.width.message}</div>
            )}
          </div>
        </div>

        <div className='flex justify-between space-x-4 items-center'>
          {/* NAME */}
          <div className='w-full'>
            <label 
              htmlFor="name" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              apelido
            </label>
            <input 
              type="text" 
              // name="age" 
              id="name" 
              placeholder="Fulano de tal..." 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required
              {...register('name', {
                required: 'Please enter name',
                maxLength: {
                  value: 20,
                  message: 'name is more than 20 chars'
                },
              })}
            />
            {errors.name && (
              <div className="text-red-500 ">
                {/* @ts-ignore */}
                {errors.name.message}
              </div>
            )}
          </div>

          {/* address */}
          <div className='w-full'>
            <label 
              htmlFor="address" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              endereço
            </label>
            <input 
              type="text" 
              // name="address" 
              id="address" 
              placeholder="Ex: Av. dolor barreira 1430" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required
              {...register('address', {
                required: 'Please enter confirm password',
                maxLength: {
                  value: 50,
                  message: 'address is more than 50 chars'
                },
              })}
            />
            {errors.address && (
              <div className="text-red-500 ">
                {/* @ts-ignore */}
                {errors.address.message}
              </div>
            )}
          </div>
          {/* birthday */}
          <div className='w-full'>
            <label 
              htmlFor="birthday" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              data de nascimento
            </label>
            <input 
              type="text" 
              // name="birthday" 
              id="name" 
              placeholder="Ex 12/06/2000" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required
              {...register('birthday', {
                required: 'Please enter birthday',
              })}
            />
            {errors.birthday && (
              <div className="text-red-500 ">
                {/* @ts-ignore */}
                {errors.name.message}
              </div>
            )}
          </div>
        </div>

        <div className='flex justify-between space-x-4 items-center'>
          {/* GOOD FOOT */}
          <div className='w-full'>
            <label 
              htmlFor="goodFoot" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Perna boa
            </label>
            <input 
              type="text" 
              // name='goodFoot'
              id="name" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: esquerda" 
              required
              autoFocus
              {...register('goodFoot', {
                required: 'Please enter your good foot',
              })}
            />
            {errors.goodFoot && (
              //@ts-ignore
              <div className="text-red-500">{errors.goodFoot.message}</div>
            )}
          </div>
          {/* player position */}
          <div className='w-full'>
            <label 
              htmlFor="position" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Sua posiçao
            </label>
            <input 
              type="position" 
              // name="position" 
              id="position" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: ataque" 
              required
              {...register('position', {
                required: 'Please enter position',
              })}
            />
            {errors.position && (
              //@ts-ignore
              <div className="text-red-500">{errors.position.message}</div>
            )}
          </div>
          {/* contact */}
          <div className='w-full'>
            <label 
              htmlFor="contact" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              contato
            </label>
            <input 
              type="contact" 
              // name="contact" 
              id="contact" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: 8598-4345" 
              required
              {...register('contact', {
                required: 'Please enter contact',
              })}
            />
            {errors.contact && (
              //@ts-ignore
              <div className="text-red-500">{errors.contact.message}</div>
            )}
          </div>
        </div>
        
        {/* DESCRIPTION */}
        <div className=''>
          <div className='mt-10'>
            <label 
              htmlFor="description" 
              className="block mb-2 text-sm font-medium text-gray-900 mt-5 ufc__font"
            >
              Descreva com sua palavras sua técnicas e habilidades exclusivas
            </label>
            <textarea 
              placeholder='Deixe sua mensagem aqui' 
              className='flex text-white p-1 min-h-[10em] flex-1 w-full bg-gray-700 rounded-md' 
              // name="description" 
              id=""
              required
              {...register('description', {
                required: 'Please enter your description player habilits',
                maxLength: {
                  value: 255,
                  message: 'description is more than 255 chars'
                },
              })}
            />
            {errors.description && (
              <div className="text-red-500 ">
                {/* @ts-ignore */}
                {errors.description.message}
              </div>
            )}
          </div>
        </div>

        <div className='flex-1 justify-center items-center text-center'>
          <button className='rounded-md shadow-lg hover:scale-110 my-10 transition-all justify-center bg-gray-100 p-4' type='submit'>
            Registrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default register