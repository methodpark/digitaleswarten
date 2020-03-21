python3 ./digitales_warten.py &
backend_pid=$!
backend_state=$?
if [ $backend_state -eq 0 ]
then
    pytest
else
    echo "[EE] Error starting backend!"
fi

kill $backend_pid
