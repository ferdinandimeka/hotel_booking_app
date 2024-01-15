import { useState } from 'react'

const Footer = () => {

    const [email, setEmail] = useState('')

  return (
    <footer>
      <div className="w-full top-[33.8rem] absolute">
        
        <div className='h-[300px]'>
          <div className='flex justify-center items-center bg-gray-200 h-[117px] mx-auto'>
            <div className='mx-5 p-1'>
              <div className=" text-zinc-700 text-lg font-bold 
                font-['Montserrat'] leading-tight">
                NEWSLETTER
              </div>
              <div className="mt-1 text-zinc-700 text-sm font-medium 
              font-['Montserrat'] leading-tight">Stay Up to Date</div>
            </div>

            <form className='flex inline-flex'>
              <label>
                <input
                  type='email'
                  placeholder="Your Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-[700px] h-[50px] rounded-[23px] p-4 outline-none'
                />
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
              className="w-10 p-2 h-10 ml-[-3rem] mt-[0.3rem] bg-neutral-400 rounded-[20px]
              hover:bg-neutral-200 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </form>

          </div>

          <div className="bg-gray-100 flex justify-between h-[300px]">
              <div className="text-zinc-700 text-[50px] font-extrabold font-['Montserrat']
              ">LOGO
              </div>
          </div>

        </div>
          </div>
    </footer>
  )
}

export default Footer