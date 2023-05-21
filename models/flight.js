const mongoose = require('mongoose')
const airlineOptions = ["#", "American", "Delta", "Southwest", "United", "Virgin"]
const airportOptions = ["#", "AUS", "DEN", "JFK", "LAG", "LAX"]
const days = {0: "Sun.", 1: "Mon.", 2:"Tue.", 3:"Wed.", 4:"Thu.", 5:"Fri.", 6:"Sat."}
const months = {0: "JAN", 1: "FEB", 2:"MAR", 3:"APR", 4:"MAY", 5:"JUN", 6:"JUL",7: "AUG", 8: "SEP", 9:"OCT", 10:"NOV", 11:"DEC"}


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
    getDefault,
    create,
    getAll,
    getAirline
}

async function getDefault() {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`
    
    return departsDate
    }

async function create(flight){
    const formattedFlightObj = {}
    // prepare .airline
    if (flight.airline === "1") {
        formattedFlightObj.airline = airlineOptions[1]
    } else if (flight.airline === "2") {
        formattedFlightObj.airline = airlineOptions[2]
    } else if (flight.airline === "3") {
        formattedFlightObj.airline = airlineOptions[3]
    } else if (flight.airline === "4") {
        formattedFlightObj.airline = airlineOptions[4]
    } else if (flight.airline === "5") {
        formattedFlightObj.airline = airlineOptions[5]
    }
    // prepare .airport
    if (flight.airport === "1") {
        formattedFlightObj.airport = airportOptions[1]
    } else if (flight.airport === "2") {
        formattedFlightObj.airport = airportOptions[2]
    } else if (flight.airport === "3") {
        formattedFlightObj.airport = airportOptions[3]
    } else if (flight.airport === "4") {
        formattedFlightObj.airport = airportOptions[4]
    } else if (flight.airport === "5") {
        formattedFlightObj.airport = airportOptions[5]
    }
    // prepare .flightNo
    formattedFlightObj.flightNo = flight.flightNo        
    // prepare .departures
    formattedFlightObj.departs = flight.departs
await Flight.create(formattedFlightObj)
}

async function getAll(){
    const flights = await Flight.find({})
    flights.sort(function(a,b){
        return new Date(a.departs) - new Date(b.departs)
    })
    const formattedFlights = []
    let flightObj = {}
    flights.forEach(function(flight){
        // prepare .airline
        flightObj.airline = flight.airline
        // prepare .airport
        flightObj.airport = flight.airport
        // flightNo
        flightObj.flightNo = flight.flightNo  
        
        // format date
        const date = new Date(flight.departs)
        flightObj.departs = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        
        // Add departure time
        flightObj.time = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12:true})
        formattedFlights.push(flightObj)
        flightObj = {}
    })
    return formattedFlights
}

async function getAirline(query){
    const airline = await Flight.find({airline: query})
    airline.sort(function(a,b){
        return new Date(a.departs) - new Date(b.departs)
    })
    const formattedFlights = []
    let flightObj = {}
    airline.forEach(function(flight){
        // prepare .airline
        flightObj.airline = flight.airline
        // prepare .airport
        flightObj.airport = flight.airport
        // flightNo
        flightObj.flightNo = flight.flightNo         
        // format date
        const date = new Date(flight.departs)
        flightObj.departs = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`       
        // Add departure time
        flightObj.time = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12:true})
        formattedFlights.push(flightObj)
        flightObj = {}
    })
return formattedFlights
}

