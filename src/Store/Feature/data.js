import myFirebase from 'Service/Firebase'

import {
	requestLoadData,
	receiveLoadData,
	loadDataError,
	requestWriteData,
	receiveWriteData,
	writeDataError,
} from 'Store/Slice/data'

import { MAX_CACHE_AGE } from 'Constants'

export const writeData = data => dispatch => {
	// TODO: Check data structure
	dispatch(requestWriteData())

	// `type` should be the target path e.g. `games`
	const { type, id, contents } = data
	const typeCache = JSON.parse(localStorage.getItem(`admin-cache-${type}`))
	const updatedTypeCache = {
		data: { ...typeCache.data, [id]: contents },
		timestamp: Math.floor(Date.now() / 1000),
	}

	myFirebase
		.database()
		.ref(`${type}/${id}`)
		.set(contents)
		.then(() => {
			localStorage.setItem(`admin-cache-${type}`, JSON.stringify(updatedTypeCache))
			dispatch(receiveWriteData(data))
		})
		.catch(error => {
			console.log(error)
			dispatch(writeDataError(error.message))
		})
}

export const fetchData = () => dispatch => {
	dispatch(fetch('games'))
	dispatch(fetch('activities'))
	dispatch(fetch('encounters'))
	dispatch(fetch('gamePveActivities'))
	dispatch(fetch('gamePvpActivities'))
	dispatch(fetch('activityEncounters'))
	dispatch(fetch('encounterTemplates'))
}

export const fetch = type => dispatch => {
	dispatch(requestLoadData())

	const typeCache = JSON.parse(localStorage.getItem(`admin-cache-${type}`))
	const timeNow = Math.floor(Date.now() / 1000)
	if (typeCache && timeNow - typeCache.timestamp < MAX_CACHE_AGE) {
		dispatch(receiveLoadData({ type, data: typeCache.data }))
	} else {
		myFirebase
			.database()
			.ref(type)
			.once('value')
			.then(snapshot => {
				localStorage.setItem(
					`admin-cache-${type}`,
					JSON.stringify({ data: snapshot.val(), timestamp: Math.floor(Date.now() / 1000) }),
				)
				dispatch(receiveLoadData({ type, data: snapshot.val() }))
			})
			.catch(error => {
				console.log(error)
				dispatch(loadDataError(error.message))
			})
	}
}
