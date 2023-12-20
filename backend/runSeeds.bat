@echo off

echo "Running Seeds Data"

call .venv/Scripts/activate.bat
cd api
call python seeds.py

pause