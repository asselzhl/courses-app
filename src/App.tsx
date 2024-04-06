import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';

import { mockedCoursesList, mockedAuthorsList } from './constants';

function App() {
	return (
		<div>
			<Header />
			<Courses mockedCoursesList={mockedCoursesList} mockedAuthorsList={mockedAuthorsList} />
		</div>
	);
}

export default App;
