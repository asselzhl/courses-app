import React from "react";

import Button from "../../common/Button/Button";

const CourseInfo = () => {
  return (
    <div>
      <h2 className="text-[#333E48] font-bold text-3xl mb-6">JavaScript</h2>
      <div className="border-[#CFCFCF] border bg-white py-14 px-16 rounded mb-12">
        <h3 className="text-[#333E48] text-xl font-bold mb-6">Description:</h3>
        <div className="flex gap-x-8">
          <div className="w-[50%]">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="w-[1px] bg-[#CFCFCF]"></div>
          <div className="w-[50%] flex flex-col gap-y-4">
            <p className="flex justify-between">
              <span className="text-[#333E48] font-bold">ID: </span>
              <span>231j3j-b34g5-b345m</span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#333E48] font-bold">Duration: </span>
              <span>23:35 hours</span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#333E48] font-bold">Created: </span>
              <span>01.01.2023</span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#333E48] font-bold">Authors: </span>
              <span>Anna Sidorenko, Valentina Larina</span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Button text="back" />
      </div>
    </div>
  );
};

export default CourseInfo;
