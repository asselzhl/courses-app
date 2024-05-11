import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


import { createRequest } from '../../helpers/apiServices';
interface UserData {
	email: string;
	password: string;
}

export const authenticateUser = createAsyncThunk(
	'authenticateUser',
	async (userData: UserData) => {
		return createRequest('http://localhost:4000/login', 'POST', userData);
	}
);

type UserStatus = 'idle' | 'loading' | 'succeded' | 'failed';

type Error = null | string;

interface UserState {
	status: UserStatus;
	error: Error;
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
}

interface ServerResponse {
	successful: boolean;
	result: string;
	user?: {
		name: string;
		email: string;
	};
}

const initialState: UserState = {
	status: 'idle',
	error: null,
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logUserOut: (state) => {
			state.isAuth = false;
			state.name = '';
			state.email = '';
			state.token = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(authenticateUser.fulfilled, (state, action: PayloadAction<ServerResponse>) => {
				state.status = 'succeded';
				state.isAuth = true;
				state.name = action.payload.user.name;
				state.email = action.payload.user.email;
				state.token = action.payload.result;
			})
			.addCase(authenticateUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { logUserOut } = userSlice.actions;

export default userSlice.reducer;
