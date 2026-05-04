*** Settings ***
Library    Browser

*** Variables ***
${BASE_URL}    http://localhost:5174
${BROWSER}      chromium

*** Keywords ***
Open WebApp and Login
    [Arguments]    ${kayttaja}=TestiKayttaja    ${salasana}=Salasana123
    New Browser    ${BROWSER}    headless=false
    New Context    viewport={'width': 1280, 'height': 720}
    New Page       ${BASE_URL}/index.html

    Fill Text      id=login-username    ${kayttaja}
    Fill Secret    id=login-password    $salasana
    Click          id=login-button

    Wait For Elements State    id=entry_date    visible    timeout=5s
