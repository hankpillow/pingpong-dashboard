"""
the api that consumes pingpong vm db
TODO: fix db path
"""

import logging
import re
import sys
import json

from datetime import datetime, timedelta
from model import parse_line

import falcon

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
LOGGER = logging.getLogger('[api]')

DB_PATH = '/var/DB'
DEFAULT_HOST = ""
DEFAULT_TIME = timedelta(minutes=15)

def get_timedelta(fmt, num):
    """return a timedelta fmt for given date"""

    if fmt == "m":
        return timedelta(minutes=num)

    if fmt == "h":
        return timedelta(hours=num)

    return timedelta(days=num)

def sanitize_data(req, response, resource, params):
    """normalize params before parsing db"""
    del response
    del resource

    date = "start_date"
    params["host"] = req.get_param("host", default=DEFAULT_HOST)

    result = re.match(r"(\d{1,})(m|h|d)", params[date])

    if not result:
        raise Exception("invalid time format")

    params[date] = get_timedelta(result.group(2), int(result.group(1)))


class PingPong(object):
    """handle different api request routes"""

    @falcon.before(sanitize_data)
    def on_get(self, req, resp, start_date, host = ''):
        """handle api for handling past time"""
        del req

        # Handles GET requests
        LOGGER.info('querying back: %s and filter by host:%s', str(start_date), host)

        data = []
        min_date = datetime.now() - start_date

        try:
            with open(DB_PATH, 'r') as database:

                for line in reversed(database.readlines()):
                    line = re.sub("\n$", "", line)
                    chunk = parse_line(line)

                    if not chunk:
                        continue

                    if chunk["date"] < min_date:
                        LOGGER.info('stop searching after when hit %s', line)
                        break

                    if chunk["url"] == host or host == '':
                        chunk["date"] = unicode(chunk["date"])
                        data.append(chunk)

        except Exception as error:
            LOGGER.error(error)
            raise falcon.HTTPError(falcon.HTTP_400, str(error))

        LOGGER.info('got %s results', len(data))
        resp.body = json.dumps(data)
