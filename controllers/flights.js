const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create,
    showAirline
};

async function index(req, res){
    const flights = await Flight.getAll() 
    res.render('flights/index', {
        title: "Mongoose Flights",
        flights: flights
    })
}

async function newFlight(req, res) {
    const departsDate = await Flight.getDefault();
    res.render('flights/new', { 
        departsDate,
        errorMsg: '',
        title: 'New Flight'       
    });
}

async function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    //req.body.nowShowing = !!req.body.nowShowing;
    // remove any whitespace at start and end of flight
    //req.body.flight = req.body.flight.trim();
    try {
        await Flight.create(req.body);
        // Always redirect after CUDing data
        // We'll refactor to redirect to the movies index after we implement it
        res.redirect('/flights');
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
    }
}

async function showAirline(req, res) {
    const airline = await Flight.getAirline(req.params.airline)
    console.log(req.params.airline)
    res.render('flights/show-airline', {
        icon: req.params.airline,
        title: req.params.airline,
        flights: airline
    })
}