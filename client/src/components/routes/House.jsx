import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'
import { getHouseById, deleteHouseById } from '../../api/houses'

class House extends Component {
	constructor(props) {
		super(props)

		this.state = {
			house: null,
			deleted: false
		}
	}

	async componentDidMount() {
		try {
			const house = await getHouseById(this.props.match.params.id)
			this.setState({ house })
		} catch (err) {
			console.error(err)
		}
	}

	destroy = () => {
		deleteHouseById(this.state.house.id)
			.then(() => this.setState({ deleted: true }))
			.catch(console.error)
	}

	render() {
		const { house, deleted } = this.state

		if (!house) {
			return <p>Loading...</p>
		}

		if (deleted) {
			return (
				<Redirect
					to={{
						pathname: '/houses',
						state: { msg: 'House succesfully deleted!' }
					}}
				/>
			)
		}

		return (
			<Layout>
				<div className='item'>
					<Link to='/houses'>
						<span> Back to all houses</span>
					</Link>
					<h4>{house.title}</h4>
					<p>Address: {house.address}</p>
                    <p>Price: {house.price}</p>
					<div className='buttons'>
						<button className='danger' onClick={this.destroy}>
							Delete House
						</button>
						<button
							className='edit'
							onClick={() =>
								this.props.history.push(
									`/houses/${this.props.match.params.id}/edit`
								)
							}>
							Edit
						</button>
					</div>
				</div>
			</Layout>
		)
	}
}

export default House