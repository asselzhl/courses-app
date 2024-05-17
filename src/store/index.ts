import { combineReducers, configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/coursesSlice';
import authorsReducer from './authors/authorsSlice';
import userReducer from './user/userSlice';
import { filterReducer } from './filter/filterSlice';
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

const persistConfig = {
	key: 'root',
	storage,
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
