const express = require('express');
const ticketsRouter = express.Router();
const ticketsCtrl = require('../controllers/tickets');

ticketsRouter.post('/:id/new', ticketsCtrl.create)


module.exports = ticketsRouter;