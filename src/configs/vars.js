module.exports = {
    port: process.env.PORT || 4001,
    allowedOrigins: ["*"],
    mongoUri: process.env.NODE_ENV == 'production' ? process.env.MONGO_URI : 'mongodb+srv://code:code@cluster0.ei8tv.mongodb.net/barberapp?retryWrites=true&w=majority',
}