import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';

import { mockedCoursesList, mockedAuthorsList } from './constants';
import { useState } from 'react';

export function App() {
	const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
	return (
		<>
			<Header setShowLoginForm={setShowLoginForm} />
			<Courses
				mockedCoursesList={mockedCoursesList}
				mockedAuthorsList={mockedAuthorsList}
				showLoginForm={showLoginForm}
				setShowLoginForm={setShowLoginForm}
			/>
		</>
	);
}
