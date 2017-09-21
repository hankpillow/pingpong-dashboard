"""
falcon server to host api for handling
pingpong image log
"""

import falcon
from pingpong.routes.index import Index
from pingpong.routes.back import Back
from pingpong.middleware import (Meta,Compress)

api = falcon.API(middleware=[Meta(),Compress()])
api.add_route('/', Index())
api.add_route('/api/{version}/back/{time_passed}', Back('../log/pingpong.log'))
