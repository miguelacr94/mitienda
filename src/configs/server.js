const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')


const { allowedOrigins } = require('./vars')

//imports
const purchaseRoutes = require('../routes/purchase.routes')
const cardRoutes = require('../routes/products.routes')


const app = express()

if (process.env.NODE_ENV == 'production') {
    // app.use(cors({
    //     origin: allowedOrigins
    // }))
    app.use(cors('*'))
    app.use(morgan('short'))
    app.use(helmet())
}
else {
    app.use(cors('*'))
    app.use(morgan('dev'))
}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//routes
app.use('/purchase', purchaseRoutes)
app.use('/products', cardRoutes)

app.use((req, res) => { return res.send('Resource not found') })

module.exports = app
