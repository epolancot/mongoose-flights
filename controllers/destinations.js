const Flight = require('../models/flight');
const airportOptions = ["#", "AUS", "DEN", "JFK", "TPA", "LAX"]

module.exports = {
  create
};

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
    let destinationsObj = {}

    // prepare .airport
    if (req.body.airport === "1") {
        destinationsObj.airport = airportOptions[1]
    } else if (req.body.airport === "2") {
        destinationsObj.airport = airportOptions[2]
    } else if (req.body.airport === "3") {
        destinationsObj.airport = airportOptions[3]
    } else if (req.body.airport === "4") {
        destinationsObj.airport = airportOptions[4]
    } else if (req.body.airport === "5") {
        destinationsObj.airport = airportOptions[5]
    }
    destinationsObj.arrival = req.body.arrival

    flight.destinations.push(destinationsObj);
    try {
      // Save any changes made to the flight doc
      await flight.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/flights/${flight._id}`);
  }