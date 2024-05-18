import { createSlice } from '@reduxjs/toolkit';

import { authenticateUser, getCurrentUser, logUserOut } from '../thunks';

type UserStatus = 'idle' | 'loading' | 'succeded' | 'failed';

type Error = null | string;

interface UserState {
	status: UserStatus;
	error: Error;
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}



const initialState: UserState = {
	status: 'idle',
	error: null,
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const adminCredentials = {
	email: 'admin@email.com',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(authenticateUser.fulfilled, (state, action) => {
				state.role = 'user';
				state.status = 'succeded';
				state.isAuth = true;
				state.name = action.payload.data.user.name;
				state.email = action.payload.data.user.email;
				state.token = action.payload.data.result;

				if (action.payload.data.user.email === adminCredentials.email) {
					state.role = 'admin';
				}
			})
			.addCase(authenticateUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
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
