import React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';

const style = {
	header: `container mx-auto flex justify-between items-center min-h-20`,
};

export const Header = () => {
	return (
		<header className={style.header}>
			<Logo />
			<Link to='/registration'>
				<Button text='login' onClick={() => {}} />
			</Link>
		</header>
	);
};
