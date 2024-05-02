import { mockedCoursesList, mockedAuthorsList } from "./constants";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Registration } from "./components/Registration/Registration.tsx";
import { Login } from "./components/Login/Login.tsx";
import { Courses } from "./components/Courses/Courses.tsx";
import { CreateCourse } from "./components/CreateCourse/CreateCourse.tsx";
import { CourseInfo } from "./components/CourseInfo/CourseInfo.tsx";
import { Layout } from "./Layout";

import { v4 } from "uuid";

interface AuthorsListItem {
  id: string;
  name: string;
}
interface CoursesListItem {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export function App() {
  const [authorsList, setAuthorsList] =
    useState<AuthorsListItem[]>(mockedAuthorsList);
  const [coursesList, setCoursesList] =
    useState<CoursesListItem[]>(mockedCoursesList);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const routesConfig = [
    { path: "login", element: <Login setIsLoggedIn={setIsLoggedIn} /> },
    { path: "registration", element: <Registration /> },
    {
      path: "courses",
      element: <Courses authorsList={authorsList} coursesList={coursesList} />,
    },
    {
      path: "courses/add",
      element: (
        <CreateCourse
          authorsList={authorsList}
          setAuthorsList={setAuthorsList}
          setCoursesList={setCoursesList}
        />
      ),
    },
    {
      path: "courses/:courseId",
      element: (
        <CourseInfo authorsList={authorsList} coursesList={coursesList} />
      ),
    },
  ];

  return (
    <Routes>
      <Route path="/" element={<Layout isLoggedIn={isLoggedIn} />}>
        {routesConfig.map((route) => {
          return <Route key={v4()} path={route.path} element={route.element} />;
        })}
      </Route>
    </Routes>
  );
}
