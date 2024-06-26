import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';

import {
	getCurrentUserAuthStatus,
	getCurrentUserName,
} from '../../store/selectors';
import { routePaths } from '../../routePaths';
import { getCurrentUser, logUserOut } from '../../store/thunks/userThunk';

const style = {
	header: `container mx-auto flex justify-between items-center min-h-20`,
	content: `flex items-center gap-x-3 font-bold`,
};

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const isUserLoggedIn = useSelector(getCurrentUserAuthStatus);
	const userName = useSelector(getCurrentUserName);

	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);

	const handleLogoutClick = () => {
		dispatch(logUserOut());

		navigate(routePaths.login);
	};

	return (
		<header className={style.header}>
			<Logo />
			<div className={style.content}>
				{isUserLoggedIn && <p>{userName}</p>}
				{isUserLoggedIn && <Button text='logout' onClick={handleLogoutClick} />}
			</div>
		</header>
	);
};
