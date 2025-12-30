@echo off
echo Starting Fit India Services...

REM Start the main API
start cmd /k "cd api && python -m uvicorn main:app --reload --port 8000"

echo Services started!
echo Main API: http://localhost:8000
echo.
echo Press any key to exit...
pause 