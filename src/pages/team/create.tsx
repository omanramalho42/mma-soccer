import { getError } from '@/utils/getError';
import axios from 'axios';
import { useRouter } from 'next/router'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormProps {
  teamName: string;
  plan: string;
  ownerEmail: string;
  ownerPhone: string;
  teamImage: string;
}

const create = () => {
  const router = useRouter();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [form, setForm] = useState<FormProps | null>(null);  

  const submitHandler = async ({ 
    name
  }: any ) => {
    try {
      const result: any = await axios.post('/api/team/create', {
        name,
      });

      if(result.error) {
        toast.error(result.error);
      } else {
        toast.success("sucesso ao criar usuário");
      }

    } catch (error: any) {
      toast.error(getError(error))
    }
  }

  return (
    <div>
      <button
        onClick={() => router.back()} 
        className='p-4 bg-gray-400 rounded-xl shadow-full mx-2 my-2'
      >
        voltar
      </button>
      <form>
        <div>
          <label htmlFor="name">Nome do time</label>
          <input 
            type="text" 
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

        <button type='submit' className='bg-green-600' onClick={(event) => submitHandler(event)}>
            Cadastrar
        </button>
      </form>
    </div>
  )
}

export default create