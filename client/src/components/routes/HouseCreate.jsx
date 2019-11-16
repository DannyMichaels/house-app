import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import HouseForm from '../shared/HouseForm'
import Layout from '../shared/Layout'
import { createHouse } from '../../api/houses'

class HouseCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			house: {
				title: '',
                address: '',
                price: ''
			},
			createdHouse: null
		}
	}

	handleChange = (event) => {
		const updatedField = { [event.target.name]: event.target.value }

		const editedItem = Object.assign(this.state.item, updatedField)

		this.setState({ item: editedItem })
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.addHouse(this.state.house)
		createHouse(this.state.house)
			.then((res) =>
				res.status === 201
					? this.setState({ createdHouse: res.data.house })
					: null
			)
			.catch(console.error)
	}

	render() {
		const { handleChange, handleSubmit } = this
		const { createdHouse, house } = this.state
		const { history } = this.props

		if (createdHouse) {
			return <Redirect to={`/houses`} />
		}

		return (
			<Layout>
				<HouseForm
					house={house}
					history={history}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					cancelPath='/'
				/>
			</Layout>
		)
	}
}

export default HouseCreate