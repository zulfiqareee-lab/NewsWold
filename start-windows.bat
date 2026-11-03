@echo off
title NEWS WORLD - Local Server Launcher
echo ===================================================
echo     NEWS WORLD - Starting Local Web Server...
echo ===================================================
echo.

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed on your computer!
    echo Please download and install Node.js from: https://nodejs.org/
    echo After installing, restart this file.
    echo.
    pause
    exit /b
)

if not exist node_modules (
    echo [INFO] Installing required dependencies... This may take a minute.
    call npm install
)

if not exist .env (
    if exist .env.example (
        copy .env.example .env >nul
        echo [INFO] Created .env file from .env.example.
    )
)

echo.
echo [SUCCESS] Starting NEWS WORLD Server on http://localhost:3000 ...
echo Opening your browser in 3 seconds...
start "" "http://localhost:3000"

npm run dev
pause
