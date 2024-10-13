const {StatusCodes}= require('http-status-codes')
const {BookingService}= require('../service/index')

const bookingService = new BookingService()

const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverconfig');


class BookingController {
    
    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: 'This is a notification from queue 2',
                content: 'Some queue will subscribe this',
                recepientEmail: "bhuwan1200@gmail.com",
                notificationTime: '2024-06-20T16:51:00'
            },
            service: 'CREATE_TICKET'
            // data: {
            //     mailSubject: 'This is a notification from booking service',
            //     mailBody: 'hi there you have a notification.',
            //     mailFrom: "bhuwan1200@gmail.com",
            //     mailTo: 'bhuwan1200@gmail.com'
            // },
            // service: 'SEND_BASIC_MAIL'
        }
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully published the event',
            err: {}
        })
    }

    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body)
            return res.status(StatusCodes.OK).json({
                message : 'sucessfully complated booking',
                success :true,
                err: {},
                data:response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message : error.message,
                success :false,
                err: error.explaination,
                data:{}
            })
        }
    }

}

module.exports = BookingController;