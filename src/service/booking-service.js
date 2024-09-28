const axios = require('axios')

const {BookingRepository}= require('../repository/index')
const {FLIGHT_SERVICE_PATH}= require('../config/serverconfig')
const {ServiceError}= require('../utils/errors')

class BookingService
{
    constructor()
    {
        this.BookingRepository = new BookingRepository
    }
    async createBooking(Data)
    {
try {
    const flightId =  Data.flightId
    const getFlightReuestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
    const response = await axios.get(getFlightReuestURL)
    const flightdata = response.data.data       //flight.data = whole flight data
    let priceOfTheFlight =flightdata.price
   
    if(Data.noOfSeats> flightdata.totalSeats)
    {
        throw new ServiceError("something went wrong in booking process,'insufficent seats")
    }
    console.log(priceOfTheFlight)
    console.log("priceOfTheFlight",priceOfTheFlight)
    console.log("Data.noOfseat", Data.noOfSeats)
    const totalCost = priceOfTheFlight*Data.noOfSeats
    console.log("total cost",totalCost)
    const bookingPayload = { ... Data, totalCost}
    console.log("booking pay load ",bookingPayload)
    const booking = await this.BookingRepository.create(bookingPayload)
    console.log("bookig is",booking)
    const updateFlightRequestURL =`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
    console.log("patch request",updateFlightRequestURL)
    await axios.patch(updateFlightRequestURL,{totalSeats:flightdata.totalSeats - Data.noOfSeats})
    return booking 
   
} 
catch (error) {

    if(error.name =='RepositoryError'|| error.name=='ValidationError')
    throw error;
}
throw new ServiceError()
    }
}

module.exports=BookingService