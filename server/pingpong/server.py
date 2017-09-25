"""
falcon server to host api for handling
pingpong image log
"""

import falcon
from pingpong.routes.index import Index
from pingpong.routes.back import Back
from pingpong.routes.urls import Urls
from pingpong.routes.edges import (Tail, Head)
from pingpong.middleware import (Meta, Compress)

DB = '../log/pingpong.log'

api = falcon.API(middleware=[Meta(),Compress()])
api.add_route('/', Index())

api.add_route('/api/v{version:int(min=1, max=2)}/back/{time_passed}', Back(DB))

api.add_route('/api/urls', Urls(DB))

api.add_route('/api/tail', Tail(DB))
api.add_route('/api/tail/{qtd:int}', Tail(DB))

api.add_route('/api/head', Head(DB))
api.add_route('/api/head/{qtd:int}', Head(DB))


# api.add_route('/api/{version}/range/{start}/{end}', Back(DB))
