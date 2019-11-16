import React from 'react'
import Layout from '../shared/Layout'

export default function Houses(props) {
	const { history, match, user, houses } = props
	const renderButton = (id) => {
		if (user) {
			return (
				<button onClick={() => history.push(`${match.url}/${id}`)}>
					See More
				</button>
			)
		} else {
			return null
		}
	}

	const renderHouses = () => {
		if (houses) {
			return houses.map((house) => {
				return (
					<div className='item' key={house.id}>
						<h4>{house.title}</h4>
						{renderButton(house.id)}
					</div>
				)
			})
		} else {
			return null
		}
	}

	if (user) {
		return (
			<Layout>
				<h4>Houses</h4>
				{!houses ? <h3>No Houses at this time.</h3> : null}
				<div className='item-container'>{renderHouses()}</div>
			</Layout>
		)
	} else {
		return (
			<div className='landing'>
				<h2>Welcome to the House App!</h2>
				<div className='main'>
					{!items ? <h3>No Houses at this time.</h3> : null}
					<div className='item-container'>{renderHouses()}</div>
				</div>
			</div>
		)
	}
}