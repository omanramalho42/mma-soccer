import React from 'react'
import Image from 'next/image'
import Logo from '../../assets/mma.jpg'
import { signOut } from 'next-auth/react'

const Header:React.FC = () => {
  return (
    <header className='flex md:m-16 shadow-xl sm:m-0 justify-center bg-gray-50 rounded-md'>
      <ul className='flex flex-wrap justify-between items-center'>
        <li className='p-4'>
          <a href="" className='md:text-md sm:text-sm uppercase '>Eventos</a>
        </li>
        {['Rankings', 'Atletas', 'Noticias'].map((i) => (
          <li className='p-4 '>
            <a className='md:text-md sm:text-sm uppercase ' href="">{ i }</a>
          </li>
        ))}
        <Image 
          src={Logo} 
          alt="logo" 
          width={100} 
          height={150} 
        />
        {['MMA 10 anos', 'Conectese', 'Onde assistir',' ufc fantasy'].map((i) => (
          <li className='p-4 '>
            <a href="" className='md:text-md sm:text-sm  uppercase'>{ i }</a>
          </li>
        ))}
        <button className="btn p-4 bg-purple-600" onClick={() => signOut()}>
          signOut
        </button>
        {/* <li className=''>
          <a href="">search</a>
        </li> */}
      </ul>
    </header>
  )
}

export default Header