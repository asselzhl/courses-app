import React, { useState } from 'react';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { ErrorMessage } from '../../common/ErrorMessage/ErrorMessage';

import { validateInputValues } from '../../helpers/validateInputValues';

const style = {
	blockTitle: `text-[#333E48] font-bold text-3xl mb-6`,
	formContainer: `border-[#CFCFCF] border bg-white rounded w-[600px] py-20 px-36 flex flex-col gap-y-8`,
};

interface ErrorMessages {
	[key: string]: string;
}

export const Login = () => {
	const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
	const initialUserData = {
		email: '',
		password: '',
	};

	const [userData, setUserData] = useState(initialUserData);

	const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((prevValues) => {
			return { ...prevValues, [e.target.name]: e.target.value };
		});
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const errors = validateInputValues(userData, {});

		setErrorMessages(errors);

		if (Object.keys(errors).length === 0) {
			console.log('submitted');
			setUserData(initialUserData);
		}
	};
	return (
		<div>
			<h2 className={style.blockTitle}>Login</h2>

			<form className={style.formContainer} onSubmit={handleFormSubmit}>
				<div>
					<Input
						type='email'
						labelText='Email'
						name='email'
						placeholderText='Email'
						value={userData.email}
						inputID='email'
						onChange={handleUserDataChange}
					/>
					<ErrorMessage errorMessages={errorMessages} inputField='email' />
				</div>

				<div>
					<Input
						type='password'
						labelText='Password'
						name='password'
						placeholderText='Password'
						value={userData.password}
						inputID='password'
						onChange={handleUserDataChange}
					/>
					<ErrorMessage errorMessages={errorMessages} inputField='password' />
				</div>
				<Button text='login' type='submit' onClick={() => {}} />
				<div className='text-center'>
					<span>If you have an account you may </span>
					<a href='google.com' className='font-bold'>
						Registration
					</a>
				</div>
			</form>
		</div>
	);
};
