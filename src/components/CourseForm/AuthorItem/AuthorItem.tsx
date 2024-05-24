import React from "react";

import addButton from "./assets/add.svg";
import deleteButton from "./assets/delete.svg";
import { useDispatch } from "react-redux";
import {
  removeCourseFormAuthors,
  setCourseFormAuthors,
} from "../../../store/slices/courseForm/courseFormSlice";

type AuthorItemKeys = "add" | "delete";

const authorItemMap: Record<
  AuthorItemKeys,
  { src: string; editAuthorList: (id: string, dispatch) => void }
> = {
  add: {
    src: addButton,
    editAuthorList: (id, dispatch) => {
      dispatch(setCourseFormAuthors(id));
    },
  },
  delete: {
    src: deleteButton,
    editAuthorList: (id, dispatch) => {
      dispatch(removeCourseFormAuthors(id));
    },
  },
};

interface AuthorItemProps {
  id: string;
  authorName: string;
  type?: AuthorItemKeys;
}

export const AuthorItem = ({
  id,
  authorName,
  type = "add",
}: AuthorItemProps) => {
  const config = authorItemMap[type];
  const dispatch = useDispatch();

  const handleButtonClick = (e) => {
    e.preventDefault();
    config.editAuthorList(id, dispatch);
  };
  return (
    <li className="flex gap-x-3 items-center">
      <p className="min-w-[150px]">{authorName}</p>
      <button onClick={handleButtonClick}>
        <img src={config.src} alt="" />
      </button>
    </li>
  );
};
