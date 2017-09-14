"""the api that consumes pingpong vm db
"""

import logging
import re
import sys
import json

from datetime import datetime, timedelta
from pingpong.model import parse_line

import falcon

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
LOGGER = logging.getLogger('[api]')

DEFAULT_HOST = ""
DEFAULT_TIME = timedelta(minutes=15)

class BaseRoute(object):
    """base class to inject and do things on every request"""
    def __init__(self, db_path='./tests/db.sample'):
        """ setup module """
        self.db_path = db_path

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


class OpenFile(BaseRoute):
    """handle request on format 10m, 4d, 40s """

    @falcon.before(sanitize_data)
    def on_get(self, req, resp, start_date, host=''):
        """handle api for handling past time"""
        del req

        LOGGER.info('querying back: %s and filter by host:%s', str(start_date), host)
        data = []
        min_date = datetime.now() - start_date
        resp.body = str(min_date)

        try:
            with open(self.db_path, 'r') as database:

                for line in reversed(database.readlines()):
                    line = re.sub("\n$", "", line)
                    chunk = parse_line(line)

                    if not chunk:
                        continue

                    if chunk["date"] < min_date:
                        break

                    if chunk["url"] == host or host == '':
                        chunk["date"] = unicode(chunk["date"])
                        data.append(chunk)

        except Exception as error:
            LOGGER.error(error)
            raise falcon.HTTPError(falcon.HTTP_400, str(error))

        resp.set_header('Response-Items', len(data))
        resp.body = json.dumps(data)
