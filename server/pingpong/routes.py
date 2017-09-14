"""
handle all routes and return the proper api
"""

import sys
import logging
from datetime import datetime

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

class Index(object):
    """default view with dashboard script"""

    def on_get(self, request, response):
        """static page"""
        del request
        response.content_type = "text/html"
        response.body = '<html><body>foo</body></html>'

class RouteMiddleware(object):
    """create lifecycle to inject data on every request"""

    def __init__(self):
        """init"""
        self.process_start = 0
        self.logger = logging.getLogger('[route]')

    def process_request(self, req, resp):
        """ inject data on resp to handle after """
        del req

        self.process_start = datetime.now()
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Response-Start', "{0}".format(self.process_start))

    def process_response(self, req, resp, resource, success):
        """ injects header with operation time """
        del resource, success

        duration = str((datetime.now() - self.process_start).microseconds / 1000)
        resp.set_header('Response-Time', "{0}".format(duration))
        self.logger.info('route %s took %s', req.path, duration)
