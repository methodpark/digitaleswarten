#!/bin/sh

docker build -t dwb .
docker run -p 5000:5000 dwb
