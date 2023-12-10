import React from 'react'
import Image from 'next/image'
import Logo from '../../assets/mma.png'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

interface OptionsNavMenuProps {
  title: string;
  link: string;
  icon: string;
  disable?: boolean;
}

const optionsNavMenu: OptionsNavMenuProps[] = [
  { title: 'Inicio', link: '/', icon: ''},
  { title: 'Estatisticas', link: '/dashboard', icon: '', disable: true },
  { title: 'Calendário', link: '/calendar', icon: '', disable: true },
  { title: 'Noticias', link: '/news', icon: ''},
  { title: 'Jogar', link: '/team/teams', icon: ''},
]

const Header:React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect }: any = router.query;

  return (
    <header className='flex justify-between mx-20'>
      <div className='flex-1 flex justify-between flex-wrap items-center'>
        <Image 
          className='md:mr-8 h-24'
          src={Logo} 
          alt="logo" 
          width={100} 
          height={150} 
        />
        <ul className='flex justify-between items-center'>
          {optionsNavMenu.map((i, idx) => (
            <li key={idx} className='p-4 '>
              <a className='md:text-md text-gray-900 sm:text-sm uppercase' href={`${i.link}`}>
                { i.title }
              </a>
            </li>
          ))}
        </ul>
      {!session?.user ? (
        <div className='flex space-x-4'>
          <button className='text-gray-900'>
            ENTRAR
          </button>
          <span className='border-r-2 my-10'/>
          <button className="btn text-gray-900" onClick={() => {}}>
            SAIR
          </button>
        </div>
      ) : (
        <button className="btn rounded-full text-gray-900 my-4 p-4 h-24" onClick={() => signOut()}>
          SAIR
        </button>
      )}
      </div>
    </header>
  )
}

export default Header