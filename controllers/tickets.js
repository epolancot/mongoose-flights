const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    create
};

function create(req, res) {
    let id = req.params.id

    console.log(id)

    if (id === "generate") { id = "" }

    res.render('tickets/new', {
        title: "Create Ticket",
        home: "",
        addFlight: "",
        createTicket: "active", 
        flightNo: id,
        errorMsg: "" 
    })
}  
