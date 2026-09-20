@echo off
title Los Angeles Club - Servidor Local
echo ========================================================
echo   LOS ANGELES CLUB ^& VIP LOUNGE - LOCAL NODE SERVER
echo ========================================================
echo.
echo Verificando dependencias...
call npm install
echo.
echo Iniciando servidor...
start http://localhost:3000
start http://localhost:3000/admin
node server.js
pause
