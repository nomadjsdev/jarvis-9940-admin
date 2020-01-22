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
	<>
		<NavLink to="/register">Register</NavLink> | <NavLink to="/login">Login</NavLink>
	</>
)

const NavbarAuth = () => {
	const dispatch = useDispatch()
	const details = useSelector(state => state.user.details)

	return (
		<>
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
		</>
	)
}

export default Navbar
