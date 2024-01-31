const { Booking } = require('../models/index')
const {StatusCodes}= require('http-status-codes')
const {AppError,ValidationError}= require('../utils/errors/index')

class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data)
            return booking
        } catch (error) {
           if(error.name=='SequlizeValidationError')
          { throw new ValidationError(error)}

          throw new AppError(
            'RepositoryError',
            'Cannot create Booking',
            'there are some issue creating the booking please try again later',
            StatusCodes.INTERNAL_SERVER_ERROR
          )

        }
    }
}
module.exports = BookingRepository