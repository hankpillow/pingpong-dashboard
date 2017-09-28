"""
this modules handles creating dict from samples
"""

import hashlib
from datetime import datetime

DATE_TEMPLATE = "%Y-%m-%d_%H:%M:%S"

def create_hash(url, date):
    """create an id from given url and date"""
    hash = hashlib.sha1()
    hash.update("{0}::{1}".format(url, str(date)))
    return hash.hexdigest()


def parse_date(date):
    """ return date object following data template model
    """

    if not isinstance(date, basestring):
        raise Exception("parse_date:: expected basestring")

    try:
        return datetime.strptime(date, DATE_TEMPLATE)
    except ValueError:
        return Exception("parse_date:: {0} not mathing pattern {1}".format(date, DATE_TEMPLATE))

def format_sample(arr):
    """ format arr into sample curl object
    """

    if not isinstance(arr, list):
        raise Exception("format_sample:: not a list")

    if len(arr) != 11:
        raise Exception("format_sample:: expected size 11")

    url = str(arr[10])
    date = parse_date(arr[0])

    return {
        "id": create_hash(url, date),
        "type": "sample",
        "date": date,
        "http_code": arr[1],
        "time_namelookup": arr[2],
        "time_connect": arr[3],
        "time_appconnect": arr[4],
        "time_pretransfer": arr[5],
        "time_redirect": arr[6],
        "time_starttransfer": arr[7],
        "time_total": arr[8],
        "num_redirects": arr[9],
        "url": url
    }

def format_error(arr):
    """ format arr into failed curl object
    """

    if not isinstance(arr, list):
        raise Exception("format_sample:: not a list")

    if len(arr) < 3 or len(arr) > 4:
        raise Exception("format_error:: string size out of range")

    if arr[1][0] != '!':
        raise Exception("format_error:: expected format has ! as first char on column 2")

    date = parse_date(arr[0])
    url = str(arr[2])

    return {
        "id": create_hash(url, date),
        "type": "error",
        "date": date,
        "exit_code": arr[1][1:],
        "url": arr[2],
        "user": arr[3] if len(arr) > 3 else ""
    }

def parse_line(info):
    """ transform the given line into api's model
    """

    if not isinstance(info, basestring):
        raise Exception("format_sample:: not a list")

    size = len(info)
    if  size == 0:
        raise Exception("format_sample:: empty line")

    chunks = info.split(' ')
    size = len(chunks)

    # success line
    if size == 11:
        return format_sample(chunks)

    # error line
    if size == 3 or size == 4:
        return format_error(chunks)

    raise Exception("format_sample:: unexpected line format")
