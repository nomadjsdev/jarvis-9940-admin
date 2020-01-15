import myFirebase from 'Service/Firebase'

import {
	// requestNewUser,
	// receiveNewUser,
	// newUserError,
	requestLoadData,
	receiveLoadData,
	loadDataError,
	// requestWriteData,
	// receiveWriteData,
	// writeDataError,
	// requestClearUser,
	// receiveClearUser,
	// clearUserError,
} from 'Store/Slice/data'

// export const createUser = (uid, email) => dispatch => {
// 	dispatch(requestNewUser())

// 	myFirebase
// 		.database()
// 		.ref(`user/${uid}`)
// 		.set({ email })
// 		.then(() => {
// 			dispatch(receiveNewUser({ email }))
// 		})
// 		.catch(error => {
// 			console.log(error)
// 			dispatch(newUserError(error.message))
// 		})
// }

// export const setSelectedGame = gameId => dispatch => {
// 	dispatch(requestWriteData())
// 	dispatch(receiveWriteData({ type: 'selectedGame', data: gameId }))
// }

export const fetchData = () => dispatch => {
	dispatch(fetchGames())
	dispatch(fetchActivities())
	dispatch(fetchEncounters())
	dispatch(fetchGamePveActivities())
	dispatch(fetchGamePvpActivities())
	dispatch(fetchActivityEncounters())
	dispatch(fetchEncounterTemplates())
}

export const fetchGames = () => dispatch => {
	dispatch(requestLoadData())

	myFirebase
		.database()
		.ref(`game`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadData({ type: 'games', data: snapshot.val() }))
		})
		.catch(error => {
			console.log(error)
			dispatch(loadDataError(error.message))
		})
}

export const fetchActivities = () => dispatch => {
	dispatch(requestLoadData())

	myFirebase
		.database()
		.ref(`activity`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadData({ type: 'activities', data: snapshot.val() }))
		})
		.catch(error => {
			console.log(error)
			dispatch(loadDataError(error.message))
		})
}

export const fetchEncounters = () => dispatch => {
	dispatch(requestLoadData())

	myFirebase
		.database()
		.ref(`encounter`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadData({ type: 'encounters', data: snapshot.val() }))
		})
		.catch(error => {
			console.log(error)
			dispatch(loadDataError(error.message))
		})
}

export const fetchGamePveActivities = () => dispatch => {
	dispatch(requestLoadData())

	myFirebase
		.database()
		.ref(`gamePveActivity`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadData({ type: 'gamePveActivities', data: snapshot.val() }))
		})
		.catch(error => {
			console.log(error)
			dispatch(loadDataError(error.message))
		})
}

export const fetchGamePvpActivities = () => dispatch => {
	dispatch(requestLoadData())

	myFirebase
		.database()
		.ref(`gamePvpActivity`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadData({ type: 'gamePvpActivities', data: snapshot.val() }))
		})
		.catch(error => {
			console.log(error)
			dispatch(loadDataError(error.message))
		})
}

export const fetchActivityEncounters = () => dispatch => {
	dispatch(requestLoadData())

	myFirebase
		.database()
		.ref(`activityEncounter`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadData({ type: 'activityEncounters', data: snapshot.val() }))
		})
		.catch(error => {
			console.log(error)
			dispatch(loadDataError(error.message))
		})
}

export const fetchEncounterTemplates = () => dispatch => {
	dispatch(requestLoadData())

	myFirebase
		.database()
		.ref(`encounterTemplate`)
		.once('value')
		.then(snapshot => {
			dispatch(receiveLoadData({ type: 'encounterTemplates', data: snapshot.val() }))
		})
		.catch(error => {
			console.log(error)
			dispatch(loadDataError(error.message))
		})
}

// export const clearUser = () => dispatch => {
// 	dispatch(requestClearUser())
// 	// Check if user object cleared
// 	// if success
// 	dispatch(receiveClearUser())
// 	// else:
// 	// dispatch(clearUserError("Error message here"))
// }
