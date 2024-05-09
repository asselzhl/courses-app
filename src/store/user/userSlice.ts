import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface UserData {
	email: string;
	password: string;
}

export const authenticateUser = createAsyncThunk(
	'authenticateUser',
	async (userData: UserData) => {
		const data = await fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		return data.json();
	}
);

const initialState = {
	status: 'idle',
	error: null,
	isAuth: false,
	name: '',
	email: '',
	token: '',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logUserOut: (state) => {
			state.isAuth = false;
			state.name = '';
			state.email = '';
			state.token = '';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(authenticateUser.fulfilled, (state, action) => {
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

export const { logUserOut } = userSlice.actions

export default userSlice.reducer;
