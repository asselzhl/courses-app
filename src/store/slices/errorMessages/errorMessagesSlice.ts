import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	title: '',
	description: '',
	duration: '',
	authors: '',
};

export const errorMessagesSlice = createSlice({
	name: 'errorMessages',
	initialState,
	reducers: {
		setErrorMessages: (state, action) => {
			state = action.payload;
			return state;
		},
	},
});

export const errorMessagesReducer = errorMessagesSlice.reducer;
export const { setErrorMessages } = errorMessagesSlice.actions;
