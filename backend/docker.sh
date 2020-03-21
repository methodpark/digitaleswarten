#!/bin/sh

docker build -t dwb .
#docker run --volume /$(pwd)/db:/db -p 5000:5000 dwb
docker run -p 5000:5000 dwb