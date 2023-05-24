const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const ticketsSchema = new Schema({
    seat: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    }
    }, 
    {
    timestamps: true
    }
);  

module.exports = mongoose.model('Ticket', ticketsSchema)


