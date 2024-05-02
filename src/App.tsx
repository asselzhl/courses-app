import { mockedCoursesList, mockedAuthorsList } from './constants';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Registration } from './components/Registration/Registration.tsx';
import { Login } from './components/Login/Login.tsx';
import { Courses } from './components/Courses/Courses.tsx';
import { CreateCourse } from './components/CreateCourse/CreateCourse.tsx';
import { CourseInfo } from './components/CourseInfo/CourseInfo.tsx';
import { Layout } from './Layout';

interface AuthorsListItem {
	id: string;
	name: string;
}
interface CoursesListItem {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export function App() {
	const [authorsList, setAuthorsList] =
		useState<AuthorsListItem[]>(mockedAuthorsList);
	const [coursesList, setCoursesList] =
		useState<CoursesListItem[]>(mockedCoursesList);
	//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const routesConfig = [
		{
			path: '/',
			element: localStorage.getItem('userToken') ? (
				<Courses authorsList={authorsList} coursesList={coursesList} />
			) : (
				<Login />
			),
		},
		{ path: 'login', element: <Login /> },
		{ path: 'registration', element: <Registration /> },
		{
			path: 'courses',
			element: <Courses authorsList={authorsList} coursesList={coursesList} />,
		},
		{
			path: 'courses/add',
			element: (
				<CreateCourse
					authorsList={authorsList}
					setAuthorsList={setAuthorsList}
					setCoursesList={setCoursesList}
				/>
			),
		},
		{
			path: 'courses/:courseId',
			element: (
				<CourseInfo authorsList={authorsList} coursesList={coursesList} />
			),
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
