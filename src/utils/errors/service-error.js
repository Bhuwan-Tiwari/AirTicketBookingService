const {StatusCodes}=require('http-status-codes')


class ServiceError extends Error {
    constructor(
        messsage,
        explanation,
       statusCodes =StatusCodes.INTERNAL_SERVER_ERROR

    )
    {
       super() 
       this.name='ServiceError'
       this.message=messsage 
       this.explanation=explanation
       this.statusCode=statusCodes;
    }
}
module.exports =ServiceError