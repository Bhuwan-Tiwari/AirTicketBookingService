const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const { PORT }= require('./config/serverconfig')

const apiRoutes = require('./routes/index')

const setupAndStartServer=()=>
{

   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({extended : true}))

   app.use('/api',apiRoutes)
    
   app.listen(PORT, async () => {
    console.log(`SERVER STARTED AT PORT ${PORT}`)
    })
}
setupAndStartServer();


