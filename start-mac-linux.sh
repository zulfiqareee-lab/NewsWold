#!/usr/bin/env bash
echo "==================================================="
echo "    NEWS WORLD - Starting Local Web Server...     "
echo "==================================================="
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing dependencies..."
    npm install
fi

if [ ! -f ".env" ] && [ -f ".env.example" ]; then
    cp .env.example .env
    echo "[INFO] Created .env file from .env.example"
fi

echo ""
echo "[SUCCESS] Starting server at http://localhost:3000 ..."
sleep 2

if which xdg-open > /dev/null; then
  xdg-open "http://localhost:3000" &
elif which open > /dev/null; then
  open "http://localhost:3000" &
fi

npm run dev
