const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://olympics.com/pt/paris-2024/medalhas', { waitUntil: 'networkidle2' });

    // Espera o seletor que identifica a tabela carregar completamente
    await page.waitForSelector('.emotion-srm-1a32gjt');

    const dados = await page.evaluate(() => {
        let medalhas = [];
        let linhas = document.querySelectorAll('.emotion-srm-fm15hs'); // Ajuste o seletor conforme necessário
        
        linhas.forEach(linha => {
            let pais = linha.querySelector('.emotion-srm-uu3d5n').textContent;
            let total = linha.querySelector('.emotion-srm-bnzwbp').textContent;

            medalhas.push({ pais, total });
        });

        return medalhas;
    });

    console.log(dados);
    await browser.close();
})();
