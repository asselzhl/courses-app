import React, { useState, useEffect } from "react";

import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { Textarea } from "../../common/Textarea/Textarea";
import { AuthorItem } from "./AuthorItem/AuthorItem";

import { v4 as v4 } from "uuid";

import { getCourseDuration } from "../../helpers/getCourseDuration";

const style = {
  sectionTitle: `text-[#333E48] font-bold text-3xl mb-6 capitalize`,
  section: `border-[#CFCFCF] border bg-white rounded py-10 px-20 flex flex-col gap-y-8 mb-8`,
  sectionSubtitle: `text-2xl font-bold`,
  errorMessage: `text-[#FF0000]`,
  durationContainer: `flex items-center gap-x-4`,
  availableAuthorsTitle: `text-2xl font-bold mb-6`,
  newCourseAuthorsContainer: `max-w-[20%] flex flex-col gap-y-4 text-center`,
};

interface ErrorMessages {
  title?: string;
  description?: string;
  duration?: string;
  authors?: string;
}

export const CreateCourse = ({
  authorsList,
  toggleCourseForm,
  setCoursesList,
  setAuthorsList,
}) => {
  const [addedAuthors, setAddedAuthors] = useState([]);
  const [renderedAuthors, setRenderedAuthors] = useState(authorsList);
  const [authorToCreate, setAuthorToCreate] = useState("");

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
  const [isValid, setIsValid] = useState(false);

  const initialCourseData = {
    id: v4(),
    title: "",
    description: "",
    creationDate: new Date().toLocaleString(),
    duration: null,
    authors: [],
  };

  const validateValues = (values) => {
    if (!values.title) {
      errorMessages.title = "Title is required";
    } 
    if (!values.description) {
      errorMessages.description = "Description is required";
    } 
    if (!values.duration) {
      errorMessages.duration = "Duration is required";
    } 
    if (!values.authors.length) {
      errorMessages.authors = "Authors list is required";
    } 
    return errorMessages;
  };

  const [newCourseData, setNewCourseData] = useState(initialCourseData);

  const handleNewCourseDataChange = (e) => {
    setNewCourseData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const addAuthorName = (authorID: string) => {
    const author = authorsList.find(
      (initialAuthor) => initialAuthor.id === authorID
    );

    setAddedAuthors([...addedAuthors, author]);

    setNewCourseData((prevValues) => {
      return {
        ...prevValues,
        authors: [...addedAuthors.map((author) => author.id), author.id],
      };
    });

    const deletedAuthors = renderedAuthors.filter(
      (author) => author.id !== authorID
    );
    setRenderedAuthors(deletedAuthors);
  };

  const deleteAuthorName = (authorID: string) => {
    const author = addedAuthors.find((author) => author.id === authorID);

    setRenderedAuthors([...renderedAuthors, author]);

    const deletedAuthors = addedAuthors.filter(
      (author) => author.id !== authorID
    );

    setAddedAuthors(deletedAuthors);
    setNewCourseData((prevValues) => {
      return {
        ...prevValues,
        authors: deletedAuthors.map((author) => author.id),
      };
    });
  };

  const createAuthor = () => {
    const createdAuthorInfo = { id: v4(), name: authorToCreate };
    setAuthorsList((prevValues) => [...prevValues, createdAuthorInfo]);
    setRenderedAuthors((prevValues) => [...prevValues, createdAuthorInfo]);
    setAuthorToCreate("");
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();

    setErrorMessages(validateValues(newCourseData));

    setIsValid(true);
    
    if (isValid && Object.keys(errorMessages).length === 0) {
      setCoursesList((prevValues) => [...prevValues, newCourseData]);
      toggleCourseForm();
    }
  };
  

  return (
    <>
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
            {errorMessages.title ? (
              <p className="text-[#FF0000]">{errorMessages.title}</p>
            ) : null}
          </div>

          <div>
            <Textarea
              labelText="Description"
              placeholderText="Description"
              name="description"
              textareaID="description"
              onChange={handleNewCourseDataChange}
            />
            {errorMessages.description ? (
              <p className="text-[#FF0000]">{errorMessages.description}</p>
            ) : null}
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
              {errorMessages.duration ? (
                <p className="text-[#FF0000]">{errorMessages.duration}</p>
              ) : null}
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
                  value={authorToCreate}
                  inputID="author"
                  onChange={(e) => setAuthorToCreate(e.target.value)}
                />
                <Button text="create author" onClick={createAuthor} />
              </div>
            </div>

            <div className={style.newCourseAuthorsContainer}>
              <h3 className="text-2xl font-bold">Course Authors</h3>
              {addedAuthors.length
                ? addedAuthors.map((authorName) => {
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
              {errorMessages.authors ? (
                <p className="text-[#FF0000]">{errorMessages.authors}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <h4 className="font-bold">Authors List</h4>
            {renderedAuthors.map((author) => {
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
          <Button
            text="cancel"
            onClick={() => {
              toggleCourseForm();
            }}
          />
          <Button type="submit" text="create course" onClick={() => {}} />
        </div>
      </form>
    </>
  );
};
