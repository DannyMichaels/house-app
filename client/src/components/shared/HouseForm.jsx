import React from 'react'

const HouseForm = ({
	item,
	handleSubmit,
	handleChange,
	cancelPath,
	history
}) => (
	<div className='form-container'>
		<form onSubmit={handleSubmit}>
			<label>Title</label>
			<input
				placeholder='A nice house.'
				value={house.title}
				name='title'
				required
				onChange={handleChange}
			/>

			<label>Address</label>
			<input
				placeholder='1100 Four Hundred St'
				value={house.address}
				name='address'
				required
				onChange={handleChange}
			/>

            <label>Price</label>
			<input
				placeholder='250000'
				value={house.price}
				name='price'
				required
				onChange={handleChange}
			/>

			<button type='submit'>Submit</button>
			<button className='danger' onClick={() => history.push(cancelPath)}>
				Cancel
			</button>
		</form>
	</div>
)

export default HouseForm