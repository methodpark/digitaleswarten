#!/bin/sh
mkdir -p db
SQLITE_LOCATION=:memory: python3 ./digitales_warten.py &
backend_pid=$!
backend_state=$?
trap "kill $backend_pid" EXIT
if [ $backend_state -eq 0 ]
then
    BACKEND_HOSTNAME=localhost pytest
else
    echo "[EE] Error starting backend!"
fi

