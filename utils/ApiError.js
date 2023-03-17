class ApiError extends Error{
    constructor(statusCode,message){
        super(statusCode,message);

        if(Error.captureStackTrace){
            Error.captureStackTrace(this,ApiError);
        }
        
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ApiError;