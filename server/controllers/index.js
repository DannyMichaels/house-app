const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const House = require('../models/house')
const User = require('../models/user')

const SALT_ROUNDS = 11
const TOKEN_KEY = 'areallylonggoodkey'

const signUp = async (req, res) => {
	try {
		const { username, email, password } = req.body
		const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
		const user = await User.create({
			username,
			email,
			password_digest
		})
		const payload = {
			id: user.id,
			username: user.username,
			email: user.email
		}

		const token = jwt.sign(payload, TOKEN_KEY)
		return res.status(201).json({ user, token })
	} catch (error) {
		console.log(
			'You made it to the signUp controller, but there was an error :('
		)
		return res.status(400).json({ error: error.message })
	}
}

const signIn = async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({
			where: {
				username
			}
		})
		if (await bcrypt.compare(password, user.dataValues.password_digest)) {
			const payload = {
				id: user.id,
				username: user.username,
				email: user.email
			}

			const token = jwt.sign(payload, TOKEN_KEY)
			return res.status(201).json({ user, token })
		} else {
			res.status(401).send('Invalid Credentials')
		}
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

createHouse = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a house',
        })
    }

    const house = new House(body)

    if (!house) {
        return res.status(400).json({ success: false, error: err })
    }

    house
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: house._id,
                message: 'House created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'House not created!',
            })
        })
}

updateHouse = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    House.findOne({ _id: req.params.id }, (err, house) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'House not found!',
            })
        }
        house.title = body.title
        house.address = body.address
        house.price = body.price
        house
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: house._id,
                    message: 'House updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'House not updated!',
                })
            })
    })
}

deleteHouse = async (req, res) => {
    await House.findOneAndDelete({ _id: req.params.id }, (err, house) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!house) {
            return res
                .status(404)
                .json({ success: false, error: `House not found` })
        }

        return res.status(200).json({ success: true, data: house })
    }).catch(err => console.log(err))
}

getHouseById = async (req, res) => {
    await House.findOne({ _id: req.params.id }, (err, house) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!house) {
            return res
                .status(404)
                .json({ success: false, error: `House not found` })
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getHouses = async (req, res) => {
    await House.find({}, (err, houses) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!houses.length) {
            return res
                .status(404)
                .json({ success: false, error: `Houses were not found` })
        }
        return res.status(200).json({ success: true, data: houses })
    }).catch(err => console.log(err))
}

module.exports = {
    signUp,
    signIn,
    createHouse,
    updateHouse,
    deleteHouse,
    getHouses,
    getHouseById,
}