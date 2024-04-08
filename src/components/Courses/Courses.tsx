import React from "react";

import CourseCard from "./components/CourseCard/CourseCard";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";

import { formatDate } from "../../helpers/formatCreationDate";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { getAuthorsName } from "../../helpers/getAuthorsName";

interface MockedCoursesListInterface {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

const Courses = ({ mockedCoursesList, mockedAuthorsList }) => {
  if (mockedCoursesList.length) {
    return (
      <div className="bg-[#F7F7F7] h-full py-20 px-40 flex flex-col gap-y-8">
        {mockedCoursesList.map((course: MockedCoursesListInterface) => {
          const authors = getAuthorsName(course.authors, mockedAuthorsList);
          const creationDate = formatDate(course.creationDate);
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
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="bg-[#F7F7F7] h-[90vh] py-20 px-40 flex flex-col gap-y-8 justify-center items-center">
        <EmptyCourseList />
      </div>
    );
  }
};

export default Courses;
