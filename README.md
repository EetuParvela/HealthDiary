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
  5. It the root folder run `npm run dev` to start the backend and frontend

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

## AI Usage
Google Gemini 3 was used in making the CSS for the web pages.

