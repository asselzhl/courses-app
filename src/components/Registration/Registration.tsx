import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FormFieldWithError } from '../../common/FormFieldWithError/FormFieldWithError';
import { Button } from '../../common/Button/Button';

import { validateInputValues } from '../../helpers/validateInputValues';
import { formFieldsMap } from '../../common/FormFieldWithError/formFieldsMap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { setErrorMessages } from '../../store/slices/errorMessages/errorMessagesSlice';

const style = {
	blockTitle: `text-[#333E48] font-bold text-3xl mb-6`,
	formContainer: `border-[#CFCFCF] border bg-white rounded w-[600px] py-20 px-36 flex flex-col gap-y-8`,
	registrationFormWrapper: `bg-[#F7F7F7] h-screen py-20 flex flex-col justify-center items-center`,
};

const agent = axios.create();

export const Registration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

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
				agent.post('http://localhost:4000/register', newUserData);
				setNewUserData(initialNewUserData);
				navigate('/login');
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
						name={formFieldsMap.fullname.name}
						onChange={handleNewUserDataChange}
					/>

					<FormFieldWithError
						value={newUserData.email}
						name={formFieldsMap.email.name}
						onChange={handleNewUserDataChange}
					/>

					<FormFieldWithError
						value={newUserData.password}
						name={formFieldsMap.password.name}
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
