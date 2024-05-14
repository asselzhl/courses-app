import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";

import { convertDateToDotFormat } from "../../../../helpers/convertDateToDotFormat";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import { getAuthorsName } from "../../../../helpers/getAuthorsName";

import { fetchAuthors } from "../../../../store/authors/authorsSlice";

import { CourseCard } from "../CourseCard/CourseCard";

export const CourseList = () => {
  const authorsList = useSelector((state: RootState) => state.authors.data);
  const filteredCourses = useSelector(
    (state: RootState) => state.courses.filteredCourses
  );

  const authorsStatus = useSelector((state: RootState) => state.authors.status);
  const coursesStatus = useSelector((state: RootState) => state.courses.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (authorsStatus === "idle") {
      dispatch(fetchAuthors());
    }
  }, [authorsStatus, dispatch]);

  if (authorsStatus === "succeeded" && coursesStatus === "succeeded") {
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
  }
};
