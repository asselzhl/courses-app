import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { App } from "./App.tsx";
import { Registration } from "./components/Registration/Registration.tsx";
import { Login } from "./components/Login/Login.tsx";
import { Courses } from "./components/Courses/Courses.tsx";
import { CreateCourse } from "./components/CreateCourse/CreateCourse.tsx";
import { CourseInfo } from "./components/CourseInfo/CourseInfo.tsx";

import { Layout } from "./Layout.tsx";

import "./index.css";

import { mockedCoursesList, mockedAuthorsList } from "./constants";

const CourseContext = React.createContext(null);

const Main = () => {
  const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
  const [coursesList, setCoursesList] = useState(mockedCoursesList);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<App />} />

        <Route path="login" element={<Login />} />

        <Route path="registration" element={<Registration />} />

        <Route
          path="courses"
          element={
            <Courses authorsList={authorsList} coursesList={coursesList} />
          }
        />

        <Route
          path="courses/add"
          element={
            <CreateCourse
              authorsList={authorsList}
              setCoursesList={setCoursesList}
              setAuthorsList={setAuthorsList}
            />
          }
        />
        <Route path="courses/:courseId" element={<CourseInfo authorsList={authorsList} coursesList={coursesList} />} />
      </Route>
    )
  );

  return (
    <CourseContext.Provider
      value={{ authorsList, coursesList, setCoursesList, setAuthorsList }}
    >
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </CourseContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
