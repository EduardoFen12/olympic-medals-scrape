// 1. Função para converter o array em CSV
function convertArrayToCSV(array) {
	const headers = Object.keys(array[0]);
	const rows = array.map(obj => headers.map(header => obj[header]).join(","));
	return [headers.join(","), ...rows].join("\n");
}

// 2. Função para baixar o CSV
function downloadCSV(csvContent, filename = 'quadroDeMedalhasOlimpiadas2024.csv') {
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	link.style.visibility = 'hidden';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

async function init() {
	try {
		
		const response = await fetch(
			"https://olympics.com/pt/paris-2024/medalhas"
		);

		const html = await response.text();
		const parser = new DOMParser();
		const document = parser.parseFromString(html, "text/html");

		let listaPaises  = [];
		let listaOuros   = [];
		let listaPratas  = [];
		let listaBronzes = [];
		let listaTotais  = [];

		let listaCsv     = [];

		const jsonMedalhas = JSON.parse(
			document.querySelector("#__NEXT_DATA__").textContent
		);

		const dados =
			jsonMedalhas.props.pageProps.initialMedals.medalStandings
				.medalsTable;

		for (var i = 0; i < 30; i++) {
			listaPaises.push(dados[i].longDescription);
			dados[i].medalsNumber.forEach((element) => {
				if(element['type'] === 'Total') {
					listaOuros.push(element["gold"]);
					listaPratas.push(element["silver"]);
					listaBronzes.push(element["bronze"]);
					listaTotais.push(element["total"]);
				}
			});
		}

		const data = [
			{
				x: listaPaises,
				y: listaOuros,
				type: "bar",
				name: "Ouro",
				marker: {
					color: "#ffd700",
				},
			},
			{
				x: listaPaises,
				y: listaPratas,
				type: "bar",
				name: "Prata",
				marker: {
					color: "#C0C0C0",
				},
			},
			{
				x: listaPaises,
				y: listaBronzes,
				type: "bar",
				name: "Bronze",
				marker: {
					color: "#cd7f32",
				},
			},
		];

		const layout = {
			barmode: "stack",
		};

		Plotly.newPlot("myDiv", data, layout);


		for (var i = 0; i < listaPaises.length; i++) {
			listaCsv.push({pais: listaPaises[i], ouro: listaOuros[i], prata: listaPratas[i], bronze: listaBronzes[i], total: listaTotais[i]})
		}

		// 3. Convertendo o array para CSV e baixando
		const csvContent = convertArrayToCSV(listaCsv);
		downloadCSV(csvContent, "quadroDeMedalhasOlimpiadas2024.csv");


	} catch (error) {
		console.error("Error fetching the HMTL: ", error);
	}
}

init();
