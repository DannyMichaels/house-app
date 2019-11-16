import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
	<nav>
		<NavLink to='/houses'>Houses</NavLink>
		<NavLink to='/create'>Create House</NavLink>
	</nav>
)

export default Nav