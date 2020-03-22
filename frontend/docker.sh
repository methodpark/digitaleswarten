#!/bin/sh

docker build -t digitales-warten-frontend .
docker run -p 5001:5001 digitales-warten-frontend
