import { createSlice } from '@reduxjs/toolkit';

import { UserState } from '../types';
import { adminCredentials, stateStatus, userRoles } from '../constants';
import { handlePending, handleRejected } from '../reducersUtils';
import {
	authenticateUser,
	getCurrentUser,
	logUserOut,
} from '../../thunks/userThunk';

const initialState: UserState = {
	status: stateStatus.idle,
	error: null,
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: userRoles.user,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, handlePending)
			.addCase(authenticateUser.fulfilled, (state, action) => {
				const { user, result } = action.payload.data;
				const { email, name } = user;

				state.status = stateStatus.succeeded;
				state.isAuth = true;
				state.name = name;
				state.email = email;
				state.token = result;

				if (email === adminCredentials.email) {
					state.role = userRoles.admin;
				} else {
					state.role = userRoles.user;
				}
			})
			.addCase(authenticateUser.rejected, handleRejected)
			.addCase(logUserOut.fulfilled, (state) => {
				state.isAuth = false;
				state.name = '';
				state.email = '';
				state.token = '';
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.name = action.payload.data.result.name;
				state.email = action.payload.data.result.email;
				state.role = action.payload.data.result.role;
				state.isAuth = true;
			});
	},
});

export default userSlice.reducer;
