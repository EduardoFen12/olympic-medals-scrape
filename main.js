
async function init() {
    try {
        const response = await fetch(
            "https://olympics.com/pt/paris-2024/medalhas"
        );
        const html                = await response.text();
        const parser              = new DOMParser();
        const document            = parser.parseFromString(html, "text/html");
        let   listaMedalhasPaises = {};


        console.log(document.querySelector('title').textContent);


        let medalhas = document.querySelectorAll('.emotion-srm-19huvme');
        let textoMedalhas = [];
        medalhas.forEach(medalha => {
            textoMedalhas.push(medalha.textContent);
        });
        console.log(textoMedalhas);


        let totalMedalhas = document.querySelectorAll('.emotion-srm-bnzwbp');
        let tetoTotalMedalhas = [];
        totalMedalhas.forEach(total => {
            tetoTotalMedalhas.push(total.textContent);
        });

        console.log(tetoTotalMedalhas);
        

        let paises = document.querySelectorAll('.emotion-srm-uu3d5n');
        let textoPaises = [];
        paises.forEach(pais => {
            textoPaises.push(pais.textContent);
        });

        console.log(textoPaises);


        while (textoMedalhas.length > 0 ) {
            let nomePais       = textoPaises.splice(0, 1)[0];
            let numeroMedalhas = textoMedalhas.splice(0, 3);
            let numeroTotalMedalhas = tetoTotalMedalhas.splice(0, 1)[0];
            listaMedalhasPaises[nomePais] = [];
            listaMedalhasPaises[nomePais]["ouro"] = numeroMedalhas[0];
            listaMedalhasPaises[nomePais]["prata"] = numeroMedalhas[1];
            listaMedalhasPaises[nomePais]["bronze"] = numeroMedalhas[2];
            listaMedalhasPaises[nomePais]["total"] = numeroTotalMedalhas;
        };

        console.log(listaMedalhasPaises);

        // Por algum motivo, só está carregando 19 paises !!!!!!!!!!!!!!!!!!!.
            
    } catch (error) {
        console.error("Error fetching the HMTL: ", error);
    }
}

init();