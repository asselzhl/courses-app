import React from 'react';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';

const style = {
	header: `container mx-auto flex justify-between items-center min-h-20`,
};

export const Header = ({ setShowLoginForm }) => {
	return (
		<header className={style.header}>
			<Logo />
			<Button
				text='login'
				onClick={() => {
					setShowLoginForm(true);
				}}
			/>
		</header>
	);
};
