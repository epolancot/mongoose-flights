const mongoose = require('mongoose');


const Schema = mongoose.Schema;

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
    }
    },
    {
    timestamps: true,
    }
);


const Flight = mongoose.model('Flight', flightSchema)

module.exports = {
    create,
    getAll
}

async function getAll(){
    const flights = await Flight.find({})
    return flights
}

async function create(flight){
   await Flight.create(flight)
}


