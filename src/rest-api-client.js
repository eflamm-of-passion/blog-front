const restApiClient = {
	apiAddress : 'http://localhost:3000',
};

restApiClient.articles = getEndpoints('articles');
restApiClient.resumes = getEndpoints('resumes');

// TODO add the other endpoints

function getEndpoints(type) {
	const endpoints = {};
	const options = {
		method: 'GET',
		headers: {
			'Content-type': 'application/json'
		},
		mode: 'cors'
	};

	endpoints.getAll = async () => {
		const url = restApiClient.apiAddress + '/' + type;
		const response = await fetch(url, options);
		return await response.json();
	};
	endpoints.getFirst = () => {
		return endpoints.getAll().then(data => data[0]);
	};
	endpoints.getOne = async (uuid) => {
		const url = restApiClient.apiAddress + '/' + type + '/' + uuid;
		const response = await fetch(url, options);
		return await response.json();
	};

	return endpoints;
}

export { restApiClient };