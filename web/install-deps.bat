@echo off
setlocal
cd /d "%~dp0"
call bun install
exit /b %ERRORLEVEL%
