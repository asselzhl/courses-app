import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserData } from '../../store/selectors';

export const PrivateRoute = ({ children }) => {
	const userData = useSelector(getUserData);
	const userRole = userData.role;
	const isAdmin = userRole === 'admin';
	return isAdmin ? children : <Navigate to='/courses' />;
};
