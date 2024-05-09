import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';

import { logUserOut } from '../../store/user/userSlice';

const style = {
	header: `container mx-auto flex justify-between items-center min-h-20`,
	content: `flex items-center gap-x-3 font-bold`,
};

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const userData = useSelector((state: RootState) => state.user);

	const handleButtonClick = () => {
		localStorage.clear();
		dispatch(logUserOut());
		navigate('/login');
	};

	return (
		<header className={style.header}>
			<Logo />
			<div className={style.content}>
				{localStorage.getItem('userToken') && <p>{userData.name}</p>}
				{localStorage.getItem('userToken') && (
					<Button text='logout' onClick={handleButtonClick} />
				)}
			</div>
		</header>
	);
};
