"""the api that consumes pingpong vm db
"""

import json
from pingpong.routes.base import BaseRoute
from pingpong.query import get_urls
import falcon

class Urls(BaseRoute):
    """
    Return a list of unique urls on data file.
    """

    def __init__(self, db_path=None, name="urls"):
        super(Urls, self).__init__(db_path, name)

    def on_get(self, req, resp):
        """
        handles api/urls
        """
        del req

        try:
            result = get_urls(self.db_path)
            resp.set_header('Query-Items', len(result))
            self.logger.info('found %s items', len(result))

            resp.body = json.dumps(result)

        except BaseException as info:
            resp.status = falcon.HTTP_500
            resp.body = info.message
