const { Router } = require('express');
const controllers = require('../controllers')

const router = Router();

router.post('/house', controllers.createHouse)
router.put('/house/:id', controllers.updateHouse)
router.delete('/house/:id', controllers.deleteHouse)
router.get('/house/:id', controllers.getHouseById)
router.get('/houses', controllers.getHouses)

module.exports = router