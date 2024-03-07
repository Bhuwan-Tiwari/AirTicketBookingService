const express = require('express')
const {BookingController}= require('../../controllers/index')
const router = express.Router()

router.get('/info',(req,res)=>{
    return res.json({message : "Response from routes"})
})
router.post('/bookings',BookingController.create)

module.exports = router; 