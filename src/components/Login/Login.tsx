import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { ErrorMessage } from '../../common/ErrorMessage/ErrorMessage';

import { validateInputValues } from '../../helpers/validateInputValues';
import { createRequest } from '../../helpers/apiServices';

const style = {
	blockTitle: `text-[#333E48] font-bold text-3xl mb-6`,
	formContainer: `border-[#CFCFCF] border bg-white rounded w-[600px] py-20 px-36 flex flex-col gap-y-8`,
	loginFormWrapper: `bg-[#F7F7F7] h-screen py-20 flex flex-col justify-center items-center`,
};

interface ErrorMessages {
	[key: string]: string;
}

export const Login = () => {
	const navigate = useNavigate();

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
			createRequest('http://localhost:4000/login', 'POST', userData).then(
				(response) => {
					if (response.successful) {
						localStorage.setItem('userToken', response.result);
						navigate('/courses');
						setUserData(initialUserData);
					}
				}
			);
		}
	};
	return (
		<div className={style.loginFormWrapper}>
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
					<Link className='font-bold' to='/registration'>
						Registration
					</Link>
				</div>
			</form>
		</div>
	);
};
