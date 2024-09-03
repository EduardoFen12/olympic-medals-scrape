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
				}
			});
		
		}

		const data = [
			{
				x: listaPaises,
				y: listaOuros,
				type: "bar",
				name: "OUro",
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
	} catch (error) {
		console.error("Error fetching the HMTL: ", error);
	}
}

init();
