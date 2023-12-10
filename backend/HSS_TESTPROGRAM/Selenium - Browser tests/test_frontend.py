from selenium import webdriver



def test_title():

    driver = webdriver.Chrome()

    driver.get("https://www.selenium.dev/selenium/web/web-form.html")


    title = driver.title

    assert title == "Web form"