*** Settings ***
Library    Browser
Library    OperatingSystem

*** Variables ***
${URL}     https://www.selenium.dev/selenium/web/web-form.html

*** Test Cases ***
Test WebForm Different Fields
    [Documentation]    Tests Selenium example forms different fields

    New Browser    chromium    headless=false
    New Context    viewport={'width': 1280, 'height': 720}
    New Page       ${URL}

    # 1. Dropdown (select)
    Select Options By    css=select[name="my-select"]    value    2

    # 2. Dropdown (datalist)
    Fill Text    css=input[name="my-datalist"]    San Francisco

    # 3. File input
    Create File    ${EXECDIR}/test_upload.txt    Tämä on väliaikainen testitiedosto.
    Promise To Upload File    ${EXECDIR}/test_upload.txt
    Click    css=input[name="my-file"]

    # 4. Checkbox
    Check Checkbox    id=my-check-2

    # 5. Radio buttons
    Click    id=my-radio-2

    # 6. Textarea and Date picker
    Fill Text    css=textarea[name="my-textarea"]    This is a text produced by an automatic test
    Fill Text    css=input[name="my-date"]           04/05/2026

    # 7. Form Submition
    Click    css=button[type="submit"]

    Get Text    id=message    ==    Received!

    [Teardown]    Clean Environment

*** Keywords ***
Clean Environment
    [Documentation]    Closes browser and deletes temporary file created during the test
    Close Browser
    Remove File    ${EXECDIR}/test_upload.txt
