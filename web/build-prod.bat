@echo off
setlocal
cd /d "%~dp0"
call bun run build
exit /b %ERRORLEVEL%
