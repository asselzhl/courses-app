import { createSlice } from '@reduxjs/toolkit';

export const filterSLice = createSlice({
	name: 'filter',
	initialState: '',
	reducers: {
		setFilterValue: (state, action) => {
			return action.payload;
		},
	},
});

export const filterReducer = filterSLice.reducer;
export const { setFilterValue } = filterSLice.actions;
