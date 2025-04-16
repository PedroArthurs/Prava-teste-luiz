const { Builder, By, until } = require('selenium-webdriver'); 
const chrome = require('selenium-webdriver/chrome');
const { ServiceBuilder } = require('selenium-webdriver/chrome');

async function slowType(element, text, delay = 250) { 
    for (let char of text) {
        await element.sendKeys(char);
        await new Promise(resolve => setTimeout(resolve, delay)); //espera o tempo para digitar a letra
    }
}

async function runTest() { //função para executar o teste
    let driver;
    try {
        const options = new chrome.Options();
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.manage().window().maximize();
        await driver.get('https://www.hankeds.com.br/prova/login.html'); //abre o site

        // Wait for elements to be present
        const username = await driver.wait(until.elementLocated(By.id('username')), 10000);
        const password = await driver.findElement(By.id('password'));
        const button = await driver.findElement(By.xpath("//button[contains(text(), 'Entrar')]")); //encontra o elemento botao

        await slowType(username, 'admin'); //digita o usuario
        await new Promise(resolve => setTimeout(resolve, 1000));
        await slowType(password, 'admin123456'); //digita a senha
        await new Promise(resolve => setTimeout(resolve, 1000));

        await button.click();
        await new Promise(resolve => setTimeout(resolve, 4000));

        const currentUrl = await driver.getCurrentUrl(); //pega a url atual 
        if (currentUrl.includes('destino.html')) {
            console.log('Teste passou: redirecionado corretamente.'); //verifica se o redirecionamento ocorreu
        } else {
            console.log('Teste falhou: redirecionamento não ocorreu.'); //verifica se o redirecionamento não ocorreu
        }

        await new Promise(resolve => setTimeout(resolve, 5000));

    } catch (error) {
        console.error('Erro durante o teste:', error); //verifica se houve erro durante o teste
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

runTest(); 