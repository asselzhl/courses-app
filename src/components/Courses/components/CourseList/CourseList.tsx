import React from "react";

import { convertDateToDotFormat } from "../../../../helpers/convertDateToDotFormat";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import { getAuthorsName } from "../../../../helpers/getAuthorsName";

import { CourseCard } from "../CourseCard/CourseCard";

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

interface CourseListProps {
  filteredCourses: CoursesListItem[];
  authorsList: AuthorsListItem[];
}

export const CourseList = ({
  filteredCourses,
  authorsList,
}: CourseListProps) => {
  return (
    <ul>
      {filteredCourses.map((course) => {
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
          />
        );
      })}
    </ul>
  );
};
