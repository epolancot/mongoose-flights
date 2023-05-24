const express = require('express');
const ticketsRouter = express.Router();
const ticketsCtrl = require('../controllers/tickets');

ticketsRouter.post('/new', ticketsCtrl.new)
ticketsRouter.post('/create', ticketsCtrl.create)


module.exports = ticketsRouter;