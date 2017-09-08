"""
class desgined to do all the interface btw
files and api request
"""

from datetime import datetime, date, timedelta
import subprocess
from subprocess import CalledProcessError
from model import DATE_TEMPLATE

def date_pad(val):
    """ return lpad string from given value
    """
    return str(val).zfill(2)

def run_process(cmd, name="", shell=True):
    """ run subprocess from given cmd and return the output
    """
    print "running command: {0}".format(cmd.split(' '))

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
    except CalledProcessError as info:
        raise Exception("{0}:: cant run this command: {1}\n{2}".format(name, cmd, info.message))
    except BaseException as info:
        raise Exception("{0}:: command {1} return error: {2}".format(name, cmd, info))

def get_tail(qtd=10, path='./test/full.log'):
    """ return the last $qtd items from $path
    """

    if isinstance(qtd, bool) or not isinstance(qtd, int):
        raise Exception("get_tail:: qtd must be an int")

    if qtd < 1:
        return ''

    cmd = "tail -n{0} {1}".format(qtd, path)
    return run_process(cmd, "get_tail")

def get_head(qtd=10, path='./test/full.log'):
    """ return the first $qtd items from $path
    """

    if isinstance(qtd, bool) or not isinstance(qtd, int):
        raise Exception("get_head:: qtd must be an int")

    if qtd < 1:
        return ''

    cmd = "head -{0} {1}".format(qtd, path)
    return run_process(cmd, "get_head")

def get_hosts(path='./test/full.log'):
    """ return a list of uniq host name
    """

    cmd = "ag https?://.+ {0} -o --no-color".format(path)
    result = run_process(cmd, "get_hosts")
    try:
        return filter(len, sorted(set(result.split('\n'))))
    except Exception:
        raise Exception('get_hosts:: cant handle result')

def get_data(start, end=datetime.now(), path='./test/full.log'):
    """ return a list of results matching date range
    """

    try:
        selector = get_ag_selector(start, end)
    except Exception as info:
        raise Exception(
            "get_data:: ag_selector cant handle {0}->{1} range.\nStack:{3}"
            .format(start, end, info.message)
        )

    try:
        cmd = 'ag "{0}" {1} --no-numbers --no-color'.format(selector, path)
        result = run_process(cmd, "get_data")
    except Exception as info:
        raise Exception("get_data:: cant run command:{0}".format(info.message))


    def clamp_date(line):
        """check if line is within range
        """
        str_date = line.split(" ")[0]
        try:
            d = datetime.strptime(str_date, DATE_TEMPLATE)
            return True if d >= start and d <= end else False
        except Exception:
            return False
    try:
        result = filter(len, sorted(set(result.split('\n'))))
        result = filter(clamp_date, result)
        return result
    except Exception as info:
        raise Exception('get_data:: cant handle result.\nStack:{0}'.format(info.message))

def get_ag_selector(start, end=datetime.now()):
    """ create regex pattern to be used on ag commands
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

    # handling seconds - shop sec and round based on minutes
    if d_diff == 0:
        if s_diff < 60:
            d1 = "{0}_{1}:{2}".format(base_date_s, hour_s, min_s)
            d2 = "{0}_{1}:{2}".format(base_date_e, hour_e, min_e)
            return d1 if d1 == d2 else "{0}|{1}".format(d1, d2)

        # handling minutes - shop minutes and round based on hour
        if s_diff < 3600:
            d1 = "{0}_{1}".format(base_date_s, hour_s)
            d2 = "{0}_{1}".format(base_date_e, hour_e)
            return d1 if d1 == d2 else "{0}|{1}".format(d1, d2)

    if d_diff > 365:
        return "{0}|{1}".format(start.year, end.year)

    tmp = datetime(start.year, start.month, start.day)
    result = ["{0}-{1}".format(date_pad(start.year), date_pad(start.month))]
    while tmp < end:
        new_date = tmp + timedelta(days=1)
        if new_date.month != tmp.month:
            result.append("{0}-{1}".format(date_pad(new_date.year), date_pad(new_date.month)))
        tmp = tmp + timedelta(days=1)

    return "|".join(result)
