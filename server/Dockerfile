FROM jfloff/alpine-python:2.7-slim

RUN mkdir /var/pingpong

RUN /entrypoint.sh \
  -p falcon \
  -p gunicorn \
&& echo

EXPOSE 8000

WORKDIR /var/pingpong

ADD ./pingpong/*.py /var/pingpong/
ADD ./pingpong/*.html /var/pingpong/

CMD ["gunicorn", "-b", "0.0.0.0:8000", "server:API"]
