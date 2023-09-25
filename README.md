# SchoolHub
Application built using Angular, Laravel, Nodejs, with a Postgres database.
Everything should run using Docker Compose.

## How to run
Simply execute:
```
docker-compose up -d
```
for starting the application

## Fix "invalid group ID 'sail'" error
Probably just on linux
Add the following environment variables:
```
export APP_SERVICE=${APP_SERVICE:-"laravel.test"}
export DB_PORT=${DB_PORT:-3306}
export WWWUSER=${WWWUSER:-$UID}
export WWWGROUP=${WWWGROUP:-$(id -g)}
```

## REST API documentation here:
<a href="https://documenter.getpostman.com/view/26076037/2s9YCARAm6">https://documenter.getpostman.com/view/26076037/2s9YCARAm6</a>