async function init() {
	try {
		const response = await fetch(
			"https://olympics.com/pt/paris-2024/medalhas"
		);
		const html = await response.text();
		const parser = new DOMParser();
		const document = parser.parseFromString(html, "text/html");
		let listaPaises = [];

		const jsonMedalhas = JSON.parse(
			document.querySelector("#__NEXT_DATA__").textContent
		);

		const dados =
			jsonMedalhas.props.pageProps.initialMedals.medalStandings
				.medalsTable;

		dados.forEach((element) => {
			console.log(element.longDescription);
			console.log(element.medalsNumber[0]);
			console.log(element.medalsNumber[0]["total"]);
		});

		console.log(dados[0].medalsNumber[0]);

		for (var i = 0; i < 10; i++) {
			listaPaises.push(dados[i].longDescription);
		}

		const data = [
			{
				x: listaPaises,
				y: [12, 19, 3, 5, 2, 3, 7],
				type: "bar",
				name: "Dataset 1",
				marker: {
					color: "#cd7f32", // Cor bronze claro
				},
			},
			{
				x: listaPaises,
				y: [2, 29, 5, 5, 3, 3, 9],
				type: "bar",
				name: "Dataset 2",
				marker: {
					color: "#C0C0C0", // Cor bronze claro
				},
			},
			{
				x: listaPaises,
				y: [2, 29, 5, 5, 3, 3, 9],
				type: "bar",
				name: "Dataset 2",
				marker: {
					color: "#ffd700", // Cor bronze claro
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
