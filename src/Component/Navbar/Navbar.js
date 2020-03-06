import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'Store/Feature/auth'

import NavContainer from './Navbar.styles'

const Navbar = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	return (
		<NavContainer>
			<NavLink to="/">Home</NavLink> | {isAuthenticated ? <NavbarAuth /> : <NavbarDefault />}
		</NavContainer>
	)
}

const NavbarDefault = () => (
	<React.Fragment>
		<NavLink to="/login">Login</NavLink>
	</React.Fragment>
)

const NavbarAuth = () => {
	const dispatch = useDispatch()
	const details = useSelector(state => state.user.details)

	return (
		<React.Fragment>
			<NavLink to="/edit">Edit encounters</NavLink> | <NavLink to="/admin">Admin users</NavLink>
			<button
				type="button"
				onClick={() => {
					dispatch(logoutUser())
				}}
			>
				Logout
			</button>
			<span>{details.username}</span>
		</React.Fragment>
	)
}

export default Navbar
