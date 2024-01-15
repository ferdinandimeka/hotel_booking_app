import { useEffect } from 'react'
//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Loader from '../components/Loader';
import { Card, CardMedia, IconButton, Typography, CardContent, CardHeader } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { hotelDetails } from '../redux/actions/hotelActions';
//import Footer from '../components/Footer'

const Home = () => {

  //const navigate = useNavigate();
  const dispatch = useDispatch()

  // getting the hotels data from the store
  const hotelList = useSelector((state) => state.hotelDetails)
  const { loading, error, hotels } = hotelList

  // firing off dispatch to get the hotels data
  useEffect(() => {
    dispatch(hotelDetails())
  }, [dispatch])

  return (
  <div>
    { loading ? (
      <Loader />
    ) : error ? (
      <h3>{error}</h3>
    ) : (
      <div className='scroll-smooth'>
      <Header />
      <div className="h-[676px] top-[570px] pt-6 px-20 m-4 bg-zinc-200 left-[25px] absolute">
        <div className="w-[339px] h-[103px] text-zinc-700 text-4xl font-bold font-['Montserrat'] leading-[48px]"
        >Latest on the Hotel Listing
          <div className="w-[140px] mt-[1rem] h-1.5 bg-zinc-700 rounded-[3px]" />
        </div>
        <div className="w-full h-[400px] gap-6 my-16 inline-flex">
        {hotels && hotels.length && hotels.map((hotel) => (
          <Card sx={{ maxWidth: 300 }} key={hotel._id}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <FavoriteIcon />
                </IconButton>
              }
            />
              <CardMedia
                key={hotel._id}
                component="img"
                height="194"
                image={hotel.photo}
                alt="Paella dish"
              />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {hotel.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hotel.country}, {hotel.address}
              </Typography>
            </CardContent>
          </Card>
        ))}
        </div>
        
        <div className='w-[1300px] h-[600px] absolute'>
          <div className="w-[1206px] h-[395px] my-16 ml-6 mb-6 px-4 absolute bg-footer-texture bg-no-repeat bg-auto rounded-xl" />
        </div>
      </div>
      {/* <Footer /> */}
      </div>
    )}
  </div>
  )
}

export default Home
