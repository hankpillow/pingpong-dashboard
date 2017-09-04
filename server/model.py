"""
this modules handles creating dict from samples
"""

from datetime import datetime

DATE_TEMPLATE = "%Y-%m-%d_%H:%M:%S"

def format_sample(arr):
    """format arr into curl sample"""
    if not arr:
        return None

    return {
        "type": "sample",
        "date": datetime.strptime(arr[0], DATE_TEMPLATE),
        "http_code": arr[1],
        "time_namelookup": arr[2],
        "time_connect": arr[3],
        "time_appconnect": arr[4],
        "time_pretransfer": arr[5],
        "time_redirect": arr[6],
        "time_starttransfer": arr[7],
        "time_total": arr[8],
        "num_redirects": arr[9],
        "url": str(arr[10])
    }

def format_error(arr):
    """format arr into failed curl"""
    if not arr:
        return None

    return {
        "type": "error",
        "date": datetime.strptime(arr[0], DATE_TEMPLATE),
        "exit_code": arr[1][1:],
        "url": arr[2],
        "user": arr[3] if len(arr) > 3 else ""
    }

def parse_line(info):
    """transform the given line into api object"""

    if not isinstance(info, basestring):
        return None

    if  len(info) == 0:
        return None

    chunks = info.split(' ')
    size = len(chunks)

    # success line
    if size == 11:
        return format_sample(chunks)

    # error line
    if size == 3 or size == 4:
        return format_error(chunks)

    return None
