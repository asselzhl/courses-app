import { combineReducers, configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/courses/coursesSlice';
import authorsReducer from './slices/authors/authorsSlice';
import userReducer from './slices/user/userSlice';
import { filterReducer } from './slices/filter/filterSlice';
import { courseFormReducer } from './slices/courseForm/courseFormSlice';
import { errorMessagesReducer } from './slices/errorMessages/errorMessagesSlice';

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [
		'courses',
		'authors',
		'user',
		'filter',
		'courseForm',
		'errorMessages',
	],
};
const userPersistConfig = {
	key: 'user',
	storage,
	whitelist: ['token'],
};

const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	user: persistReducer(userPersistConfig, userReducer),
	filter: filterReducer,
	courseForm: courseFormReducer,
	errorMessages: errorMessagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'fetchCourses/fulfilled',
					'addCourse/fulfilled',
					'updateCourse/fulfilled',
					'addAuthor/fulfilled',
					'fetchAuthors/fulfilled',
					'authenticateUser/fulfilled',
					'getCurrentUser/rejected',
					'getCurrentUser/fulfilled',
					'logUserOut/fulfilled',
					'deleteCourse/fulfilled',
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
