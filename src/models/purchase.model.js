const { Schema, model } = require('mongoose')


const Purchase = new Schema({
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        min: 0
    },

    fullName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },


}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

Purchase.virtual('totalPaid')
Purchase.virtual('pays')

Purchase.methods = {
    async getTotalPaid() {
        let data = await Pay.find({ purchase: this._id })
        let total = 0
        for (const pay of data) {
            if (pay.state == 'approved')
                total += pay.amount
        }
        this.set('totalPaid', total)
        this.set('pays', data)
    },

    async getPays() {
        const data = await Pay.find({ purchase: this._id })
        this.set('pays', data)
    }
}

Purchase.post('find', async (result) => {
    for (const purchase of result) {
        try {
            await purchase.getTotalPaid()
        } catch (error) {
            console.log(error)
        }
        // await purchase.getPays()
    }
})

Purchase.post(['findOne', 'findById'], async (result) => {
    if (result) {
        try {
            await result.getTotalPaid()
        } catch (error) {
            console.log(error)
        }
        // await result.getPays()
    }
})

module.exports = model('Purchase', Purchase)