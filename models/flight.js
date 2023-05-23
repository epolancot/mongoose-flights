const mongoose = require('mongoose')



const Schema = mongoose.Schema;

const destinationsSchema = new Schema({
    airport: {
        type: String,
        required: true
    },
    arrival: {
        type: Date,
        required: true
    }
    }, 
    {
    timestamps: true
    }
);  

const flightSchema = new Schema(
    {
    airline: String,
    airport: { 
        type: String,
        default: "JFK"
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: { 
        type: Date, 
        default: function () {
            return new Date().setFullYear(new Date().getFullYear() + 1);
        } 
    },
    destinations: [destinationsSchema],
    tickets: { 
        type: Schema.Types.ObjectId,
        ref: 'Tickets'
    }
    },
    {
    timestamps: true,
    }
);



module.exports = mongoose.model('Flight', flightSchema)


