import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavBar = () => {

  const [ click, setClick ] = useState(false)

  const handleClick = () => setClick(!click)

  const content = <>
    <div className='lg:hidden block absolute w-full top-16 right-0 left-0 bg-violet-500 transition'>
      <ul className='text-center p-20 text-xl'>
        <Link spy={true} smooth={true} to="/Home" className="text-white text-xl font-bold">
          <li className='my-4 py-4 border-b border-violet-500 hover:bg-violet-950 hover:rounded'>Home</li>
        </Link>

        <Link spy={true} smooth={true} to="/Register" className="text-white text-xl font-bold">
          <li className='my-4 py-4 border-b border-violet-500 hover:bg-violet-950 hover:rounded'>Register</li>
        </Link>

        <Link spy={true} smooth={true} to="/Login" className="text-white text-xl font-bold">
          <li className='my-4 py-4 border-b border-violet-500 hover:bg-violet-950 hover:rounded'>Login</li>
        </Link>

        <Link spy={true} smooth={true} to="/Services" className="text-white text-xl font-bold">
          <li className='my-4 py-4 border-b border-violet-500 hover:bg-violet-950 hover:rounded'>Services</li>
        </Link>
      </ul>
    </div>
  </>

  return (
    <nav>
      <div className="bg-violet-700 flex justify-between items-center h-10vh px-20 py-4 mx-auto lg:py-5 z-50">
        <div className="flex items-center flex-1">
          <a className="text-white text-2xl font-bold" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </a>
          <p className="text-2xl font-bold ml-3 mr-auto">
            <span className="text-red-500">M</span>
            <span className="text-blue-500">-</span>
            <span className="text-yellow-500">B</span>
            <span className="text-indigo-500">o</span>
            <span className="text-green-500">o</span>
            <span className="text-pink-500">k</span>
            <span className="text-purple-500">.com</span>
          </p>
        </div>
        <div className="lg-flex md-flex sm:hidden  items center justify-end font-normal flex-1">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-white text-[18px]">
              <Link spy={true} smooth={true} to="/Home" className="text-white text-lg font-bold">
                <li className='hover:text-violet-50 transition border-b-2 border-violet-700 hover:border-violet-50 cursor-pointer'>Home</li>
              </Link>

              <Link spy={true} smooth={true} to="/Register" className="text-white text-lg font-bold">
                <li className='hover:text-violet-50 transition border-b-2 border-violet-700 hover:border-violet-50 cursor-pointer'>Register</li>
              </Link>

              <Link spy={true} smooth={true} to="/Login" className="text-white text-lg font-bold">
                <li className='hover:text-violet-50 transition border-b-2 border-violet-700 hover:border-violet-50 cursor-pointer'>Login</li>
              </Link>

              <Link spy={true} smooth={true} to="/Services" className="text-white text-lg font-bold">
                <li className='hover:text-violet-50 transition border-b-2 border-violet-700 hover:border-violet-50 cursor-pointer'>Services</li>
              </Link>
            </ul>
          </div>
        </div>

        <div>
          { click && content }
        </div>

        <button className='block md:hidden lg:hidden xl:hidden 2xl:hidden transition' onClick={handleClick}>
          { click ? <FaTimes /> : <FaBars />}
        </button>
        
      </div>
    </nav>
  )
}

export default NavBar