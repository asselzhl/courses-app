import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CourseCard } from "./components/CourseCard/CourseCard";
import { EmptyCourseList } from "../EmptyCourseList/EmptyCourseList";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Button } from "../../common/Button/Button";

import { convertDateToDotFormat } from "../../helpers/convertDateToDotFormat";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { getAuthorsName } from "../../helpers/getAuthorsName";

const style = {
  coursesListWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col gap-y-8`,
  emptyCourseListWrapper: `bg-[#F7F7F7] h-[90vh] py-20 px-40 flex flex-col gap-y-8 justify-center items-center`,
  
};

interface CoursesProps {
  authorsList?;
  coursesList?;
}

export const Courses = ({ authorsList, coursesList }: CoursesProps) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredCourses = coursesList.filter(
    (course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
      course.id.toLowerCase().includes(searchValue.toLowerCase().trim())
  );

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  //   const getCourseInfo = function (courseID: string) {
  //     const info = coursesList.find(
  //       (course: MockedCoursesListInterface) => course.id === courseID
  //     );
  //     setCourseInfo(info);
  //   };

  //   if (showCourseInfo && courseInfo) {
  //     return (
  //       <div className={style.courseInfoWrapper}>
  //         <CourseInfo
  //           courseName={courseInfo.title}
  //           description={courseInfo.description}
  //           id={courseInfo.id}
  //           duration={getCourseDuration(courseInfo.duration)}
  //           creationDate={convertDateToDotFormat(courseInfo.creationDate)}
  //           authors={getAuthorsName(courseInfo.authors, authorsList)}
  //         />
  //       </div>
  //     );
  //   }

  if (coursesList.length) {
    return (
      <>
        <div className={style.coursesListWrapper}>
          <div className="flex justify-between">
            <SearchBar
              searchValue={searchValue}
              handleSearchInputChange={handleSearchInputChange}
            />
            <Link to="/courses/add">
              <Button text="Add new course" onClick={() => {}} />
            </Link>
          </div>

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
        </div>
      </>
    );
  }

  return (
    <>
      <div className={style.emptyCourseListWrapper}>
        <EmptyCourseList />
      </div>
    </>
  );
};
