interface RequestOptions {
	method: string;
	headers: { [key: string]: string };
	body?: string;
}

export const createRequest = async (
	endpoint: string,
	method: string,
	data?: object
) => {
	const userToken = localStorage.getItem('userToken');
	const requestOptions: RequestOptions = {
		method: method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: userToken,
		},
	};

	if (method === 'POST' || method === 'POST') {
		requestOptions.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(endpoint, requestOptions);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
