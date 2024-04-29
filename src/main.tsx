import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App.tsx';
import { Registration } from './components/Registration/Registration.tsx';
import { Login } from './components/Login/Login.tsx';

import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>404 Not Found</div>,
	},
	{ path: '/registration', element: <Registration /> },
	{ path: '/login', element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
