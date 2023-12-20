@echo off

start "Deploy Backend" cmd /k call deployBackend.bat
start "Deploy Frontend" cmd /k call deployFrontend.bat