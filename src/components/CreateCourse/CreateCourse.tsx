import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { Textarea } from "../../common/Textarea/Textarea";
import { ErrorMessage } from "../../common/ErrorMessage/ErrorMessage";
import { AuthorItem } from "./AuthorItem/AuthorItem";

import { v4 as v4 } from "uuid";

import { getCourseDuration } from "../../helpers/getCourseDuration";
import { validateInputValues } from "../../helpers/validateInputValues";

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

interface ErrorMessages {
  [key: string]: string;
}

interface CoursesListItem {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}
interface AuthorsListItem {
  id: string;
  name: string;
}

interface CreateCourseProps {
  authorsList: AuthorsListItem[];
  setCoursesList: (
    callback: (prevValues: CoursesListItem[]) => CoursesListItem[]
  ) => void;
  setAuthorsList: (
    callback: (prevValues: AuthorsListItem[]) => AuthorsListItem[]
  ) => void;
}

export const CreateCourse = ({
  authorsList,
  setCoursesList,
  setAuthorsList,
}: CreateCourseProps) => {
  const navigate = useNavigate();
  const [newCourseAuthors, setNewCourseAuthors] = useState<AuthorsListItem[]>(
    []
  );
  const [availableAuthors, setAvailableAuthors] =
    useState<AuthorsListItem[]>(authorsList);
  const [newAuthor, setNewAuthor] = useState<string>("");

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

  const initialNewCourseData: CoursesListItem = {
    id: v4(),
    title: "",
    description: "",
    creationDate: new Date().toLocaleString(),
    duration: null,
    authors: [],
  };
  const [newCourseData, setNewCourseData] =
    useState<CoursesListItem>(initialNewCourseData);

  const handleNewCourseDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCourseData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const addAuthorName = (authorID: string): void => {
    const author = authorsList.find((author) => author.id === authorID);

    setNewCourseAuthors([...newCourseAuthors, author]);

    setNewCourseData((prevValues) => {
      return {
        ...prevValues,
        authors: [...newCourseAuthors.map((author) => author.id), author.id],
      };
    });

    const removedAuthors = availableAuthors.filter(
      (author) => author.id !== authorID
    );
    setAvailableAuthors(removedAuthors);
  };

  const deleteAuthorName = (authorID: string): void => {
    const author = newCourseAuthors.find((author) => author.id === authorID);

    setAvailableAuthors([...availableAuthors, author]);

    const removedAuthors = newCourseAuthors.filter(
      (author) => author.id !== authorID
    );

    setNewCourseAuthors(removedAuthors);
    setNewCourseData((prevValues) => {
      return {
        ...prevValues,
        authors: removedAuthors.map((author) => author.id),
      };
    });
  };

  const createNewAuthor = (): void => {
    const createdAuthorInfo = { id: v4(), name: newAuthor };
    setAuthorsList((prevValues) => [...prevValues, createdAuthorInfo]);
    setAvailableAuthors((prevValues) => [...prevValues, createdAuthorInfo]);
    setNewAuthor("");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateInputValues(newCourseData, {});

    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      setCoursesList((prevValues) => [...prevValues, newCourseData]);
      navigate(-1);
    }
  };

  return (
    <div className={style.createCourseWrapper}>
      <h2 className={style.sectionTitle}>Course edit/create page</h2>

      <form onSubmit={handleFormSubmit} action="">
        <div className={style.section}>
          <h3 className={style.sectionSubtitle}>Main Info</h3>

          <div>
            <Input
              type="text"
              labelText="Title"
              placeholderText="Course Titlte"
              name="title"
              value={newCourseData.title}
              inputID="courseName"
              onChange={handleNewCourseDataChange}
            />
            <ErrorMessage errorMessages={errorMessages} inputField="title" />
          </div>

          <div>
            <Textarea
              labelText="Description"
              placeholderText="Description"
              name="description"
              textareaID="description"
              onChange={handleNewCourseDataChange}
            />
            <ErrorMessage
              errorMessages={errorMessages}
              inputField="description"
            />
          </div>

          <div className={style.durationContainer}>
            <div>
              <Input
                type="number"
                labelText="Duration"
                placeholderText="Duration"
                name="duration"
                value={newCourseData.duration}
                inputID="duration"
                onChange={handleNewCourseDataChange}
              />
              <ErrorMessage
                errorMessages={errorMessages}
                inputField="duration"
              />
            </div>
            <p>
              {newCourseData.duration
                ? getCourseDuration(newCourseData.duration)
                : "00:00 hours"}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <h3 className={style.availableAuthorsTitle}>Authors</h3>
              <div className="flex items-end gap-x-4">
                <Input
                  type="text"
                  labelText="Author Name"
                  placeholderText="Author Name"
                  name="author"
                  value={newAuthor}
                  inputID="author"
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
                <Button text="create author" onClick={createNewAuthor} />
              </div>
            </div>

            <div className={style.newCourseAuthorsContainer}>
              <h3 className="text-2xl font-bold">Course Authors</h3>
              {newCourseAuthors.length
                ? newCourseAuthors.map((authorName) => {
                    return (
                      <AuthorItem
                        key={authorName.id}
                        id={authorName.id}
                        authorName={authorName.name}
                        type="delete"
                        editAuthorList={deleteAuthorName}
                      />
                    );
                  })
                : "Author list is empty"}
              <ErrorMessage
                errorMessages={errorMessages}
                inputField="authors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <h4 className="font-bold">Authors List</h4>
            {availableAuthors.map((author) => {
              return (
                <AuthorItem
                  key={author.id}
                  id={author.id}
                  authorName={author.name}
                  editAuthorList={addAuthorName}
                />
              );
            })}
          </div>
        </div>

        <div className="flex gap-x-5 justify-end">
          <Link to="/courses">
            <Button text="cancel" onClick={() => {}} />
          </Link>
          <Button type="submit" text="create course" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};
