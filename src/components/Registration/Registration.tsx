import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FormFieldWithError } from '../../common/FormFieldWithError/FormFieldWithError';
import { Button } from '../../common/Button/Button';

import { validateInputValues } from '../../helpers/validateInputValues';
import { formFieldsMap } from '../../common/FormFieldWithError/formFieldsMap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { setErrorMessages } from '../../store/slices/errorMessages/errorMessagesSlice';
import { agent, endpoints } from '../../store/thunks/apiConfig/apiConfig';
import { routePaths } from '../../routePaths';
import { getErrorMessages } from '../../store/selectors';

const style = {
	blockTitle: `text-[#333E48] font-bold text-3xl mb-6`,
	formContainer: `border-[#CFCFCF] border bg-white rounded w-[600px] py-20 px-36 flex flex-col gap-y-8`,
	registrationFormWrapper: `bg-[#F7F7F7] h-screen py-20 flex flex-col justify-center items-center`,
};

export const Registration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const errorMessages = useSelector(getErrorMessages);
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

		dispatch(setErrorMessages(errors));

		if (Object.keys(errors).length === 0) {
			try {
				agent.post(endpoints.auth.register, newUserData);
				setNewUserData(initialNewUserData);
				navigate(routePaths.login);
			} catch (error) {
				console.error(error);
			}
		}
	};
	return (
		<>
			<div className={style.registrationFormWrapper}>
				<h2 className={style.blockTitle}>Registration</h2>

				<form onSubmit={handleFormSubmit} className={style.formContainer}>
					<FormFieldWithError
						value={newUserData.name}
						name={formFieldsMap.name.name}
						errorMessages={errorMessages}
						onChange={handleNewUserDataChange}
					/>

					<FormFieldWithError
						value={newUserData.email}
						name={formFieldsMap.email.name}
						errorMessages={errorMessages}
						onChange={handleNewUserDataChange}
					/>

					<FormFieldWithError
						value={newUserData.password}
						name={formFieldsMap.password.name}
						errorMessages={errorMessages}
						onChange={handleNewUserDataChange}
					/>

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
