import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routePaths } from "../../../routePaths";
import { Button } from "../../../common/Button/Button";

export const ActionButtons = () => {
  const location = useLocation();

  return (
    <div className="flex gap-x-5 justify-end">
      <Link to={routePaths.courses}>
        <Button text="cancel" onClick={() => {}} />
      </Link>
      <Button
        type="submit"
        text={
          location.pathname === routePaths.addCourse
            ? "create course"
            : "update course"
        }
        onClick={() => {}}
      />
    </div>
  );
};
