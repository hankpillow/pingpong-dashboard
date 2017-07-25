# Pingpong Dashboard

	1. My *personal* "ping dom"

	2. The objective of this project is for study

	3. *It's not designed to be used on production*

## About

* The interface is made using Preact and Ramda for managing api data.

* The api and the server runs Falcon (python)

> Server's data comes from [pingpong](https://hub.docker.com/r/mrboots/pingpong/) log.

* The container is fully based on [jfloff/alpine-python:2.7-slim](https://github.com/jfloff/alpine-python) (<57mb)

----

## SETUP

### pingpong-dashboard

TBD

----

## RUN

1. Follow [pingpong](https://hub.docker.com/r/mrboots/pingpong/) project's instructions to start the machine

```
docker run -d \
   -v $(pwd)/URLS:/var/URLS \
   -v $(pwd)/log:/var/log:rw \
   mrboots/pingpong
```

2. Start the dashboard

```
docker run -d \
   -p 8000:8000 \
   -v ./server.py:/server.py \
   -v ./log/pingpong.log:/var/DB \
   mrboots/pingpong-dashboard
```

3. Browse to [localhost:8000](http://localhost:8000)
