import React, { useEffect } from "react";

import { Button } from "../../common/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

import { convertDateToDotFormat } from "../../helpers/convertDateToDotFormat";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { getAuthorsName } from "../../helpers/getAuthorsName";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "src/store";

import {
  getAuthorsList,
  getAuthorsStateStatus,
  getCoursesList,
  getCoursesStateStatus,
} from "../../store/selectors";
import { stateStatus } from "../../store/slices/constants";
import { routePaths } from "../../routePaths";
import { fetchCourses } from "../../store/thunks/coursesThunk";
import { fetchAuthors } from "../../store/thunks/authorsThunk";

const styles = {
  title: `text-[#333E48] font-bold text-3xl mb-6`,
  body: `border-[#CFCFCF] border bg-white py-14 px-16 rounded mb-12`,
  subtitle: `text-[#333E48] text-xl font-bold mb-6`,
  line: `w-[1px] bg-[#CFCFCF]`,
  info: `w-[50%] flex flex-col gap-y-4`,
  content: `flex gap-x-8`,
  infoText: `flex justify-between text-[#333E48]`,
  courseInfoWrapper: `bg-[#F7F7F7] h-screen py-20 px-40 flex flex-col gap-y-8`,
};

export const CourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const coursesStatus = useSelector(getCoursesStateStatus);
  const coursesList = useSelector(getCoursesList);

  const authorsStatus = useSelector(getAuthorsStateStatus);
  const authorsList = useSelector(getAuthorsList);

  useEffect(() => {
    if (coursesStatus === stateStatus.idle) {
      dispatch(fetchCourses());
    }
    if (authorsStatus === stateStatus.idle) {
      dispatch(fetchAuthors());
    }
  }, [coursesStatus, authorsStatus, dispatch]);

  const handleButtonClick = () => {
    navigate(routePaths.courses);
  };

  if (
    coursesStatus !== stateStatus.succeeded ||
    authorsStatus !== stateStatus.succeeded
  ) {
    return <h1>Loading...</h1>;
  }

  const course = coursesList.find((course) => course.id === courseId);

  if (!course) {
    return <p>Course not found.</p>;
  }

  const courseInfo = [
    { title: "ID:", value: course.id },
    { title: "Duration:", value: getCourseDuration(course.duration) },
    { title: "Created:", value: convertDateToDotFormat(course.creationDate) },
    { title: "Authors:", value: getAuthorsName(course.authors, authorsList) },
  ];

  return (
    <div className={styles.courseInfoWrapper}>
      <h2 className={styles.title}>{course.title}</h2>
      <div className={styles.body}>
        <h3 className={styles.subtitle}>Description:</h3>
        <div className={styles.content}>
          <div className="w-[50%]">
            <p>{course.description}</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.info}>
            {courseInfo.map((infoItem, index) => (
              <p className={styles.infoText} key={index}>
                <span className="font-bold">{infoItem.title}</span>
                <span>{infoItem.value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <Button text="back" onClick={handleButtonClick} />
    </div>
  );
};
