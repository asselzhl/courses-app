import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/coursesSlice';
import authorsReducer from './authors/authorsSlice';
import userReducer from './user/userSlice';
import { filterReducer } from './filter/filterSlice';

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		authors: authorsReducer,
		user: userReducer,
		filter: filterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
