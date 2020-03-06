import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from 'View/Home'
import PasswordReset from 'View/PasswordReset'
import Login from 'View/Login'
import Edit from 'View/Edit'
import Admin from 'View/Admin'

import Navbar from 'Component/Navbar'

import NormalizeStyles from 'Styles/NormalizeStyles'

const App = () => {
	const userLevel = useSelector(state => state.user?.details?.level)
	const { isLoggingIn, isLoggingOut, isVerifying, isAuthenticated } = useSelector(state => state.auth)
	const { isCreating, isLoading } = useSelector(state => state.user)

	if (isLoggingIn) {
		return (
			<React.Fragment>
				<h1>Logging in</h1>
			</React.Fragment>
		)
	}
	if (isLoggingOut) {
		return (
			<React.Fragment>
				<h1>Logging out</h1>
			</React.Fragment>
		)
	}
	if (isVerifying) {
		return (
			<React.Fragment>
				<h1>Verifying</h1>
			</React.Fragment>
		)
	}
	if (isCreating) {
		return (
			<React.Fragment>
				<h1>Creating user</h1>
			</React.Fragment>
		)
	}
	if (isLoading) {
		return (
			<React.Fragment>
				<h1>Loading</h1>
			</React.Fragment>
		)
	}
	if (isAuthenticated && userLevel !== 3901) {
		return (
			<React.Fragment>
				<h1>You must be an admin to use this</h1>
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<NormalizeStyles />
			<Router>
				<Navbar />
				<Switch>
					<Route path="/passwordreset">{isAuthenticated ? <Redirect to="/" /> : <PasswordReset />}</Route>
					<Route path="/login">{isAuthenticated ? <Redirect to="/" /> : <Login />}</Route>
					<Route path="/edit">{isAuthenticated ? <Edit /> : <Redirect to="/login" />}</Route>
					<Route path="/admin">{isAuthenticated ? <Admin /> : <Redirect to="/login" />}</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</React.Fragment>
	)
}

export default App
