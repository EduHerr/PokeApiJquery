$(document).ready(function(){
	read();
});

async function read(){
	const berries = await getBerries();
	setItemsTable(berries);
}

async function getBerries(){
	const response = await request();
	const berries = response.results;
	console.log(berries);
	return berries;
}

function setItemsTable(rows){
	const table = $('#tblPokeBerries tbody');

	$.each(rows, function(index, Berrie){
		table.append(`
			<tr>
				<td>
					${Berrie.name}
				</td>
				<td>
					<button id="${Berrie.url}" type="button" class="btn btn-sm btn-success btn-details">
						Details
					</button>
				</td>
			<tr>
		`);
	});
}

$('#tblPokeBerries tbody').on('click', '.btn-details', async function() {
	const buttonId = $(this).attr('id');
	const table = $('#tblDetails tbody');
 	const { flavors, ...berrie } = await request(buttonId);

 	//Limpiar tabla
	table.empty();

 	//Llenar tabla
 	table.append(`
 		<tr>
 			<th scope="row">Growth time</th>
 			<td>${ berrie.growth_time }</td>
 		</tr>
 		<tr>
 			<th scope="row">Natural gift power</th>
 			<td>${ berrie.natural_gift_power }</td>
 		</tr>
 		<tr>
 			<th scope="row">Natural gift type</th>
 			<td>${ berrie.natural_gift_type.name }</td>
 		</tr>
 		<tr>
 			<th scope="row">Size</th>
 			<td>${ berrie.size }</td>
 		</tr>
 		<tr>
 			<th scope="row">Smoothness</th>
 			<td>${ berrie.smoothness }</td>
 		</tr>
 		<tr>
 			<th scope="row">Soil dryness</th>
 			<td>${ berrie.soil_dryness }</td>
 		</tr>
 		<tr>
 			<th scope="row">Flavors</th>
 			<td>
 				<ul>
 					${
	 					flavors.map(function(Flavor){
	 						return `<li>${Flavor.flavor.name}</li>`;
	 					}).join('')
	 				}
 				</ul>
 			</td>
 		</tr>
 	`);

 	//Mostrar modal
 	const modalElement = $('#modalDetails');
 	const modal = new bootstrap.Modal(modalElement[0]);
 	modal.show();
});
