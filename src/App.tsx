// import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { Login } from './components/Login/Login';

import { mockedCoursesList, mockedAuthorsList } from './constants';

export function App() {
	return (
		<>
			{localStorage.getItem('userToken') ? (
				<Courses
					mockedCoursesList={mockedCoursesList}
					mockedAuthorsList={mockedAuthorsList}
				/>
			) : (
				<Login />
			)}
		</>
	);
}
