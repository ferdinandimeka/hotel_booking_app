import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import { listHotels } from '../redux/actions/hotelActions'
import Hotels from '../components/Hotels';
import ModernLoader from '../components/ModernLoader'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import Paginator from '../components/Pagination'

const HomeScreen = () => {

  const dispatch = useDispatch()

  const hotelList = useSelector((state) => state.hotelList)
  const { loading, error, hotels, pages, initialPage } = hotelList

  useEffect(() => {
    dispatch(listHotels())
  }, [dispatch])

  return (
    loading ? (
      <Loader />
    ) : error ? (
      <h3>{error}</h3>
    ) : (
      <div className='scroll-smooth'>
        <Header />

        {loading ? (
          <ModernLoader />
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <div className='bg-violet-100 px-15 py-20 mt-[-1.6rem]'>
            <div className='grid grid-cols-4 md:grid-cols-2 gap-6 sm:grid-cols-1 lg:grid-cols-3 mx-10'>
              {hotels && hotels.length && hotels.map((hotel) => (
                <div key={hotel._id}>
                  <Hotels hotel={hotel} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Paginator color={"secondary"} total={pages} initialPage={initialPage} />
        <Footer />

      </div>
    )
  )
}

export default HomeScreen
