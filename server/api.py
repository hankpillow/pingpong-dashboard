"""
the api that consumes pingpong vm db
TODO: fix db path
"""

from datetime import datetime, timedelta

import logging
import re
import sys
import json
import falcon

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
LOGGER = logging.getLogger('[api]')

DB_PATH = '../log/pingpong.log'
DEFAULT_HOST = ""
DEFAULT_TIME = timedelta(minutes=15)
DATE_TEMPLATE = "%Y-%m-%d_%H:%M:%S"

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

def format_sample(arr):
    """format arr into curl sample"""
    if not arr:
        return None

    return {
        "type": "sample",
        "date": datetime.strptime(arr[0], DATE_TEMPLATE),
        "http_code": arr[1],
        "time_namelookup": arr[2],
        "time_connect": arr[3],
        "time_appconnect": arr[4],
        "time_pretransfer": arr[5],
        "time_redirect": arr[6],
        "time_starttransfer": arr[7],
        "time_total": arr[8],
        "num_redirects": arr[9],
        "url": str(arr[10])
    }

def format_error(arr):
    """format arr into failed curl"""
    if not arr:
        return None

    return {
        "type": "error",
        "date": datetime.strptime(arr[0], DATE_TEMPLATE),
        "exit_code": arr[1][1:],
        "url": arr[2],
        "user": arr[3] if len(arr) > 3 else ""
    }

def parse_line(info):
    """transform the given line into api object"""

    if len(info) == 0:
        return None

    chunks = info.split(' ')
    size = len(chunks)

    if size == 11:
        # success line
        return format_sample(chunks)

    if size == 3 or size == 4:
        # error line
        return format_error(chunks)

    LOGGER.warning(('unexpected line format. size:{0} line:>{1}<', size, info))
    return None

class PingPong(object):
    """handle different api request routes"""

    @falcon.before(sanitize_data)
    def on_get(self, req, resp, start_date, host):
        """handle api for handling past time"""
        del req

        # Handles GET requests
        LOGGER.info(('querying back {0} and filter by host:>{1}<', str(start_date), host))

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
                        LOGGER.info(('stop searching after when hit {0}', line))
                        break

                    if chunk["url"] == host or len(host) == 0:
                        chunk["date"] = unicode(chunk["date"])
                        data.append(chunk)

        except Exception as error:
            LOGGER.error(error)
            raise falcon.HTTPError(falcon.HTTP_400, str(error))

        LOGGER.info(('got {0} results', len(data)))
        resp.body = json.dumps(data)
