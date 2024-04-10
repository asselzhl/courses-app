import React from "react";

import addButton from "./assets/add.svg";
import deleteButton from "./assets/delete.svg";

export const AuthorItem = ({ id, authorName, getAuthorInfo }) => {
  const handleButtonClick = () => {
    getAuthorInfo(id);
  };
  return (
    <div className="flex gap-x-3 items-center">
      <p className="min-w-[150px]">{authorName}</p>
      <button onClick={handleButtonClick}>
        <img src={addButton} alt="" />
      </button>
      <button onClick={handleButtonClick}>
        <img src={deleteButton} alt="" />
      </button>
    </div>
  );
};
