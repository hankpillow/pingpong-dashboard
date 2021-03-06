"""
class desgined to do all the interface btw
files and api request
"""

import subprocess
import re
import logging
from datetime import datetime, date, timedelta
from pingpong.model import (DATE_TEMPLATE, parse_line)

LOGGER = logging.getLogger('[query]')
DEFAULT_DB = 'tests/db.sample'

def to_str_date(chunk):
    """
    convert datetime to string
    """
    chunk['date'] = unicode(chunk["date"])
    return chunk

def date_pad(val):
    """
    return lpad string from given value
    """
    return str(val).zfill(2)

def run_process(cmd, name="", shell=True):
    """
    run subprocess from given cmd and return the output
    """

    LOGGER.info("(%s) %s", name, cmd)

    try:
        proc = subprocess.Popen(
            cmd if shell else cmd.split(" "),
            shell=shell,
            stderr=subprocess.PIPE, stdout=subprocess.PIPE
        )

        out, err = proc.communicate()

        if not err:
            return out

        raise Exception(err)

    except subprocess.CalledProcessError as info:
        raise Exception("{0}:: cant run this command: {1}\n{2}".format(name, cmd, info.message))

    except BaseException as info:
        raise Exception("{0}:: command {1} return error: {2}".format(name, cmd, info))

def get_edges(cmd, name="edge"):
    """
    used by tail/head to return the first/last N itens
    """
    try:
        result = run_process(cmd, name)
        result = filter(len, sorted(set(result.split('\n'))))
        result = map(parse_line, result)
        return map(to_str_date, result)

    except Exception:
        raise Exception('get_tail:: cant handle result')

def get_tail(qtd=10, path=DEFAULT_DB):
    """
    return the last $qtd items from $path
    """
    if qtd < 1:
        raise Exception("get_tail:: qtd must be an int > 0")

    cmd = "tail -n{0} {1}".format(qtd, path)
    return get_edges(cmd, "get_tail")

def get_head(qtd=10, path=DEFAULT_DB):
    """
    return the first $qtd items from $path
    """
    if qtd < 1:
        raise Exception("get_head:: qtd must be an int")

    cmd = "head -{0} {1}".format(qtd, path)
    return get_edges(cmd, "get_head")

def get_urls(path=DEFAULT_DB):
    """
    return a list of uniq host name
    """

    cmd = "ag https?://.+ {0} -o --no-color".format(path)
    result = run_process(cmd, "get_urls")
    try:
        return filter(len, sorted(set(result.split('\n'))))
    except Exception:
        raise Exception('get_urls:: cant handle result')

def grep_data(start, end=datetime.now(), path=DEFAULT_DB, url=""):
    """
    return a list of results matching date range
    """

    try:
        selector = get_ag_selector(start, end, url)
    except Exception as info:
        msg = "grep_data:: ag_selector cant handle start:{0} => end:{1}\nerror:{2}"
        raise Exception(msg.format(str(start), str(end), info.message))

    try:
        cmd = 'ag "{0}" {1} --no-numbers --no-color'.format(selector, path)
        result = run_process(cmd, "grep_data")
    except Exception as info:
        raise Exception("grep_data:: cant run command:{0}".format(info.message))

    def date_in_range(line):
        """
        check if line is within range
        """
        str_date = line.split(" ")[0]
        try:
            tmpdate = datetime.strptime(str_date, DATE_TEMPLATE)
            return True if tmpdate >= start and tmpdate <= end else False
        except ValueError:
            return False

    try:
        result = filter(len, sorted(set(result.split('\n'))))
        result = filter(date_in_range, result)
        return map(to_str_date, map(parse_line, result))

    except Exception as info:
        raise Exception('grep_data:: cant handle result.\nStack:{0}'.format(info.message))

def find_data(start, end=datetime.now(), path=DEFAULT_DB, url=""):
    """
    open the whole db and start matching date ranges
    """

    LOGGER.info('(open) file: %s', path)

    data = []
    with open(path, 'r') as database:

        for line in reversed(database.readlines()):
            line = re.sub("\n$", "", line)
            chunk = parse_line(line)

            if not chunk:
                continue

            """
            considering that log is sorted by date
            this could left date out of result!
            grep_data is recommended.
            """
            if chunk["date"] < start:
                break

            if chunk["date"] < end:
                if chunk["url"] == url or url == '':
                    chunk["date"] = unicode(chunk["date"])
                    data.append(chunk)

    return data

def get_ag_selector(start, end=datetime.now(), url=""):
    """
    create regex pattern to be used on ag commands
    """

    if not isinstance(start, date):
        raise Exception('get_ag_selector:: got invalid start date')

    if not isinstance(end, date):
        raise Exception('get_ag_selector:: got invalid end date')

    if start >= end:
        print "{start} -> {end}".format(start=start, end=end)
        raise Exception('get_ag_selector:: got invalid range')

    offset = end - start
    d_diff = offset.days
    s_diff = offset.seconds

    min_s = date_pad(start.minute)
    hour_s = date_pad(start.hour)
    day_s = date_pad(start.day)
    month_s = date_pad(start.month)

    hour_e = date_pad(end.hour)
    min_e = date_pad(end.minute)
    day_e = date_pad(end.day)
    month_e = date_pad(end.month)

    base_date_s = "{0}-{1}-{2}".format(start.year, month_s, day_s)
    base_date_e = "{0}-{1}-{2}".format(end.year, month_e, day_e)

    url_match = "" if url == "" else ".+{0}".format(url)

    # handling seconds - shop sec and round based on minutes
    if d_diff == 0:
        if s_diff < 60:
            date_1 = "{0}_{1}:{2}".format(base_date_s, hour_s, min_s)
            date_2 = "{0}_{1}:{2}".format(base_date_e, hour_e, min_e)
            if date_1 == date_2:
                return "^({0}){1}".format(date_1, url_match)
            return "^({0}|{1}){2}".format(date_1, date_2, url_match)

        # handling minutes - shop minutes and round based on hour
        if s_diff < 3600:
            date_1 = "{0}_{1}".format(base_date_s, hour_s)
            date_2 = "{0}_{1}".format(base_date_e, hour_e)
            if date_1 == date_2:
                return "^({0}){1}".format(date_1, url_match)
            return "^({0}|{1}){2}".format(date_1, date_2, url_match)

    if d_diff > 365:
        return "^({0}|{1}){2}".format(start.year, end.year, url_match)

    tmp = datetime(start.year, start.month, start.day)
    result = ["{0}-{1}".format(date_pad(start.year), date_pad(start.month))]
    while tmp < end:
        new_date = tmp + timedelta(days=1)
        if new_date.month != tmp.month:
            result.append("{0}-{1}".format(date_pad(new_date.year), date_pad(new_date.month)))
        tmp = tmp + timedelta(days=1)

    return "^({0}){1}".format("|".join(result), url_match)
