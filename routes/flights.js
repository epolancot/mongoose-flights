var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/airline/:airline', flightsCtrl.showAirline)
router.get('/:id', flightsCtrl.showFlight)
router.post('/', flightsCtrl.create)
	
module.exports = router;
