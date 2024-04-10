import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { Registration } from './components/Registration/Registration';

import { mockedCoursesList, mockedAuthorsList } from './constants';

export function App() {
	return (
		<>
			<Header />
			<Courses
				mockedCoursesList={mockedCoursesList}
				mockedAuthorsList={mockedAuthorsList}
			/>
			{/* <Registration /> */}
		</>
	);
}
