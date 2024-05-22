import React, { useEffect, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { FormFieldWithError } from "../../../common/FormFieldWithError/FormFieldWithError";
import { ErrorMessage } from "../../../common/ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthorsList,
  getAuthorsStateStatus,
  getCourseFormAuthorsName,
  getErrorMessages,
} from "../../../store/selectors";
import { AppDispatch } from "src/store";
import { addAuthor, fetchAuthors } from "../../../store/thunks";
import { stateStatus } from "../../../store/slices/constants";
import { formFieldsMap } from "../../../common/FormFieldWithError/formFieldsMap";
import { AuthorsList } from "../AuthorsList/AuthorsList";

const style = {
  sectionTitle: `text-[#333E48] font-bold text-3xl mb-6 capitalize`,
  section: `border-[#CFCFCF] border bg-white rounded py-10 px-20 flex flex-col gap-y-8 mb-8`,
  sectionSubtitle: `text-2xl font-bold`,
  errorMessage: `text-[#FF0000]`,
  durationContainer: `flex items-center gap-x-4`,
  availableAuthorsTitle: `text-2xl font-bold mb-6`,
  newCourseAuthorsContainer: `max-w-[20%] flex flex-col gap-y-4 text-center`,
  createCourseWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col`,
};

export const CourseAuthors = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authorsStatus = useSelector(getAuthorsStateStatus);
  const authorsList = useSelector(getAuthorsList);
  const courseFormAuthors = useSelector(getCourseFormAuthorsName);
  const errorMessages = useSelector(getErrorMessages);

  const [newAuthor, setNewAuthor] = useState<string>("");

  useEffect(() => {
    if (authorsStatus === stateStatus.idle) {
      dispatch(fetchAuthors());
    }
  }, [authorsStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const createNewAuthor = () => {
    dispatch(addAuthor({ name: newAuthor.trim() }));
    setNewAuthor("");
  };

  return (
    <div className="flex justify-between">
      <div>
        <h3 className={style.availableAuthorsTitle}>Authors</h3>

        <div className="flex items-end gap-x-4">
          <FormFieldWithError
            name={formFieldsMap.createAuthor.name}
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
          <Button text="create author" onClick={createNewAuthor} />
        </div>

        <div className="flex flex-col gap-y-4">
          <h4 className="font-bold">Authors List</h4>
          <AuthorsList authors={authorsList} />
        </div>
      </div>

      <div className={style.newCourseAuthorsContainer}>
        <h3 className="text-2xl font-bold">Course Authors</h3>
        <AuthorsList authors={courseFormAuthors} type="delete" />
        <ErrorMessage errorMessage={errorMessages.authors} />
      </div>
    </div>
  );
};
