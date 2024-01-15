import { FETCH_HOTEL_FAIL, FETCH_HOTEL_REQUEST, FETCH_HOTEL_SUCCESS 
} from "../constants/hotelConstants";
import axios from 'axios'

 export const hotelDetails = () => async (dispatch) => {
   try {
     dispatch({ type: FETCH_HOTEL_REQUEST })

      const { data } = await axios.get(`http://localhost:5000/api/v1/hotel/all?limit=4&page=1`)
      console.log(data)
     dispatch({
       type: FETCH_HOTEL_SUCCESS,
       payload: data
     })
   } catch (error) {
     dispatch({
       type: FETCH_HOTEL_FAIL,
       payload: error.response && error.response.data.message ? 
       error.response.data.message : error.message
     })
   }
 }