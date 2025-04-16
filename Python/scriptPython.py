from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install())) #abre o navegador chrome
driver.maximize_window()

try:
    url = "https://www.hankeds.com.br/prova/login.html" #abre o site
    driver.get(url)

    time.sleep(2)

    def digitar_lento(elemento, texto, delay=0.25):
        for letra in texto:
            elemento.send_keys(letra)
            time.sleep(delay)

    usuario = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username"))) #encontra o elemento usuario
    senha = driver.find_element(By.ID, "password") #encontra o elemento senha
    botao = driver.find_element(By.XPATH, "//button[contains(text(), 'Entrar')]") #encontra o elemento botao

    digitar_lento(usuario, "admin") #digita o usuario
    time.sleep(1)
    digitar_lento(senha, "admin123456") #digita a senha
    time.sleep(1)

    botao.click()
    time.sleep(4)

    if "destino.html" in driver.current_url:
        print("Teste passou: redirecionado corretamente.") #verifica se o redirecionamento ocorreu
    else:
        print("Teste falhou: redirecionamento não ocorreu.") #verifica se o redirecionamento não ocorreu

    time.sleep(5)

except Exception as e:
    print("Erro durante o teste:", str(e)) #verifica se houve erro durante o teste

finally:
    driver.quit()