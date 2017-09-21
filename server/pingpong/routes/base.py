"""
base route for the whole api
"""

import logging
import sys

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

class BaseRoute(object):
    """base class to inject and do things on every request"""
    def __init__(self, db_path='./tests/db.sample', name='baseroute'):
        """ setup module """
        self.db_path = db_path
        self.logger = logging.getLogger('[api/{0}]'.format(name))
