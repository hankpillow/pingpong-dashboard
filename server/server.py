from api import PingPong
import falcon

class View(object):
    """default view with dashboard script"""

    def on_get(self, request, response):
        """static page"""
        response.content_type = "text/html"
        response.body = '<html><body>foo</body></html>'

class CorsMiddleware(object):
    """this is exprimental and for studies pourposes, why not?"""

    def process_request(self, request, response):
        """inject controll access header"""
        response.set_header('Access-Control-Allow-Origin', '*')

API = falcon.API(middleware=[CorsMiddleware()])
API.add_route('/', View())
API.add_route('/api/{start_date}', PingPong())
