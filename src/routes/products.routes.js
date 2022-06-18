const controller = require('../controllers/products.controller')
const { Router } = require('express')
const router = Router()

router
    .route('/')
    .post(controller.store)
    .get(controller.getAll)


module.exports = router