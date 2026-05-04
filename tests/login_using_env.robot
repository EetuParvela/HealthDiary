*** Settings ***
Library    Browser
Resource   ../resources/resources.robot
Variables    ../resources/variables.py

*** Variables ***
${BASE_URL}    http://localhost:5174

*** Test Cases ***
Login Using Env Test
    New Browser    ${BROWSER}    headless=false
    New Context    viewport={'width': 1280, 'height': 720}
    New Page       ${BASE_URL}/index.html

    Fill Text      id=login-username    ${USERNAME}
    Fill Secret    id=login-password    $PASSWORD
    Click          id=login-button

    Wait For Elements State    id=entry_date    visible    timeout=5s

    [Teardown]    Close Browser
