import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';

const style = {
	header: `container mx-auto flex justify-between items-center min-h-20`,
	content: `flex items-center gap-x-3 font-bold`,
};

export const Header = () => {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<header className={style.header}>
			<Logo />
			<div className={style.content}>
				<p>{localStorage.getItem('username')}</p>
				<Link to='/login'>
					<Button
						text={localStorage.getItem('userToken') ? 'logout' : 'login'}
						onClick={handleButtonClick}
					/>
				</Link>
			</div>
		</header>
	);
};
