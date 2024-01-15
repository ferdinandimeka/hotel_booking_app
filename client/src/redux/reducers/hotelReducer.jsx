import {
    FETCH_HOTEL_REQUEST, FETCH_HOTEL_SUCCESS, FETCH_HOTEL_FAIL
} from "../constants/hotelConstants";

export const hotelDetailReducer = (state = { hotels: [] }, action) => {
    switch (action.type) {
        case FETCH_HOTEL_REQUEST:
            return { loading: true, hotels: [] }
        case FETCH_HOTEL_SUCCESS:
            return {
                loading: false,
                hotels: action.payload.hotels,
                page: action.payload.currentPage,
                pages: action.payload.totalPages
            }
        case FETCH_HOTEL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}