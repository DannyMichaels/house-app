import React from 'react'
import Houses from './Houses'

const Landing = (props) => (
	<div className='container landing'>
		<Houses {...props} />
	</div>
)
export default Landing