const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create
};

async function index(req, res){
    const fff = await Flight.getAll() 
    console.log(fff)
    res.render('flights/index', {
        title: "Mongoose Flights",
        flights: fff
    })
}

function newFlight(req, res) {
    // We'll want to be able to render an
    // errorMsg if the create action fails
    res.render('flights/new', { 
        errorMsg: '',
        title: 'New Flight'
     });
  }

async function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    //req.body.nowShowing = !!req.body.nowShowing;
    // remove any whitespace at start and end of flight
    //req.body.flight = req.body.flight.trim();

    console.log(req.body)
  
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