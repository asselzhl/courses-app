import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';

import { getCurrentUser, logUserOut } from '../../store/user/userSlice';
import { getUserData } from '../../store/selectors';

const style = {
	header: `container mx-auto flex justify-between items-center min-h-20`,
	content: `flex items-center gap-x-3 font-bold`,
};

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const userData = useSelector(getUserData);

	const isLoggedIn = userData.isAuth;

	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);

	const handleButtonClick = () => {
		dispatch(logUserOut());
		localStorage.clear();

		navigate('/login');
	};

	return (
		<header className={style.header}>
			<Logo />
			<div className={style.content}>
				{isLoggedIn && <p>{userData.name}</p>}
				{isLoggedIn && <Button text='logout' onClick={handleButtonClick} />}
			</div>
		</header>
	);
};
