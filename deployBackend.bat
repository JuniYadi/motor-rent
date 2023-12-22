@echo off

echo "Deploy Backend to Production"

cd backend
call .venv/Scripts/activate.bat
cd api
chalice deploy

pause