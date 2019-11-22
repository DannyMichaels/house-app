const { Router } = require('express');
const controllers = require('../controllers')
const restrict = require('../helpers')

const router = Router();

router.post('/sign-up', controllers.signUp)
router.post('/sign-in', controllers.signIn)

router.post('/houses', restrict, controllers.createHouse)
router.put('/houses/:id', restrict, controllers.updateHouse)
router.delete('/houses/:id', restrict, controllers.deleteHouse)
router.get('/houses/:id', controllers.getHouseById)
router.get('/houses', controllers.getHouses)

module.exports = router