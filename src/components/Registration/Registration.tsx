import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { ErrorMessage } from '../../common/ErrorMessage/ErrorMessage';

import { validateInputValues } from '../../helpers/validateInputValues';
import { createRequest } from '../../helpers/apiServices';
import { Header } from '../Header/Header';

const style = {
	blockTitle: `text-[#333E48] font-bold text-3xl mb-6`,
	formContainer: `border-[#CFCFCF] border bg-white rounded w-[600px] py-20 px-36 flex flex-col gap-y-8`,
	registrationFormWrapper: `bg-[#F7F7F7] h-screen py-20 flex flex-col justify-center items-center`,
};

interface ErrorMessages {
	[key: string]: string;
}

export const Registration = () => {
	const navigate = useNavigate();

	const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
	const initialNewUserData = {
		name: '',
		email: '',
		password: '',
	};

	const [newUserData, setNewUserData] = useState(initialNewUserData);

	const handleNewUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUserData((prevValues) => {
			return { ...prevValues, [e.target.name]: e.target.value };
		});
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const errors = validateInputValues(newUserData, {});

		setErrorMessages(errors);

		if (Object.keys(errors).length === 0) {
			createRequest('http://localhost:4000/register', 'POST', newUserData);
			setNewUserData(initialNewUserData);
			navigate('/login');
		}
	};
	return (
		<>
			<Header />
			<div className={style.registrationFormWrapper}>
				<h2 className={style.blockTitle}>Registration</h2>

				<form onSubmit={handleFormSubmit} className={style.formContainer}>
					<div>
						<Input
							type='text'
							labelText='Name'
							placeholderText='Name'
							value={newUserData.name}
							name='name'
							inputID='name'
							onChange={handleNewUserDataChange}
						/>
						<ErrorMessage errorMessages={errorMessages} inputField='name' />
					</div>
					<div>
						<Input
							type='email'
							labelText='Email'
							placeholderText='Email'
							value={newUserData.email}
							name='email'
							inputID='email'
							onChange={handleNewUserDataChange}
						/>
						<ErrorMessage errorMessages={errorMessages} inputField='email' />
					</div>
					<div>
						<Input
							type='password'
							labelText='Password'
							placeholderText='Password'
							value={newUserData.password}
							name='password'
							inputID='password'
							onChange={handleNewUserDataChange}
						/>
						<ErrorMessage errorMessages={errorMessages} inputField='password' />
					</div>
					<Button text='login' type='submit' onClick={() => {}} />
					<div className='text-center'>
						<span>If you have an account you may </span>
						<Link className='font-bold' to='/login'>
							Login
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};
