import React from 'react'
import {FaSearch}from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'


const Header = () => {

  const {currentUser} =useSelector(state =>state.user)

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/'>
        <h1 className='text-bold text-lg sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Vikas</span>
        <span className='text-slate-800'>Estate</span>
      </h1>
        </Link>
      
      <form action="" className='bg-slate-100 p-3 rounded-lg items-center flex'>
        <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <FaSearch className='text-zinc-700'/>
      </form>
      <ul className='flex gap-4'>
        <Link to='/'><li className='hidden sm:inline text-zinc-900 hover:underline hover:scale-110 duration-200 cursor-pointer'>Home</li></Link>
        <Link to='/about'><li className='hidden sm:inline text-zinc-900 hover:underline hover:scale-110 duration-200 cursor-pointer'>About</li></Link>

        
        <Link to='/profile'>
        {
          currentUser ?(
            <img src={currentUser.avatar} alt="profile"
            className='rounded-full h-7 w-7 object-cover' />
          ):(
            <li className=' text-zinc-900 hover:underline hover:scale-110 duration-200 cursor-pointer'>SignIn</li>
          )
        }
        
          </Link>
      </ul>
      </div>
    </header>
  )
}

export default Header
