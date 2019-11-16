import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import HouseForm from '../shared/HouseForm'
import { getHouseById, updateHouse } from '../../api/houses'

class HouseEdit extends Component {
	constructor(props) {
		super(props)

		this.state = {
			house: {
				title: '',
                address: '',
                price: ''
			},
			updated: false
		}
	}

	async componentDidMount() {
		try {
			const house = await getHouseById(this.props.match.params.id)
			this.setState({ item })
		} catch (err) {
			console.error(err)
		}
	}

	handleChange = (event) => {
		const updatedField = { [event.target.name]: event.target.value }

		const editedHouse = Object.assign(this.state.house, updatedField)

		this.setState({ house: editedHouse })
	}

	handleSubmit = (event) => {
		event.preventDefault()

		updateHouse(this.props.match.params.id)
			.then(() => this.setState({ updated: true }))
			.catch(console.error)
	}

	render() {
		const { house, updated } = this.state
		const { handleChange, handleSubmit } = this

		if (updated) {
			return <Redirect to={`/houses/${this.props.match.params.id}`} />
		}

		return (
			<>
				<HouseForm
					house={house}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					cancelPath={`/houses/${this.props.match.params.id}`}
				/>
			</>
		)
	}
}
export default HouseEdit