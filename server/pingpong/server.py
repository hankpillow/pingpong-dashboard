"""
falcon server to host api for handling
pingpong image log
"""

import falcon
from pingpong.routes.index import Index
from pingpong.routes.middleware import (Meta,Compress)
from pingpong.api import (OpenFile, GrepFile)

api = falcon.API(middleware=[Meta(),Compress()])
api.add_route('/', Index())
api.add_route('/api/v1/back/{time_passed}', OpenFile('../log/pingpong.log'))
api.add_route('/api/v2/back/{time_passed}', GrepFile('../log/pingpong.log'))
