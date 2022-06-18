const Purchase = require('../models/purchase.model')


exports.store = async (req, res, next) => {
    try {
        let data = new Purchase(req.body)
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
        }
        let status = await data.save()
        return res.status(200).json({ success: true, info: "OK", data: status.id })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const data = await Purchase.find({}).populate({ path:"products.productId", model:"Product" })
        return res.status(200).json({ success: true, info: 'ok', data: data })
    } catch (error) {
        next(error)
    }
}


exports.getOne = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await Purchase.findById(id).populate({ path:"products.productId", model:"Product" })
        if (!data || !data._id)
            return res.status(400).json({ success: false, info: 'error, does not exist', })
        console.log(data)
        return res.status(200).json({ success: true, info: 'ok', data: data })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


