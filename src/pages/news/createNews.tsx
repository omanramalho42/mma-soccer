import React, { ChangeEvent, useEffect, useState } from 'react'

import axios from 'axios'
import { getError } from '@/utils/getError'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import Header from '@/components/Header'

const createNews:React.FC = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect }: any = router.query;

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  
  const [previewImg, setPreviewImg] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const[ previewPost, setPreviewPost] = useState(null);
  
  const [tags, setTags] = useState([]);
  
  const handleFetchTags = () => {

  }

  const handlePreviewImg = (event: ChangeEvent<any>) => {
    event.preventDefault();

    const file = event.target.files[0] || "";  
    setImageFile(file);
    const previewURL = URL.createObjectURL(file);
    setPreviewImg(previewURL);
  }

  const [carousel, setCarousel] = useState<string[]>([])

  const handlePreviewCarouselImg = (event: ChangeEvent<any>) => {
    event.preventDefault();

    const file = event.target.files;
    
    let previewsUrls = [];
    for(let i = 0; i< file.length; i++) {
      previewsUrls.push(URL.createObjectURL(file[i]));
    }

    setCarousel(previewsUrls);
  }

  useEffect(() => {
    if(session?.user) {
      console.log(session.user,'usuario logado');
    } else {
      console.log("usuario deslogado")
    }
  },[router,redirect,session])

  const handleSubmitForm = async ({
    title,
    subtitle,
    description,
    content,
    tags,
    category,
    playerRef,
  }: any) => {
    //@ts-ignore
    let author = session?.user?._id || "";
    // OBJECT ID USER.ID
    // PLAYERREF OBJECT ID
    
    const newPost = {
      title,
      subtitle,
      description,
      content,
      tags,
      category,
      playerRef: author,
      carousel: carousel,
      featuredImage: imageFile,
      author: author,
      slug: title.toLowerCase().replace(" ","-").trim()
    }

    console.log(newPost,'new post');
    
    try {  
      await axios.post('/api/news/createNew', {
        newPost
      });

      toast.success("Sucesso ao criar novo post");
    } catch (error: any) {
      console.log(error,'erros');
      toast.error(getError(error))
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col mx-20 md:mx-40 justify-between h-[100vh]'>
        <h1 className='text-3xl my-10 uppercase'>
          Criar postagem nova
        </h1>

        <div className='flex-1 flex-col space-y-10'>
          <div className='flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-10'>
            {/* TITULO DA POSTAGEM */}
            <div className='flex flex-col w-full'>
              <label htmlFor="title" className='text-left font-semibold'>
                Titulo da postagem
              </label>
              <input 
                type="text" 
                className='p-4 text-white cursor-pointer bg-gray-600 rounded-xl border-1 border-gray-300 hover:scale-105 transition-all' 
                {...register('title', {
                  required: 'Entre com um titulo válido',
                  maxLength: {
                    value: 255,
                    message: 'O titulo tem que ser menor que 255 caracteres'
                  },
                })}
              />
              {errors.title && (
                <div className='flex flex-row justify-center items-center bg-red-600 rounded-xl'> 
                  <p className='font-semibold text-white text-center'>
                    {/* @ts-ignore */}
                    { errors.title.message }
                  </p>
                </div>
              ) }
            </div>

            {/* SUBTITLE DA POSTAGEM */}
            <div className='flex flex-col w-full'>
              <label htmlFor="subtitle" className='text-left font-semibold'>
                sub Titulo da postagem
              </label>
              <input 
                type="text" 
                className='p-4 text-white cursor-pointer bg-gray-600 rounded-xl border-1 border-gray-300 hover:scale-105 transition-all' 
                {...register('subtitle', {
                  required: 'Entre com um sub-titulo válido',
                  maxLength: {
                    value: 255,
                    message: 'O sub-titulo tem que ser menor que 255 caracteres'
                  },
                })}
              />
              {errors.subtitle && (
                <div className='flex flex-row justify-center items-center bg-red-600 rounded-xl'> 
                  <p className='font-semibold text-white text-center'>
                    {/* @ts-ignore */}
                    { errors.subtitle.message }
                  </p>
                </div>
              ) }
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-10'>
            {/* DESCRIÇÃO DA POSTAGEM */}
            <div className='flex flex-col w-full'>
              <label 
                htmlFor="description" 
                className='text-left font-semibold'
              >
                Descrição da postagem
              </label>
              <input 
                type="text" 
                className='p-4 cursor-pointer text-white bg-gray-600 rounded-xl border-1 border-gray-300 hover:scale-105 transition-all' 
                {...register('description', {
                  required: 'Entre com uma descrição válida',
                  maxLength: {
                    value: 255,
                    message: 'A Descrição tem que ser menor que 255 caracteres'
                  },
                })}
              />
              {errors.description && (
                <div className='flex flex-row justify-center items-center bg-red-600 rounded-xl'> 
                  <p className='font-semibold text-white text-center'>
                    {/* @ts-ignore */}
                    { errors.description.message }
                  </p>
                </div>
              ) }
            </div>

            {/* CONTEUDO DA POSTAGEM */}
            <div className='flex flex-col w-full'>
              <label htmlFor="content" className='text-left font-semibold'>
                Conteúdo da postagem
              </label>
              <input 
                type="text" 
                className='p-4 text-white cursor-pointer bg-gray-600 rounded-xl border-1 border-gray-300 hover:scale-105 transition-all' 
                {...register('content', {
                  required: 'Entre com um conteúdo válida',
                  maxLength: {
                    value: 255,
                    message: 'O Conteúdo tem que ser menor que 255 caracteres'
                  },
                })}
              />
              {errors.content && (
                <div className='flex flex-row justify-center items-center bg-red-600 rounded-xl'> 
                  <p className='font-semibold text-white text-center'>
                    {/* @ts-ignore */}
                    { errors.content.message }
                  </p>
                </div>
              ) }
            </div>
          </div>
          
          <div className='flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-10'>
          
            {/* ESCOLHER A CATEGORIA DO POST */}
            <div className='flex flex-col w-full'>
              <label 
                htmlFor="category" 
                className='text-left font-semibold'
              >
                categoria
              </label>
              <select 
                id="category" 
                required
                {...register('category')}
                className='p-4 text-white cursor-pointer bg-gray-600 rounded-xl border-1 border-gray-300'
              >
                <option value={"futebol"}>
                  futebol
                </option>
              </select>
            </div>

            {errors.category && (
              <div className='flex flex-row justify-center items-center bg-red-600 rounded-xl'> 
                <p className='font-semibold text-white text-center'>
                  {/* @ts-ignore */}
                  { errors.category.message }
                </p>
              </div>
            )}
            
            {/* SELECIONAR O USUARIO REFERENTE AO POST */}
            <div className='flex flex-col w-full'>
              <label 
                htmlFor="playerRef"
                className='text-left font-semibold'
              >
                Jogador vinculado
              </label>
              <select 
                className='p-4 text-white cursor-pointer bg-gray-600 rounded-xl border-1 border-gray-300'
                {...register('playerRef')}
                required
              >
                {/* PERCORRER TODOS OS JOGADORES DISPONIVEIS PARA VINCULAR AO POST */}
                <option value="guidaum">
                  Guidaum
                </option>
              </select>
            </div>
            
            {errors.playerRef && (
              <div className='flex flex-row justify-center items-center bg-red-600 rounded-xl'> 
                <p className='font-semibold text-white text-center'>
                  {/* @ts-ignore */}
                  { errors.playerRef.message }
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className='flex my-10 flex-col lg:flex-row w-full justify-between space-x-10'>
          {/* FEATURED IMAGE  */}
          <div className='flex flex-col justify-center space-y-10'>
            <label 
              htmlFor="featuredImage" 
              className='font-bold text-md uppercase'
            >
              Escolha uma Imagem
            </label>
            <input 
              type="file"
              required
              onChange={(event) => 
                handlePreviewImg(event)
              } 
              className='cursor-pointer' 
            />
            {previewImg && (
              <img 
                className="aspect-auto object-contain"
                src={ previewImg } 
                alt="featured image"  
              />
            )}
          </div>
          
          {/* PREVIEW POST */}
          <div className='flex flex-col w-full text-center'>
            <p>preview post</p>
            <div className='border-1 p-2 border-gray-400 w-full h-full rounded-sm'>
              {previewPost && (
                <>
                < p>preview post</p>
                </>
                // <PreviewPost />
              )}
            </div>
          </div>
        </div>

        {/* TAGS */}
        <div className='flex flex-col my-10 w-full'>
          <p>Gerar tags</p>
          <select 
            {...register('tags')}
            className='bg-purple-500 text-white'
            multiple
          >
            {/* PERCORRER TODAS AS TAGS */}
            {tags.length > 0 && (
              <option value="">
                tag 1
              </option>
            )}
          </select>
          {/* GERAR BUTOES DE TAGS COM OPCAO DE ADD A LISTA DE TASG (NO MAX 10) */}
        </div>
        
        {errors.tags && (
          <div className='flex flex-row justify-center items-center bg-red-600 rounded-xl'> 
            <p className='font-semibold text-white text-center'>
              {/* @ts-ignore */}
              { errors.tags.message }
            </p>
          </div>
        )}

        <div className='flex flex-wrap items-center justify-between space-x-5 spac-y-5'>
          {tags && (
            tags.map((tag: any) => (
              <div 
                className='bg-purple-500 rounded-full text-center' 
                key={tag._id}
              >
                <p className='text-white text-sm font-light'>
                  {tag?.name}
                </p>
              </div>
            ))
          )}
        </div>

        {/* CAROUSEL */}
        <div className='flex my-10 flex-col w-full'>
          <label 
            htmlFor="carousel"
            className=''
          >
            Escolher galeria de fotos
          </label>
          <input 
            accept='images/*'
            type="file" 
            multiple 
            onChange={(event: any) => handlePreviewCarouselImg(event)}
          />
        </div>

        {/* BUTAO */}
        <div className='flex space-x-5 flex-row my-5 justify-center items-center'>
          <button type='submit' className='p-4 shadow-full text-white font-bold uppercase rounded-xl text-center hover:scale-110 transition-all bg-purple-700 hover:bg-purple-950'>
            salvar
          </button>
          <button 
            type='button' 
            className='p-4 bg-gray-700 text-white rounded-xl font-bold uppercase shadow-full text-center'
            onClick={() => router.back()}
          >
            voltar 
          </button>
        </div>
        
      </form>
    </>
  )
}

export default createNews