@echo off
title Los Angeles Club - Iniciar com Docker
echo ========================================================
echo   LOS ANGELES CLUB ^& VIP LOUNGE - DOCKER STARTUP
echo ========================================================
echo.
echo Iniciando containers via Docker Compose...
docker compose up -d --build
echo.
echo Containers iniciados com sucesso!
echo.
echo - Site Publico:     http://localhost:3000
echo - Painel Admin CMS: http://localhost:3000/admin
echo.
echo Abrindo o navegador...
start http://localhost:3000
start http://localhost:3000/admin
echo.
pause
