"""
handle all routes and return the proper api
"""

import sys
import logging
import gzip
import re
from datetime import datetime
from cStringIO import StringIO as IO

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

class Meta(object):
    """create lifecycle to inject data on every request"""

    def __init__(self):
        """init"""
        self.process_start = 0
        self.logger = logging.getLogger('[api:meta]')

    def process_request(self, req, resp):
        """ inject data on resp to handle after """

        self.logger.info("routing path: %s", req.path)
        self.process_start = datetime.now()
        resp.set_header('Access-Control-Allow-Origin', '*')

    def process_response(self, req, resp, resource, success):
        """ injects header with operation time """
        del resource, success, req

        if not re.search(r'^2\d\d', resp.status):
            self.logger.info('middleware ignored for status %s', resp.status)
            return

        duration = str((datetime.now() - self.process_start).microseconds / 1000)
        resp.set_header('Query-Time', str(duration))
        self.logger.info('query-time: %sms', duration)

class Compress(object):
    """gzip response body"""

    def __init__(self):
        """init"""
        self.logger = logging.getLogger('[gzip]')

    def process_response(self, req, resp, resource, success):
        """gzip content when requested"""
        del resource, success

        accept_encoding = req.get_header('Accept-Encoding')
        if not accept_encoding or 'gzip' not in accept_encoding:
            self.logger.info('no gzip for you')
            return

        start = datetime.now()
        resp.set_header('Content-Encoding', 'gzip')
        resp.set_header('Vary', 'Accept-Encoding')

        gzip_buffer = IO()
        gzip_file = gzip.GzipFile(mode='wb', fileobj=gzip_buffer)
        gzip_file.write(resp.body)
        gzip_file.close()

        resp.body = gzip_buffer.getvalue()
        size = len(resp.body)
        duration = (datetime.now() - start)
        resp.set_header('Content-Length', size)
        self.logger.info('compressed %s in %s', sizeof_fmt(size), duration)

# https://stackoverflow.com/questions/1094841/reusable-library-to-get-human-readable-version-of-file-size
def sizeof_fmt(num, suffix='B'):
    for unit in ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, 'Yi', suffix)
