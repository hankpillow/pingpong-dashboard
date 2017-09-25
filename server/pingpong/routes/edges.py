"""the api that consumes pingpong vm db
"""

import json
from pingpong.routes.base import BaseRoute
from pingpong.query import (get_head, get_tail)
import falcon

class Edges(BaseRoute):
    """
    Return the first N results from data file
    """

    def __init__(self, db_path=None, name="head"):
        super(Edges, self).__init__(db_path, name)
        self.process = None

    def on_get(self, req, resp, qtd=10):
        """
        handles api/head
        """
        del req

        if not self.process:
            raise Exception('controller must have a process to call')

        try:
            result = self.process(qtd, self.db_path)
            resp.set_header('Query-Items', len(result))
            self.logger.info('found %s items', len(result))

            resp.body = json.dumps(result)

        except BaseException as info:
            resp.status = falcon.HTTP_500
            resp.body = info.message


class Head(Edges):
    """
    Return the first N results from data file
    """
    def __init__(self, db_path=None, name="head"):
        super(Head, self).__init__(db_path, name)
        self.process = get_head

class Tail(Edges):
    """
    Return the last N results from data file
    """
    def __init__(self, db_path=None, name="head"):
        super(Tail, self).__init__(db_path, name)
        self.process = get_tail
