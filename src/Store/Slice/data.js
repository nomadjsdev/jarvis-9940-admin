import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isCreating: false,
	isLoading: false,
	isWriting: false,
	createDataError: false,
	loadDataError: false,
	writeDataError: false,
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
		requestWriteData(state, action) {
			state.isWriting = true
			state.writeDataError = false
		},
		receiveWriteData(state, action) {
			state.isWriting = false
			state.writeDataError = false
			state[action.payload.type][action.payload.id] = action.payload.contents
		},
		writeDataError(state, action) {
			state.isWriting = false
			state.writeDataError = action.payload
		},
	},
})

export const {
	requestLoadData,
	receiveLoadData,
	loadDataError,
	requestWriteData,
	receiveWriteData,
	writeDataError,
} = dataSlice.actions

export default dataSlice.reducer
