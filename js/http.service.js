function request(uri){
	const url = !uri
		? "https://pokeapi.co/api/v2/berry/" 
		: uri;

	return new Promise((resolve, reject) => {
		fetch(url)
		.then(response => {
			resolve(response.json());
		})
		.catch(error => {
			alert('Error al intentar hacer peticion http');
			console.log(error);
		});
	});
}