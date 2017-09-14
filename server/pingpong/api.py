"""the api that consumes pingpong vm db
"""

import logging
import sys
import re
import json
from datetime import datetime, timedelta

import falcon

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
LOGGER = logging.getLogger('[api]')

DEFAULT_HOST = ""
DEFAULT_TIME = timedelta(minutes=15)

def sanitize_param(req, resp, resource, params):
    """normalize params before parsing db"""
    del resp
    del resource

    date = "start_date"
    params["host"] = req.get_param("host", default=DEFAULT_HOST)

    result = re.match(r"(\d{1,})(m|h|d)", params[date])
    if not result:
        raise Exception("invalid time format")

    fmt = result.group(2)
    value = int(result.group(1))

    if fmt == "m":
        params[date] = timedelta(minutes=value)

    elif fmt == "h":
        params[date] = timedelta(hours=value)

    else:
        params[date] = timedelta(days=value)

    LOGGER.info('querying back %s', str(params[date]))

class BaseRoute(object):
    """base class to inject and do things on every request"""
    def __init__(self, db_path='./tests/db.sample'):
        """ setup module """
        self.db_path = db_path

class GrepFile(BaseRoute):
    """ grep content from db before evaluating filters """

    @falcon.before(sanitize_param)
    def on_get(self, req, resp, start_date, host):
        """handle request on format 10m, 4d, 40s """
        del req

        from pingpong.query import grep_data

        try:
            now = datetime.now()
            start = now - start_date
            resp.set_header('X-Start-Range', str(start))
            resp.set_header('X-End-Range', str(now))

            result = grep_data(start, now, self.db_path, host)
            resp.set_header('Response-Items', len(result))
            resp.body = json.dumps(result)

        except BaseException as info:
            resp.status = falcon.HTTP_500
            resp.body = info.message

class OpenFile(BaseRoute):
    """handle request on format 10m, 4d, 40s """

    @falcon.before(sanitize_param)
    def on_get(self, req, resp, start_date, host):
        """handle api for handling past time"""
        del req

        from pingpong.query import find_data

        try:
            now = datetime.now()
            start = now - start_date
            resp.set_header('X-Start-Range', str(start))
            resp.set_header('X-End-Range', str(now))

            result = find_data(start, now, self.db_path, host)
            resp.set_header('Response-Items', len(result))
            resp.body = json.dumps(result)

        except BaseException as info:
            resp.status = falcon.HTTP_500
            resp.body = info.message
