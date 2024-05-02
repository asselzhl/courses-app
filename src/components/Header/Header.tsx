import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';

const style = {
	header: `container mx-auto flex justify-between items-center min-h-20`,
	content: `flex items-center gap-x-3 font-bold`,
};
/* eslint-disable */
export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className={style.header}>
      <Logo />
      <div className={style.content}>
        <p>{isLoggedIn && localStorage.getItem("username")}</p>
        {isLoggedIn && <Button text="logout" onClick={handleButtonClick} />}
      </div>
    </header>
  );
};
