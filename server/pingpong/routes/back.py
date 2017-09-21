"""the api that consumes pingpong vm db
"""

import re
import json
from datetime import datetime, timedelta

import falcon
from pingpong.routes.base import BaseRoute
from pingpong.query import (grep_data, find_data)

def sanitize_param(req, resp, resource, params):
    """normalize params before parsing db"""
    del resp
    del resource

    params["url"] = req.get_param("url", default="")

    if params["time_passed"]:
        params["end"] = datetime.now()

        result = re.match(r"(\d{1,})(m|h|d)", params["time_passed"])
        if not result:
            raise Exception("invalid time format")

        fmt = result.group(2)
        value = int(result.group(1))

        if fmt == "m":
            params["start"] = params["end"] - timedelta(minutes=value)

        elif fmt == "h":
            params["start"] = params["end"] - timedelta(hours=value)

        else:
            params["start"] = params["end"] - timedelta(days=value)

class Back(BaseRoute):
    """
    Back route means that a query will be fired backing X time_passed from now

    ex:
    /api/{version}/back/10m - will return matches which date is <= 10 minutes from now
    /api/{version}/back/10h - will return matches which date is <= 10 hours from now
    /api/{version}/back/10d - will return matches which date is <= 10 days from now

    Keep in mind that the longer you back in time the bigger will be the result
    """

    def __init__(self, db_path=None, name="back"):
        super(Back, self).__init__(db_path, name)

    @falcon.before(sanitize_param)
    def on_get(self, req, resp, version, time_passed, start, end, url):
        """
        handles api/{versio}/back/{time_passed} routes

        :param version: must match r'^v(1|2)'
        :param time_passed: must match r'^\d+(m|h|d)'
        :param start: provided by decorator
        :param end: provided by decorator
        :param url: optional querystring param to filter results

        This project approaches querying data on static file in 2 differente ways:
            v1 - uses the native file open (ie: open(file, ...)) to run through the file.
                it's faster for queries smaller than 5d
                (TODO update this info based on benchmarks)

            v2 - uses a subprocess calling the_silver_searcher (bash ag "foo" file) to grep a smaller
                part of the file and than trim results that are out of date range.
                (TODO update this info based on benchmarks)
        """
        del req, time_passed

        if not re.match(r'^v(1|2)', version):
            resp.status = falcon.HTTP_500
            resp.body = "unexpected api version: {0}".format(version)
            return

        try:
            self.logger.info('start:%s => end:%s', start, end)
            if version == "v1":
                result = find_data(start, end, self.db_path, url)
            elif version == "v2":
                result = grep_data(start, end, self.db_path, url)

            resp.set_header('X-Start-Date', str(start))
            resp.set_header('X-End-Date', str(end))
            resp.set_header('Query-Items', len(result))
            self.logger.info('found %s items', len(result))

            resp.body = json.dumps(result)

        except BaseException as info:
            resp.status = falcon.HTTP_500
            resp.body = info.message
