const Product = require('../models/products.model')

exports.store = async ({ body }, res, next) => {
    try {

        let data = new Product(body)
        var error = data.validateSync();
        if (error) {
            let status = []

            for (const key in error.errors) {
                let message = error.errors[key].message
                let res = {
                    field: error.errors[key].path,
                    reason: message.toString().replace(/\\|"/gi, "")
                };
                status.push(res);
            }
            return res.status(400).json({ success: false, info: 'Invalid data structure', data: status })
        } else {
            console.log("hola")
            let status = await data.save();
            if (!('_id' in status)) {
                return  res.status(400).json({ success: false, info: 'Fatal Error, unable to store credits, try later' })
            } else {
                return  res.status(200).json({ success: true, info: 'Credits save successfully', data: status })
            }
        }
    } catch (error) {
        return { success: false, info: 'Error', data: error }
    }
}





exports.getAll = async (req, res, next) => {
    try {
        const data = await Product.find()
        return res.status(200).json({ success: true, info: 'ok', data: data })
    } catch (error) {
        next(error)
    }
}