"""
static page
"""

class Index(object):
    """default view with dashboard script"""

    def on_get(self, request, response):
        """static page"""
        del request
        response.content_type = "text/html"
        response.body = '<html><body>foo</body></html>'
