@echo off
echo Installing packages individually...

pip install fastapi
if errorlevel 1 goto error

pip install uvicorn
if errorlevel 1 goto error

pip install pydantic
if errorlevel 1 goto error

pip install firebase-admin
if errorlevel 1 goto error

pip install python-jose[cryptography]
if errorlevel 1 goto error

pip install python-multipart
if errorlevel 1 goto error

pip install requests
if errorlevel 1 goto error

pip install python-dotenv
if errorlevel 1 goto error

pip install cors
if errorlevel 1 goto error

echo All packages installed successfully!
goto end

:error
echo Failed to install packages. Please check the error message above.
pause

:end
pause 