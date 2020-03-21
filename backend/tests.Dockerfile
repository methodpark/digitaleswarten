FROM python

RUN apt-get update -y

# We copy just the requirements.txt first to leverage Docker cache
COPY ./tests/requirements.txt /app/requirements.test.txt

WORKDIR /app

RUN pip install -r requirements.test.txt

COPY . /app

ENTRYPOINT [ "pytest" ]
