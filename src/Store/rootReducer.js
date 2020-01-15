import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './Slice/auth'
import userReducer from './Slice/user'
import dataReducer from './Slice/data'

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	data: dataReducer,
})
