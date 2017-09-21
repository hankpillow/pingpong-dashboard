"""
falcon server to host api for handling
pingpong image log
"""

import falcon
from pingpong.routes.index import Index
from pingpong.routes.back import Back
from pingpong.middleware import (Meta, Compress)

api = falcon.API(middleware=[Meta(),Compress()])
api.add_route('/', Index())
api.add_route('/api/{version}/back/{time_passed}', Back('../log/pingpong.log'))

# api.add_route('/api/{version}/urls', Back('../log/pingpong.log'))
# api.add_route('/api/{version}/range/{start}/{end}', Back('../log/pingpong.log'))
# api.add_route('/api/{version}/tail/{qtd}', Back('../log/pingpong.log'))
# api.add_route('/api/{version}/head/{qtd}', Back('../log/pingpong.log'))
