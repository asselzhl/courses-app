import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App.tsx';
import { Registration } from './components/Registration/Registration.tsx';
import { Login } from './components/Login/Login.tsx';
import { Courses } from './components/Courses/Courses.tsx';
// import { CreateCourse } from './components/CreateCourse/CreateCourse.tsx';

import './index.css';

import { mockedCoursesList, mockedAuthorsList } from './constants';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>404 Not Found</div>,
	},
	{ path: '/registration', element: <Registration /> },
	{ path: '/login', element: <Login /> },
	{
		path: '/courses',
		element: (
			<Courses
				mockedCoursesList={mockedCoursesList}
				mockedAuthorsList={mockedAuthorsList}
			/>
		),
	},
	// `{ path: "/courses/add", element: <CreateCourse /> },`
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
