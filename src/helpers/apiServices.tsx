export const createRequest = async (endpoint, method, data) => {
	const requestOptions = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (method === 'POST') {
		requestOptions.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(endpoint, requestOptions);
		const result = await response.json();

		return result;
	} catch (error) {
		console.error('Error occurred while making the request:', error);
	}
};
