import React, { useState } from 'react';

import { CourseCard } from './components/CourseCard/CourseCard';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { CourseInfo } from '../CourseInfo/CourseInfo';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';

import { convertDateToDotFormat } from '../../helpers/convertDateToDotFormat';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getAuthorsName } from '../../helpers/getAuthorsName';

const style = {
	coursesListWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col gap-y-8`,
	emptyCourseListWrapper: `bg-[#F7F7F7] h-[90vh] py-20 px-40 flex flex-col gap-y-8 justify-center items-center`,
	courseInfoWrapper: `bg-[#F7F7F7] h-screen py-20 px-40 flex flex-col gap-y-8`,
	createCourseWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col`,
	loginFormWrapper: `bg-[#F7F7F7] h-screen py-20 flex justify-center`,
};

interface MockedCoursesListInterface {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

interface MockedAuthorsListInterface {
	id: string;
	name: string;
}
interface CoursesProps {
	mockedCoursesList: MockedCoursesListInterface[];
	mockedAuthorsList: MockedAuthorsListInterface[];
	showLoginForm: boolean;
	setShowLoginForm;
}

type courseInfoType = MockedCoursesListInterface | null;

export const Courses = ({
	mockedCoursesList,
	mockedAuthorsList,
	showLoginForm,
	setShowLoginForm,
}: CoursesProps) => {
	const [showCourseInfo, setShowCourseInfo] = useState<boolean>(false);
	const [courseInfo, setCourseInfo] = useState<courseInfoType>(null);
	const [showCourseForm, setShowCourseForm] = useState<boolean>(false);

	const [showRegistrationForm, setShowRegistrationForm] =
		useState<boolean>(false);

	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] =
		useState<MockedAuthorsListInterface[]>(mockedAuthorsList);

	const [searchValue, setSearchValue] = useState('');

	const filteredCourses = coursesList.filter(
		(course) =>
			course.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			course.id.toLowerCase().includes(searchValue.toLowerCase().trim())
	);

	const handleSearchInputChange = (e) => {
		setSearchValue(e.target.value);
	};

	const toggleCourseInfo = () => {
		setShowCourseInfo(!showCourseInfo);
	};

	const toggleCourseForm = () => {
		setShowCourseForm(!showCourseForm);
	};

	const getCourseInfo = function (courseID: string) {
		const info = coursesList.find(
			(course: MockedCoursesListInterface) => course.id === courseID
		);
		setCourseInfo(info);
	};

	if (showCourseForm) {
		return (
			<div className={style.createCourseWrapper}>
				<CreateCourse
					authorsList={authorsList}
					toggleCourseForm={toggleCourseForm}
					setCoursesList={setCoursesList}
					setAuthorsList={setAuthorsList}
				/>
			</div>
		);
	}
	if (showRegistrationForm) {
		<div className={style.loginFormWrapper}>
			<Registration />
		</div>;
	}
	if (showLoginForm) {
		return (
			<div className={style.loginFormWrapper}>
				<Login
					setShowRegistrationForm={setShowRegistrationForm}
					setShowLoginForm={setShowLoginForm}
				/>
			</div>
		);
	}

	if (showCourseInfo && courseInfo) {
		return (
			<div className={style.courseInfoWrapper}>
				<CourseInfo
					courseName={courseInfo.title}
					description={courseInfo.description}
					id={courseInfo.id}
					duration={getCourseDuration(courseInfo.duration)}
					creationDate={convertDateToDotFormat(courseInfo.creationDate)}
					authors={getAuthorsName(courseInfo.authors, authorsList)}
					toggleCourseInfo={toggleCourseInfo}
				/>
			</div>
		);
	}

	if (
		coursesList.length &&
		!showCourseInfo &&
		!showCourseForm &&
		!showLoginForm
	) {
		return (
			<div className={style.coursesListWrapper}>
				<div className='flex justify-between'>
					<SearchBar
						searchValue={searchValue}
						handleSearchInputChange={handleSearchInputChange}
					/>
					<Button text='Add new course' onClick={toggleCourseForm} />
				</div>

				{filteredCourses.map((course: MockedCoursesListInterface) => {
					const authors = getAuthorsName(course.authors, authorsList);
					const creationDate = convertDateToDotFormat(course.creationDate);
					const duration = getCourseDuration(course.duration);

					return (
						<CourseCard
							key={course.id}
							id={course.id}
							courseName={course.title}
							duration={duration}
							creationDate={creationDate}
							description={course.description}
							authors={authors}
							toggleCourseInfo={toggleCourseInfo}
							getCourseInfo={getCourseInfo}
						/>
					);
				})}
			</div>
		);
	}

	if (!coursesList.length) {
		return (
			<div className={style.emptyCourseListWrapper}>
				<EmptyCourseList />
			</div>
		);
	}
};
