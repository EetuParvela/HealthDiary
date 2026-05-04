*** Settings ***
Library    Browser
Library    CryptoLibrary  password=test  variable_decryption=True
Resource   ../resources/resources.robot

*** Variables ***
${BASE_URL}    http://localhost:5174

${CRYPTED_USERNAME}    crypt:rWzSngNLwhSrEIUVviohGovUknHnW8IAqd8BkdMe7hWyY0zfsPh+ucZRk+3eMOfxsXabGA==
${CRYPTED_PASSWORD}    crypt:JeMSTFDVn1hcRAwwkPHO3LxcOC6axtvqS5d0fAS7Zz+rrX69fmOAPLQopF/kkTBri5CZsA==

*** Test Cases ***
Login Using Crypto Test
    New Browser    ${BROWSER}    headless=false
    New Context    viewport={'width': 1280, 'height': 720}
    New Page       ${BASE_URL}/index.html

    Fill Text      id=login-username    ${CRYPTED_USERNAME}
    Fill Secret    id=login-password    $CRYPTED_PASSWORD
    Click          id=login-button

    Wait For Elements State    id=entry_date    visible    timeout=5s

    [Teardown]    Close Browser
