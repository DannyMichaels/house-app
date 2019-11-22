const { Router } = require('express');
const controllers = require('../controllers')
const restrict = require('../helpers')

const router = Router();

router.post('/sign-up', controllers.signUp)
router.post('/sign-in', controllers.signIn)

router.post('/house', restrict, controllers.createHouse)
router.put('/house/:id', restrict, controllers.updateHouse)
router.delete('/house/:id', restrict, controllers.deleteHouse)
router.get('/house/:id', controllers.getHouseById)
router.get('/houses', controllers.getHouses)

module.exports = router