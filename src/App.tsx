import { Routes, Route } from 'react-router-dom';

import { Registration } from './components/Registration/Registration.tsx';
import { Login } from './components/Login/Login.tsx';
import { Courses } from './components/Courses/Courses.tsx';
import { CreateCourse } from './components/CreateCourse/CreateCourse.tsx';
import { CourseInfo } from './components/CourseInfo/CourseInfo.tsx';
import { Layout } from './Layout';

export function App() {
	const isUserTokenPresent = !!localStorage.getItem('userToken');

	const routesConfig = [
		{
			path: '/',
			element: isUserTokenPresent ? <Courses /> : <Login />,
		},
		{ path: 'login', element: <Login /> },
		{ path: 'registration', element: <Registration /> },
		{
			path: 'courses',
			element: <Courses />,
		},
		{
			path: 'courses/add',
			element: <CreateCourse />,
		},
		{
			path: 'courses/:courseId',
			element: <CourseInfo />,
		},
	];

	return (
		<Routes>
			<Route element={<Layout />}>
				{routesConfig.map((route) => {
					return (
						<Route key={route.path} path={route.path} element={route.element} />
					);
				})}
			</Route>
		</Routes>
	);
}
