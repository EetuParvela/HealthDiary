*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
${BASE_URL}    http://localhost:8000

*** Test Cases ***
Verify Users with JWT
    Create Session    auth_session    ${BASE_URL}

    # Log in to get the token
    ${credentials}=    Create Dictionary    username=test    password=test
    ${login_res}=      POST On Session    auth_session    /api/users/login    json=${credentials}
    ${token}=          Set Variable       ${login_res.json()['token']}

    # Use the token in headers
    ${headers}=        Create Dictionary    Authorization=Bearer ${token}
    ${response}=       GET On Session     auth_session    /api/users    headers=${headers}

    Status Should Be    200    ${response}

Successfully Save A Diary Entry From Form Data
    Create Session    api_session    ${BASE_URL}

    ${login_data}=    Create Dictionary    username=test    password=test
    ${login_res}=     POST On Session    api_session    /api/users/login    json=${login_data}
    ${token}=         Set Variable       ${login_res.json()['token']}

    ${headers}=       Create Dictionary
    ...               Authorization=Bearer ${token}
    ...               Content-Type=application/json

    ${entry_data}=    Create Dictionary
    ...               entry_date=2026-05-05
    ...               mood=${8}
    ...               sleep_hours=${7}
    ...               weight=${75}
    ...               notes=Testing

    ${response}=      POST On Session    api_session    /api/entries    json=${entry_data}    headers=${headers}

    Status Should Be    201    ${response}

    ${resp_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${resp_json}    entryId
