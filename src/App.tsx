import { Routes, Route } from 'react-router-dom';

import { Registration } from './components/Registration/Registration.tsx';
import { Login } from './components/Login/Login.tsx';
import { Courses } from './components/Courses/Courses.tsx';
import { CreateCourse } from './components/CourseForm/CourseForm.tsx';
import { CourseInfo } from './components/CourseInfo/CourseInfo.tsx';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.tsx';
import { useSelector } from 'react-redux';

import { getUserData } from './store/selectors.ts';
import { Header } from './components/Header/Header.tsx';

export function App() {
	const userData = useSelector(getUserData);
	const isLoggedIn = userData.isAuth;
	const routesConfig = [
		{
			path: '/',
			element: isLoggedIn ? <Courses /> : <Login />,
		},
		{ path: 'login', element: <Login /> },
		{ path: 'registration', element: <Registration /> },
		{
			path: 'courses',
			element: <Courses />,
		},
		{
			path: 'courses/add',
			element: <PrivateRoute children={<CreateCourse />} />,
		},
		{
			path: 'courses/:courseId',
			element: <CourseInfo />,
		},
		{
			path: '/courses/update/:courseId',
			element: <PrivateRoute children={<CreateCourse />} />,
		},
	];

	return (
		<>
			<Header />
			<Routes>
				{routesConfig.map((route) => {
					return (
						<Route key={route.path} path={route.path} element={route.element} />
					);
				})}
			</Routes>
		</>
	);
}
