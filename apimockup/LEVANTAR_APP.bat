@echo off
call mvnw clean package
docker compose up --build


