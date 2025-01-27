from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialiser le WebDriver
driver = webdriver.Chrome()  
driver.maximize_window()

try:
   
    driver.get("http://localhost:4200/create-patient")  

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "form"))
    )

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Adresse mail']"))
    ).send_keys("tesooossttt@example.com")
    
    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Mot de passe']"))
    ).send_keys("password123")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Numéro de sécurité sociale']"))
    ).send_keys("1234567898897999789")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Nom']"))
    ).send_keys("Dupont")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Prénom']"))
    ).send_keys("Jean")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Date de naissance']"))
    ).send_keys("1990-01-01")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Adresse']"))
    ).send_keys("123 Rue Exemple")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Téléphone']"))
    ).send_keys("0612345678")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Mutuelle']"))
    ).send_keys("Exemple Mutuelle")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Médecin traitant']"))
    ).send_keys("1")

    WebDriverWait(driver, 400).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Personne à contacter']"))
    ).send_keys("Exemple Personne à contacter")

   
    submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    submit_button.click()

   
    success_alert = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "swal2-popup"))
    )

    assert "Dossier patient créé avec succès." in success_alert.text
    print("Test réussi : Le formulaire a été soumis avec succès.")

except Exception as e:
    print(f"Test échoué : {e}")

finally:
  
    driver.quit()
