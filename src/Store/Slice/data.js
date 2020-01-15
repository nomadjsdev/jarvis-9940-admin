import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isCreating: false,
	isLoading: false,
	isWriting: false,
	// isClearing: false,
	createDataError: false,
	loadDataError: false,
	writeDataError: false,
	// clearDataError: false,
	games: null,
	gamePveActivities: null,
	gamePvpActivities: null,
	activities: null,
	activityEncounters: null,
	encounters: null,
	encounterTemplates: null,
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		// requestNewUser(state, action) {
		// 	state.isCreating = true
		// 	state.createUserError = false
		// },
		// receiveNewUser(state, action) {
		// 	state.isCreating = false
		// 	state.details = { email: action.payload.email }
		// },
		// newUserError(state, action) {
		// 	state.isCreating = false
		// 	state.createUserError = action.payload
		// },
		requestLoadData(state, action) {
			state.isLoading = true
			state.loadDataError = false
		},
		receiveLoadData(state, action) {
			state.isLoading = false
			state[action.payload.type] = action.payload.data
		},
		loadDataError(state, action) {
			state.isLoading = false
			state.loadDataError = action.payload
		},
		// requestWriteData(state, action) {
		// 	state.isWriting = true
		// 	state.writeDataError = false
		// },
		// receiveWriteData(state, action) {
		// 	state.isWriting = false
		// 	state[action.payload.type] = action.payload.data
		// 	// 	state[action.payload.type] = action.payload.data
		// },
		// writeDataError(state, action) {
		// 	state.isWriting = false
		// 	state.writeDataError = action.payload
		// },
		// requestClearUser(state, action) {
		// 	state.isClearing = true
		// 	state.clearUserError = false
		// 	state.details = null
		// },
		// receiveClearUser(state, action) {
		// 	state.isClearing = false
		// },
		// clearUserError(state, action) {
		// 	state.isClearing = false
		// 	state.clearUserError = action.payload
		// },
	},
})

export const {
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
} = dataSlice.actions

export default dataSlice.reducer
