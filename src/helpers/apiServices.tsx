interface RequestOptions {
	method: string;
	headers: {[key: string]: string};
	body?: string;
}

export const createRequest = async (endpoint: string, method: string, data: Object) => {
	const requestOptions: RequestOptions = {
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
