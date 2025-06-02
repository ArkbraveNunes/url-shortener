#!/usr/bin/env sh

cp .env.sample .env
code .env

docker compose up -d