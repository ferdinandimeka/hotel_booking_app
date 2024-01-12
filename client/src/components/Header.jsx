import Search from "./Search"

const Header = () => {
  return (
    <div className="items-center flex justify-center">
      <img src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
        className="absolute"
      >
      </img>
      <div className="h-[70px] pl-[76px] pr-[74px] pt-[7px] pb-1 bg-white bg-opacity-0 
      justify-center items-center gap-2.5 inline-flex overflow-hidden">
        <div className="w-[1097px] h-[46px]">
          <div className="left-8 top-[2px] text-[35px] absolute text-white font-extrabold font-['Montserrat']">LOGO</div>
          <div className="w-[635px] h-[23px] left-[241px] absolute top-[15px] cursor-pointer">
            <div className="w-[130px] h-[23px] left-0 top-0 absolute text-base hover:bg-white text-white 
            font-semibold font-['Montserrat'] bg-opacity-5 text-center hover:bg-zinc-400 rounded-[23px]
            duration-700 ease-in-out"
            >Find a Hotel</div>
            <div className="w-[113px] h-[23px] left-[158px] top-0 absolute text-white text-base 
            hover:bg-white font-semibold font-['Montserrat'] bg-opacity-5 text-center hover:bg-zinc-400 
            rounded-[23px] duration-700 ease-in-out"
            >Share Stories</div>
            <div className="w-[117px] h-[23px] left-[301px] top-0 absolute text-white text-base 
            bg-opacity-5 text-center hover:bg-zinc-400 rounded-[23px] font-semibold font-['Montserrat']
            duration-700 ease-in-out">Rental Guides</div>
            <div className="w-[150px] h-[25px] left-[438px] top-0 absolute text-center text-black text-[15px] 
            font-semibold bg-zinc-200 rounded-[23px] font-['Montserrat'] hover:duration-700 ease-in-out
            hover:w-[155px] hover:h-[26px] hover:bg-neutral-400 delay-150 m-1"
            >Become A Host</div>
          </div>

          <div className="w-[98px] h-[46px] bg-white absolute rounded-[23px] flex right-8 top-2">
            <div className="w-6 h-6 relative">
              <div className="w-5 h-[14.06px] left-[2px] top-[5px] absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                className="m-0.5 p-1 w-8 h-8 ml-3 cursor-pointer hover:bg-zinc-200 rounded-[30px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              </div>
            </div>

            <div className="w-11 h-11 relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              className="ml-9 mt-2 hover:bg-zinc-200 w-[30px] h-[30px] p-1 bg-zinc-300 rounded-[20px]
              cursor-pointer">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="top-[20rem] absolute flex inline-flex text-zinc-100">
        <div className="w-[121px] h-[55px] text-[40px] font-bold font-['Montserrat']
        ">FIND</div>
        <div className="mt-4 flex gap-3 ml-6">
          <div className="w-[58px] h-5 text-base font-semibold font-['Montserrat']">Rooms</div>
          <div className="w-[43px] h-5 text-base font-semibold font-['Montserrat']">Flats</div>
          <div className="w-[63px] h-5 text-base font-semibold font-['Montserrat']">Hostels</div>
          <div className="w-[46px] h-5 text-base font-semibold font-['Montserrat']">Villas</div>
        </div>
        </div>
          <Search />
    </div>
  )
}

export default Header