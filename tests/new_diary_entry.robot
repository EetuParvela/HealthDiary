*** Settings ***
Library    Browser
Resource   ../resources/resources.robot

*** Variables ***
${BASE_URL}    http://localhost:5174
${USERNAME}    test
${PASSWORD}    test

*** Test Cases ***
Add Diary Entry
    [Documentation]    Logs in and creates a diary entry successfully

    New Browser    ${BROWSER}    headless=false
    New Context    viewport={'width': 1280, 'height': 720}
    New Page       ${BASE_URL}/index.html

    Fill Text      id=login-username    ${USERNAME}
    Fill Secret    id=login-password    $PASSWORD
    Click          id=login-button

    Wait For Elements State    id=entry_date    visible    timeout=5s

    Wait For Elements State    id=entry_date    visible    timeout=5s

    # Mock data for the entry
    Fill Text    id=entry_date    2026-05-04
    Fill Text    id=mood          8
    Fill Text    id=sleep_hours   8
    Fill Text    id=weight        75
    Fill Text    id=notes         Today I feel energized!

    Click    id=save-btn

    # Check if the entry list has entry containing the mock data
    Get Text    css=.entries-list    contains    Today I feel energized!

    [Teardown]    Close Browser
