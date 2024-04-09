import React from "react";

import { Button } from "../../common/Button/Button";

export const CourseInfo = ({
  courseName,
  description,
  id,
  duration,
  creationDate,
  authors,
  toggleCourseInfo,
}) => {
  return (
    <div>
      <h2 className="text-[#333E48] font-bold text-3xl mb-6">{courseName}</h2>
      <div className="border-[#CFCFCF] border bg-white py-14 px-16 rounded mb-12">
        <h3 className="text-[#333E48] text-xl font-bold mb-6">Description:</h3>
        <div className="flex gap-x-8">
          <div className="w-[50%]">
            <p>{description}</p>
          </div>
          <div className="w-[1px] bg-[#CFCFCF]"></div>
          <div className="w-[50%] flex flex-col gap-y-4">
            <p className="flex justify-between">
              <span className="text-[#333E48] font-bold">ID: </span>
              <span>{id}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#333E48] font-bold">Duration: </span>
              <span>{duration}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#333E48] font-bold">Created: </span>
              <span>{creationDate}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#333E48] font-bold">Authors: </span>
              <span>{authors}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Button text="back" onClick={toggleCourseInfo} />
      </div>
    </div>
  );
};
