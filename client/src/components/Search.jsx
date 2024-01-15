import { useState } from "react"

const Search = () => {

    const [location, setLocation] = useState('')
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    const [guests, setGuests] = useState(1)

  return (
    <div className="top-[25rem] w-[794px] mx-auto h-[70px] bg-white rounded-[35px] absolute">
        <form className="flex inline-flex">
            <label className="w-[18px] flex-wrap ml-7 mt-[0.5rem] p-1 text-zinc-700 text-sm font-semibold font-['Montserrat']">
                Location
                <input 
                    type="text"
                    value={location}
                    placeholder="which city do you prefer?"
                    className="mt-[0.3rem] outline-none text-neutral-400 text-sm"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </label>

            <div className="w-[30px] h-[0px] origin-top-left rotate-90 border border-zinc-300
            ml-[10rem] mt-[1.2rem]" />

            <label className="w-[18px] flex-wrap mt-[0.5rem] p-1 text-zinc-700 text-sm font-semibold font-['Montserrat']">
                Checkin
                <input 
                    type="date"
                    value={checkin}
                    placeholder="Add Dates"
                    className="mt-[0.3rem] outline-none text-neutral-400 text-sm"
                    onChange={(e) => setCheckin(e.target.value)}
                />
            </label>

            <div className="w-[30px] h-[0px] origin-top-left rotate-90 border border-zinc-300
            ml-[8rem] mt-[1.2rem]" />

            <label className="w-[18px] flex-wrap mt-[0.5rem] p-1 text-zinc-700 text-sm font-semibold font-['Montserrat']">
                Checkout
                <input 
                    type="date"
                    value={checkout}
                    placeholder="Add Dates"
                    className="mt-[0.3rem] outline-none text-neutral-400 text-sm"
                    onChange={(e) => setCheckout(e.target.value)}
                />
            </label>

            <div className="w-[30px] h-[0px] origin-top-left rotate-90 border border-zinc-300
            ml-[8rem] mt-[1.2rem]" />

            <label className="w-[18px] flex-wrap mt-[0.5rem] p-1 text-zinc-700 text-sm font-semibold font-['Montserrat']">
                Guests
                <input 
                    type="text"
                    value={guests}
                    placeholder="Add Guests"
                    className="mt-[0.3rem] outline-none text-neutral-400 text-sm"
                    onChange={(e) => setGuests(e.target.value)}
                />
            </label>

        </form>

        <div className="w-[54px] h-[54px] bg-zinc-700 rounded-full mt-[-3.4rem] ml-[45rem] hover:w-[56px]
        hover:h-[56px] transition duration-700 ease-in-out cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <rect width="25" height="25" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" fill="#323232"/>
        </svg>
        </div>
    </div>
  )
}
export default Search
