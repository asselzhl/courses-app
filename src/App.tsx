import { Routes, Route } from "react-router-dom";

import { Registration } from "./components/Registration/Registration.tsx";
import { Login } from "./components/Login/Login.tsx";
import { Courses } from "./components/Courses/Courses.tsx";
import { CreateCourse } from "./components/CourseForm/CourseForm.tsx";
import { CourseInfo } from "./components/CourseInfo/CourseInfo.tsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.tsx";
import { useSelector } from "react-redux";

import { getCurrentUserAuthStatus } from "./store/selectors.ts";
import { Header } from "./components/Header/Header.tsx";
import { routePaths } from "./routePaths.ts";

export function App() {
  const isLoggedIn = useSelector(getCurrentUserAuthStatus);
  const routesConfig = [
    {
      path: routePaths.index,
      element: isLoggedIn ? <Courses /> : <Login />,
    },
    { path: routePaths.login, element: <Login /> },
    { path: routePaths.registration, element: <Registration /> },
    {
      path: routePaths.courses,
      element: <Courses />,
    },
    {
      path: routePaths.addCourse,
      element: <PrivateRoute children={<CreateCourse />} />,
    },
    {
      path: routePaths.courseDetail,
      element: <CourseInfo />,
    },
    {
      path: routePaths.updateCourse,
      element: <PrivateRoute children={<CreateCourse />} />,
    },
  ];

  return (
    <>
      <Header />
      <Routes>
        {routesConfig.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </>
  );
}
