const mongoose = require('mongoose')
const { mongoUri } = require('./vars')
const Log = require('./../utils/loggerService')

if(process.env.NODE_ENV == 'development') {
    mongoose.set('debug', true)
}
console.log(mongoUri)
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => Log.info('Database is connected'))
.catch(err => Log.error(err))