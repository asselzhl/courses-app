import React from "react";

import Button from "../../../../common/Button/Button";

const CourseCard = ({ courseName, duration, creationDate, description, authors }) => {
  const durationInHours = `${Math.floor(duration / 60)}:${duration % 60}`;

  return (
    <div className="p-8 bg-[#FFFFFF] rounded border-l-8 border-[#333E48] shadow-lg shadow-slate-300">
      <h3 className="text-xl font-bold leading-8 mb-2.5">{courseName}</h3>
      <div className="flex gap-x-12">
        <div className="w-[60%]">
          <p>{description}</p>
        </div>

        <div className="w-[310px]">
          <div className="mb-8">
            <p className="truncate">
              <span className="font-bold">Authors: </span>{authors.join(', ')}
            </p>
            <p>
              <span className="font-bold">Duration: </span>
              {durationInHours} hours
            </p>
            <p>
              <span className="font-bold">Created: </span>
              {creationDate.replaceAll('/', '.')}
            </p>
          </div>
          <div>
            <Button text="show course" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
