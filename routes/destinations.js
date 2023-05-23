const express = require('express');
const destinationsRouter = express.Router();
const destinationsCtrl = require('../controllers/destinations');


destinationsRouter.post('/:id/add', destinationsCtrl.create)


module.exports = destinationsRouter;