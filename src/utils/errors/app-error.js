class AppError extends Error{
    constructor(name,message,explantion,statusCode)
    {
        super();
        this.name = name;
        this.message= message
        this.explantion =explantion
        this.statusCode=statusCode
    }
}
module.exports =AppError