const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
};

function newTicket(req, res) {
    let id = req.body.flightNo
    if (id === "generate") { id = "" }

    res.render('tickets/new', {
        title: "Create Ticket",
        home: "",
        addFlight: "",
        createTicket: "active", 
        flightNo: id,
        message: "", 
        messageType: ""
    })
} 

async function create(req, res) {

    try {
        // get ObjectID for flightNo
        const ticket = {}
        const query = req.body.flight
        const flight = await Flight.findOne({flightNo: query})

        if (flight === null) {
            res.render('tickets/new', { 
                title: "Create Ticket",
                home: "",
                addFlight: "",
                createTicket: "active",
                flightNo: req.body.flightNo,
                message: `Looks like Flight No. ${req.body.flight} has not been created. Please create the flight first.`,
                messageType: "alert-warning" 
                });
            return
        }

        ticket.seat = req.body.seat
        ticket.price = req.body.price
        ticket.flight = flight._id

        await Ticket.create(ticket)


        res.redirect(`/flights/${ticket.flight}`)
        
    } catch (err) {
        console.log(err);
        res.render('tickets/new', { 
            title: "Create Ticket",
            home: "",
            addFlight: "",
            createTicket: "active",
            flightNo: req.body.flightNo,
            message: `Holy guacamole! ${err.message}`,
            messageType: "alert-warning" 
            });
    }
}