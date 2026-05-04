# Health Diary

Fullstack web app for Web-sovelluskehitys course

## Functionality

- Safe registeration and login using JWT
- Add and delete diary entries, where you can save daily mood, sleep amount, weight and notes
- Calculate your BMI using the BMI-Calculator

## Installation

1. Clone the repo using `git clone https://github.com/EetuParvela/HealthDiary` and change into that folder using: `cd HealthDiary`
2. Run `npm install` only ONCE inside the root folder
3. Run the SQL script found in the root folder
4. Create your own .env file using the provided .env-example file
5. In the root folder run `npm run dev` to start the backend and frontend

## User Interface

### Login page

![Login page](https://github.com/user-attachments/assets/417c9d3a-fcc4-45cb-892a-bb441032150a)

### Diary page

![Diary page](https://github.com/user-attachments/assets/a29488ca-b895-4fc5-9daa-4aebd99bcee6)

### BMI Calculator page

![BMI Calculator page](https://github.com/user-attachments/assets/8b1709e0-db42-4493-bd83-74a7ac119e99)

## Project structure

```text
.
├── client/      # Frontend (HTML, CSS, JS)
│   ├── src/
│   ├── public/
│   └── package.json
├── server/      # Backend (Node.js, Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── package.json
├── package.json  # Root (Orchestration & Monorepo scripts)
├── .env          # Database & JWT secrets (not in Git)
└── README.md
```

## Database schema

![Database schema](https://github.com/user-attachments/assets/3ac052df-9037-4939-9269-963e8380f943)

## Testing

Installed tools for testing
| Tool | Version | | | |
|-------------------------|---------|---|---|---|
| Robot Framework | 7.4.2 | | | |
| robotframework-browser | 19.14.2 | | | |
| robotframework-requests | 0.9.7 | | | |
| robotframework-crypto | 0.4.2 | | | |
| robotframework-tidy | 4.18.0 | | | |

### Exercise 2 - Login test

Login test with Browser Library: [Login Test](/tests/login_test.robot)

### Exercise 3 - Web form test

Testing forms found in: [Forms](https://www.selenium.dev/selenium/web/web-form.html) \
Test here: [Form Tests](/tests/web_form_test.robot)

| Test            | Description                                                            |
|-----------------|------------------------------------------------------------------------|
| Dropdown Select | Selects the number 2 from the dropdown menu                            |
| Datalist        | Writes "San Francisco" to the datalist field                           |
| File Input      | Creates a temporary file and inserts it into the File Input field      |
| Checkbox        | Selects the "Default checkbox" box                                     |
| Radio Button    | Clicks the "Default radio" button                                      |
| Text Area       | Writes "This is a text produced by an automatic test" to the text area |
| Date Picker     | Writes "04/05/2026" to the date picker                                 |
| Form Submit     | Submits the form and receives the text "Received"                      |

### Exercise 4 - New Diary Entry test

Log in and create a new diary entry test: [New Diary Entry Test](/tests/new_diary_entry.robot)

Test logs in, creates a new diary entry and checks if the newly added entry is showing inside the entries list.

### Exercise 5 - Login test using .env variables

Same login test as in the 2nd exercise. Now the username and password have been moved inside the .env file found inside the server folder. \
Test: [Login using Env](/tests/login_using_env.robot)

### Exercise 6 - Login test using encrypted credentials

Same login test as in the 2nd exercise. Now the username and password have been encrypted using the CryptoLibrary. \
Test: [Login using Crypto](/tests/login_using_crypto.robot)

### Exercise 7 - Test logs and reports

The test log and report files can be found here: [Outputs](/outputs/)

### Exercise 8 - Github.io page

[Log File](outputs/log.html) \
[Report File](outputs/report.html)

### Exercise 9 - API tests

Testing the functionality of the API. First test verifies the user with JWT and the second test saves a diary entry to the database. \
Tests : [API Tests](/tests/api_tests.robot)

### Exercise 10 - Documentation

This README file

## AI Usage

Google Gemini 3 was used in making the CSS for the web pages.
