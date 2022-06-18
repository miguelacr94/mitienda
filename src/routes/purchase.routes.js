const controller = require('../controllers/purchase.controller')
const { Router } = require('express')
const router = Router()

router
    .route('/')
    .post(controller.store)
    .get(controller.getAll)

router
    .route('/one/:id')
    .get(controller.getOne)


module.exports = router