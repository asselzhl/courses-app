import React from "react";

import Button from "../../common/Button/Button";

const CourseInfo = () => {
  return (
    <div>
      <h2>JavaScript</h2>
      <div>
        <div>
          <h3>Description:</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div>
          <p>
            <span>ID:</span>231j3j-b34g5-b345m
          </p>
          <p>
            <span>Duration:</span>23:35 hours
          </p>
          <p>
            <span>Created:</span>01.01.2023
          </p>
          <p>
            <span>Authors:</span>Anna Sidorenko, Valentina Larina
          </p>
        </div>
      </div>
      <Button text="back" />
    </div>
  );
};

export default CourseInfo;
