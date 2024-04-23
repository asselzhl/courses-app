import React from "react";

import { Button } from "../../../../common/Button/Button";

const style = {
  courseCardWrapper: `p-8 bg-[#FFFFFF] rounded border-l-8 border-[#333E48] shadow-lg shadow-slate-300`,
  courseName: `text-xl font-bold leading-8 mb-2.5`,
  courseDesc: `w-[60%]`,
};

interface CourseCardProps {
  id: string;
  courseName: string;
  duration: string;
  creationDate: string;
  description: string;
  authors: string;
  toggleCourseInfo: () => void;
  getCourseInfo: (id: string) => void;
}

export const CourseCard = ({
  id,
  courseName,
  duration,
  creationDate,
  description,
  authors,
  toggleCourseInfo,
  getCourseInfo,
}: CourseCardProps) => {
  function showCourse() {
    toggleCourseInfo();
    getCourseInfo(id);
  }

  const config = [
    { title: "Authors: ", value: authors },
    { title: "Duration: ", value: duration },
    { title: "Created: ", value: creationDate },
  ];

  return (
    <div className={style.courseCardWrapper}>
      <h3 className={style.courseName}>{courseName}</h3>
      <div className="flex gap-x-12">
        <div className={style.courseDesc}>
          <p>{description}</p>
        </div>

        <div className="w-[310px]">
          <div className="mb-8">
            {config.map((infoItem, index) => (
              <p className="truncate" key={index}>
                <span className="font-bold">{infoItem.title}</span>
                <span>{infoItem.value}</span>
              </p>
            ))}
          </div>
          <div>
            <Button text="show course" onClick={showCourse} />
          </div>
        </div>
      </div>
    </div>
  );
};
