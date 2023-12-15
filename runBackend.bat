@echo off

echo "Starting local server for backend using Virtual Environment"

cd backend
call .venv/Scripts/activate.bat
cd api
chalice local --autoreload