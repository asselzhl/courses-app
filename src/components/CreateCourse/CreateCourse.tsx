import React, { useState } from "react";

import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { Textarea } from "../../common/Textarea/Textarea";
import { AuthorItem } from "./AuthorItem/AuthorItem";

const style = {
  sectionTitle: `text-[#333E48] font-bold text-3xl mb-6 capitalize`,
  section: `border-[#CFCFCF] border bg-white rounded py-10 px-20 flex flex-col gap-y-8 mb-8`,
};

export const CreateCourse = ({ mockedAuthorsList, toggleCourseForm }) => {
  const [initialAuthors, setInitialAuthors] = useState(mockedAuthorsList);
  const [addedAuthors, setAddedAuthors] = useState([]);

  const addAuthorName = (authorID: string) => {
    const author = initialAuthors.find(
      (initialAuthor) => initialAuthor.id === authorID
    );

    setAddedAuthors([...addedAuthors, author]);

    const deletedAuthors = initialAuthors.filter(
      (author) => author.id !== authorID
    );
    setInitialAuthors(deletedAuthors);
  };

  const deleteAuthorName = (authorID: string) => {
    const author = addedAuthors.find((author) => author.id === authorID);

    setInitialAuthors([...initialAuthors, author]);

    const deletedAuthors = addedAuthors.filter(
      (author) => author.id !== authorID
    );

    setAddedAuthors(deletedAuthors);
  };

  return (
    <div>
      <h2 className={style.sectionTitle}>Course edit/create page</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        action=""
      >
        <div className={style.section}>
          <h3 className="text-2xl font-bold">Main Info</h3>

          <div>
            <Input
              type="text"
              labelText="Title"
              placeholderText="Course Titlte"
              inputID="courseName"
              onChange={() => {}}
            />
          </div>

          <div>
            <Textarea
              labelText="Description"
              placeholderText="Description"
              textareaID="description"
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center gap-x-4">
            <Input
              type="number"
              labelText="Duration"
              placeholderText="Duration"
              inputID="duration"
              onChange={() => {}}
            />
            <p>
              <span>00:00 </span>
              <span>hours</span>
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Authors</h3>
              <div className="flex items-end gap-x-4">
                <Input
                  type="text"
                  labelText="Author Name"
                  placeholderText="Author Name"
                  inputID="author"
                  onChange={() => {}}
                />
                <Button
                  text="create author"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            </div>

            <div className="max-w-[20%] flex flex-col gap-y-4 text-center">
              <h3 className="text-2xl font-bold">Course Authors</h3>
              {addedAuthors.map((authorName) => {
                return (
                  <AuthorItem
                    key={authorName.id}
                    id={authorName.id}
                    authorName={authorName.name}
                    type="delete"
                    editAuthorList={deleteAuthorName}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <h4 className="font-bold">Authors List</h4>
            {initialAuthors.map((author) => {
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
            onClick={(e) => {
              e.preventDefault();
              toggleCourseForm();
            }}
          />
          <Button
            text="create course"
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </form>
    </div>
  );
};
