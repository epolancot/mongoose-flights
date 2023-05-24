const Flight = require('../models/flight');
const Ticket = require('../models/ticket');


const airlineOptions = ["#", "American", "Delta", "Southwest", "United", "Virgin"]
const airportOptions = ["#", "AUS", "DEN", "JFK", "LAG", "LAX"]
const days = {0: "Sun.", 1: "Mon.", 2:"Tue.", 3:"Wed.", 4:"Thu.", 5:"Fri.", 6:"Sat."}
const months = {0: "JAN", 1: "FEB", 2:"MAR", 3:"APR", 4:"MAY", 5:"JUN", 6:"JUL",7: "AUG", 8: "SEP", 9:"OCT", 10:"NOV", 11:"DEC"}

module.exports = {
    index,
    new: newFlight,
    create,
    showAirline,
    showFlight,
};

async function index(req, res){
    const flights = await Flight.find({})
    flights.sort(function(a,b){
        return new Date(a.departs) - new Date(b.departs)
    })
    const formattedFlights = []
    let flightObj = {}
    flights.forEach(function(flight){
        // prepare .id
        flightObj.id = flight._id
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
        // Date comparison to determine if this flight already departed
        const currentDate = new Date()
        if (date < currentDate) {
            flightObj.hasPassed = true
        } else {
            flightObj.hasPassed = false
        }
        formattedFlights.push(flightObj)
        flightObj = {}
    })
    // render =========================
    res.render('flights/index', {
        title: "Mongoose Flights",
        flights: formattedFlights,
        home: "active",
        addFlight: "",
        createTicket: ""
    })
    // render =========================
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`
    
    // render =========================
    res.render('flights/new', { 
        departsDate,
        errorMsg: '',
        title: 'New Flight',
        home: "",
        addFlight: "active",
        createTicket: ""       
    });
    // render =========================
}

async function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    //req.body.nowShowing = !!req.body.nowShowing;
    // remove any whitespace at start and end of flight
    //req.body.flight = req.body.flight.trim();
    try {
        let flight = req.body
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
        // prepare .destinations
        formattedFlightObj.destinations = []
    
        await Flight.create(formattedFlightObj)
        res.redirect('/flights');
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
    }
}

async function showAirline(req, res) {
    const airline = await Flight.find({airline: req.params.airline})
    airline.sort(function(a,b){
        return new Date(a.departs) - new Date(b.departs)
    })
    const formattedFlights = []
    let flightObj = {}
    airline.forEach(function(flight){
        // prepare .id
        flightObj.id = flight._id
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
        // Date comparison to determine if this flight already departed
        const currentDate = new Date()
        if (date < currentDate) {
            flightObj.hasPassed = true
        } else {
            flightObj.hasPassed = false
        }
        formattedFlights.push(flightObj)
        flightObj = {}
    })
    // render =========================
    res.render('flights/show-airline', {
        icon: req.params.airline,
        title: req.params.airline,
        flights: formattedFlights,
        home: "",
        addFlight: "",
        createTicket: ""  
    })
    // render =========================
}

async function showFlight(req, res) {
    const flight = await Flight.findById(req.params.id)
    const tickets = await Ticket.findById(req.params.id).populate('Flight')
    
    console.log(tickets)
    //console.log(ticketsTest)
    let flightObj = {}
    flightObj.id = flight._id
    flightObj.airline = flight.airline
    flightObj.airport = flight.airport
    flightObj.flightNo = flight.flightNo
    //format departure date
    const date = new Date(flight.departs)
    flightObj.departs = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` 
    // Add departure time
    flightObj.time = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12:true})

    flightObj.destinations = []
    
    let destinationsObj = {}

    flight.destinations.forEach (function(destination) {
        destinationsObj.airport = destination.airport
        let date = new Date(destination.arrival)
        destinationsObj.arrival = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        destinationsObj.time = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12:true})
        flightObj.destinations.push(destinationsObj)
        destinationsObj = {}
    })
    // sort destinations
    flightObj.destinations.sort(function(a,b){
        return new Date(a.arrival) - new Date(b.arrival)
    })

    // prepare remaining destinations ariports available
    // clone the array
    const availableAirports = [...airportOptions]
    flightObj.destinations.forEach(function(destination){
        let index = availableAirports.indexOf(destination.airport)
        availableAirports[index] = ""
    })

    // show default arrival date
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs
    // Format the date for the value attribute of the input
    let arrivalDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`
    arrivalDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`

    // show tickets
    const flightTickets = await Ticket.find({flight: flightObj.id})

    // render =========================
    res.render('flights/show-flight', {
        icon: flight.airline,
        home: "",
        addFlight: "",
        createTicket: "", 
        title: `${flight.airline} Flight No. ${flight.flightNo}`,
        flight: flightObj,
        airports: availableAirports,
        defaultArrivalDate: arrivalDate,
        tickets: flightTickets
    })
    // render =========================
}

