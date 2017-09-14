"""
falcon server to host api for handling
pingpong image log
"""

import falcon
from pingpong.routes import (Index, RouteMiddleware)
from pingpong.api import OpenFile

api = falcon.API(middleware=RouteMiddleware())
api.add_route('/', Index())
api.add_route('/api/v1/back/{start_date}', OpenFile('../log/pingpong.log'))
