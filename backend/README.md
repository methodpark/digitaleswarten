# Running in Docker

To start a connectable backend server in docker run
`./docker.sh`

To run integration tests:
`./run_docker_tests.sh`

# Running locally
Optionally in a virtual environment:
```
python -m venv .venv
source venv/bin/activate
```

To specify the database location run
`export SQLITE_LOCATION=<db_path>`

To start the backend locally run
```
pip install -r requirements.txt
python digitales_warten.py
```

To execute integration tests run
```
pip install -r requirements.txt
pip install -r ./tests/requirements.txt
./run_tests.sh
```
