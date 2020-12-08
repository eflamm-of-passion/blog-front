const restApiClient = {
	apiAddress : 'http://localhost:3000',
	articlesPath : '/articles'
};

restApiClient.getArticles = async () => {
	const url = restApiClient.apiAddress + restApiClient.articlesPath;
	const options = {
		method: 'GET',
		headers: {
			'Content-type': 'application/json'
		},
		mode: 'cors'
	};
	const response = await fetch(url, options);
	return await response.json();
};

export { restApiClient };