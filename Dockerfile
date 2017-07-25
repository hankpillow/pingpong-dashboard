FROM jfloff/alpine-python:2.7-slim

RUN /entrypoint.sh \
  -p falcon \
  -p gunicorn \
&& echo

EXPOSE 8000

# ADD ./api/pingpong.py .

CMD ["gunicorn", "-b", "0.0.0.0:8000", "server:pingpong"]
