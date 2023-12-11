import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import axios from 'axios';

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getError } from '@/utils/getError'

import { toast } from 'react-toastify'

import Header from '@/components/Header'

import IMAGEPOST from '../../assets/post4.jpeg'
import IMAGEPOST2 from '../../assets/bg.jpeg'
import IMAGEPOST3 from '../../assets/post5.jpeg'

import Image from 'next/image';

const IMAGES = [
  IMAGEPOST,
  IMAGEPOST2,
  IMAGEPOST3
]

const news = (props: any) => {
  const { data: session } = useSession();
  
  const router = useRouter();
  const { redirect }: any = router.query;

  const[news, setNews] = useState<any | null>(null);
  const [carousel, setCarousel] = useState<string[]>([]);

  const fetchNews = async () => {
    await axios.get(`/api/news/news`)
    .then((res) => { 
      setNews(res.data?.data), 
      Promise.resolve(res.data);

      toast.success("Sucesso ao pegar os dados")
    }).catch((error: Error) => {
      Promise.reject(error),
      toast.error(getError(error.message)
    )});
  }

  useEffect(() => {
    fetchNews();

    if(news) {
      setCarousel(
        news?.carousel?.map((img: any) => img)
      );
    }
  },[session, router, redirect]);

  const [carouselIdx, setCarouselIdx] = useState(0);
  useEffect(() => {
    if(carouselIdx >= 4) {
      setCarouselIdx(0);
    }
    if(carouselIdx < 0) {
      setCarouselIdx(3);
    }
  },[carouselIdx]);

  return (
    <div className=''>
      <Header />
      {news ? (
        <div className='grid grid-cols-3 gap-5 mx-20 mt-5 w-25'>
          {news?.map((post: any, idx:number) => (
            <div key={post._id} className='space-y-4 border-2 border-gray-50 my-10 justify-center flex flex-col items-center'>
              <h1 className='text-3xl uppercase font-bold text-gray-900'>
                { post.title }
              </h1>
              {/* <p>{post.author.toString()}</p> */}
              <h2 className='text-xl font-medium text-gray-900'>
                { post.subtitle }
              </h2>
              {/* <h3>
                { post.slug }
              </h3> */}
              <div className='mx-5'>
                <p className='text-left text-gray-900'>
                  { post.description }
                </p>
                <p className='text-left text-gray-900'>
                  {post.content}
                </p>
              </div>
              {/* <span>
                {post.category}
              </span> */}
              {/* <p>{post.playerRef.toString()}</p> */}
              <Image src={post.featuredImage || IMAGES[idx] } alt={post.title} height={300} />

              <div className='flex w-full justify-center items-center'>
                {/* {post.carousel && post.carousel.map((src: string,idx: number) => ( */}
                  <div className='flex justify-around items-center w-full flex-1'>
                    <button
                      type='button' 
                      className='relative p-4 text-xl' 
                      onClick={() => 
                        setCarouselIdx((value: number) => value--)
                      }
                    >
                      {"<"}
                    </button>
                    {/* <img src={carousel[carouselIdx]} alt={carousel[carouselIdx]} /> */}
                    <button 
                      type='button'
                      className='relative p-4 text-xl' 
                      onClick={() => 
                        setCarouselIdx((value: number) => value++)
                      }
                    >
                      {">"}
                    </button>
                  </div>
                {/* ))} */}
              </div>
              {post.tags && post.tags.map((tag: string, idx: number) => (
                <div key={idx}>
                  <p>{ tag }</p>
                </div>
              ))}
              {post.comments && post.comments.map((comment: string, idx: number) => (
                <div key={idx}>
                  <p>{ comment }</p>
                </div>
              ))}

              <span className='text-gray-900'>
                { post.createdAt }
              </span>

            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Nenhuma noticia encontrada...</p>
        </div>
      )}

      <div className='flex flex-row items-center justify-center my-10'>
        <button 
          type='button' 
          className='p-4 bg-purple-600 text-white text-center'
          onClick={() => router.push("/news/createNews")}
        >
          + criar new 
        </button>
      </div>
    </div>
  )
}

export default news