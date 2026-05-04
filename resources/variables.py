import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="server/.env")

USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
