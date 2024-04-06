import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';

import { mockedCoursesList } from './constants';

function App() {
	return (
		<div>
			<Header />
			<Courses mockedCoursesList={mockedCoursesList} />
		</div>
	);
}

export default App;
