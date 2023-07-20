import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import axios from 'axios';

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getError } from '@/utils/getError'

import { toast } from 'react-toastify'

import Header from '@/components/Header'

const news = (props: any) => {
  const { data: session } = useSession();
  
  const router = useRouter();
  const { redirect }: any = router.query;

  const[news, setNews] = useState<any | null>(null);
  const [carousel, setCarousel] = useState<string[]>([]);

  const fetchNews = async () => {
    await axios.get(`${process.env.API_URL}/api/news/news`)
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
    <div>
      <Header />
      {news ? (
        <div className='mt-10'>
          {news?.map((post: any) => (
            <div key={post._id} className='space-y-10 border-2 border-gray-900 my-10 justify-center flex flex-col items-center'>
              <h1 className='text-xl font-bold'>
                { post.title }
              </h1>
              <p>{post.author.toString()}</p>
              <h2>
                { post.subtitle }
              </h2>
              <h3>
                { post.slug }
              </h3>
              <h4>
                { post.description }
              </h4>
              <p>
                {post.content}
              </p>
              <span>
                {post.category}
              </span>
              <p>{post.playerRef.toString()}</p>
              <img src={post.featuredImage || ""} alt={post.title} />

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
                    <img src={carousel[carouselIdx]} alt={carousel[carouselIdx]} />
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

              <span>
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