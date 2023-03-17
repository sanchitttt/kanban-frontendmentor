module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    jwt : {
        expirationMilliseconds : 604800000
    }

}