import React from 'react';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';

const style = {
	container: `container mx-auto flex justify-between items-center min-h-20`
};

export const Header = () => {
	return (
		<header className={style.container}>
			<Logo />
			<Button text='login' onClick={() => {}} />
		</header>
	);
};
