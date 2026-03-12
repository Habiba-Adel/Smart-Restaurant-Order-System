//the name convention for this class is AppError and there is very good note here and it is that the sucess paramter no need to be passed here 
//and that cause it is already false 


/**
 * what the righ default value for the statuscode here to make the apperror take it 400 or 500?
 * the right answer is the 500 and that because if any error will happened cause of any problem with the app itself 
 * but if it was validation error it will be 400 and if it was validation you in the code will be already handle it by passing 400 but if you do not pass 400 so that means 
 * it is not validation error and it is just app error
 * 
 * 
 * we can also not passing the data in the apperror constructor and that cause the data was sent is returned back only if the request is successful but in all 
 * app error requests there is no data will be returned so we can delete it 
 */


class AppError extends Error {
    constructor(msg = 'Something went wrong', statusCode = 400) {
        super(msg);
        this.statusCode = statusCode;
    }
}

module.exports = AppError;