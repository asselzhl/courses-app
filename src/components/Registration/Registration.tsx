import React, { useState } from 'react';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';

export const Registration = () => {
	const initialRegistrartionData = {
		username: '',
		email: '',
		password: '',
	};

	const [registrationData, setRegistrationData] = useState(
		initialRegistrartionData
	);

	const handleRegistrationDataChange = (e) => {
		setRegistrationData((prevValues) => {
			return { ...prevValues, [e.target.name]: e.target.value };
		});
	};

	const submitRegistrationData = () => {
		console.log(Object.values(registrationData));
	};

	return (
		<div>
			<h2 className='text-[#333E48] font-bold text-3xl mb-6'>Registration</h2>

			<form className='border-[#CFCFCF] border bg-white rounded w-[600px] py-20 px-36 flex flex-col gap-y-8'>
				<div>
					<Input
						type='text'
						labelText='Name'
						placeholderText='Name'
						name='username'
						inputID='username'
						onChange={handleRegistrationDataChange}
					/>
				</div>
				<div>
					<Input
						type='email'
						labelText='Email'
						placeholderText='Email'
						name='email'
						inputID='email'
						onChange={handleRegistrationDataChange}
					/>
				</div>
				<div>
					<Input
						type='password'
						labelText='Password'
						placeholderText='Password'
						name='password'
						inputID='password'
						onChange={handleRegistrationDataChange}
					/>
				</div>
				<Button text='login' onClick={submitRegistrationData} />
				<div className='text-center'>
					<span>If you have an account you may </span>
					<a href='google.com' className='font-bold'>
						Login
					</a>
				</div>
			</form>
		</div>
	);
};
