import React from 'react'
import Image from 'next/image'
import Logo from '../../assets/mma.png'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

interface OptionsNavMenuProps {
  title: string;
  link: string;
  icon: string;
}

const optionsNavMenu: OptionsNavMenuProps[] = [
  { title: 'Home', link: '/', icon: ''},
  { title: 'Jogos', link: '/games', icon: ''},
  { title: 'Tabela', link: '/table', icon: ''},
  { title: 'Times', link: '/teams', icon: ''},
  { title: 'Tickets', link: '/', icon: ''},
]

const Header:React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect }: any = router.query;

  return (
    <header className='flex justify-between mx-20'>
      <div className='flex items-center'>
        <Image 
          className='md:mr-8 h-24'
          src={Logo} 
          alt="logo" 
          width={100} 
          height={150} 
        />
        <ul className='flex flex-wrap justify-between items-center'>
          {optionsNavMenu.map((i, idx) => (
            <li key={idx} className='p-4 '>
              <a className='md:text-md text-white sm:text-sm uppercase' href={`${i.link}`}>
                { i.title }
              </a>
            </li>
          ))}
        </ul>
      </div>
      {!session?.user ? (
        <div className='flex space-x-4'>
          <button className='text-white'>
            LOGIN
          </button>
          <span className='border-r-2 my-10'/>
          <button className="btn text-white" onClick={() => {}}>
            SIGN UP
          </button>
        </div>
      ) : (
        <button className="btn rounded-full text-white my-4 p-4 h-24" onClick={() => signOut()}>
          SIGN OUT
        </button>
      )}
    </header>
  )
}

export default Header