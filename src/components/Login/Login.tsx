import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FormFieldWithError } from '../../common/FormFieldWithError/FormFieldWithError';
import { Button } from '../../common/Button/Button';

import { validateInputValues } from '../../helpers/validateInputValues';

import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';

import { routePaths } from '../../routePaths';
import { formFieldsMap } from '../../common/FormFieldWithError/formFieldsMap';
import { setErrorMessages } from '../../store/slices/errorMessages/errorMessagesSlice';
import { authenticateUser } from '../../store/thunks/userThunk';

const style = {
	blockTitle: `text-[#333E48] font-bold text-3xl mb-6`,
	formContainer: `border-[#CFCFCF] border bg-white rounded w-[600px] py-20 px-36 flex flex-col gap-y-8`,
	loginFormWrapper: `bg-[#F7F7F7] h-screen py-20 flex flex-col justify-center items-center`,
};

export const Login = () => {
	const navigate = useNavigate();

	const initialUserData = {
		email: '',
		password: '',
	};

	const [userData, setUserData] = useState(initialUserData);

	const dispatch = useDispatch<AppDispatch>();

	const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((prevValues) => {
			return { ...prevValues, [e.target.name]: e.target.value };
		});
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const errors = validateInputValues(userData, {});

		dispatch(setErrorMessages(errors));

		if (Object.keys(errors).length === 0) {
			dispatch(authenticateUser(userData));
			navigate(routePaths.courses);
		}
	};
	return (
		<>
			<div className={style.loginFormWrapper}>
				<h2 className={style.blockTitle}>Login</h2>

				<form className={style.formContainer} onSubmit={handleFormSubmit}>
					<FormFieldWithError
						name={formFieldsMap.email.name}
						value={userData.email}
						onChange={handleUserDataChange}
					/>

					<FormFieldWithError
						name={formFieldsMap.password.name}
						value={userData.password}
						onChange={handleUserDataChange}
					/>

					<Button text='login' type='submit' onClick={() => {}} />

					<div className='text-center'>
						<span>If you have an account you may </span>
						<Link className='font-bold' to={routePaths.registration}>
							Registration
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};
