"""
test query module
"""

from datetime import datetime, timedelta
from pytest import raises

def test_query_tail():
    """ test for tail methods
    """
    from pingpong.query import get_tail

    with raises(Exception):
        get_tail("100")
        get_tail(-100)
        get_tail(True)
        get_tail([True])
        get_tail(0)

    assert len(get_tail(1)) == 1
    assert len(get_tail(5)) == 5

def test_query_head():
    """ test for tail methods
    """
    from pingpong.query import get_head

    with raises(Exception):
        get_head("100")
        get_head(-100)
        get_head(True)
        get_head([True])
        get_head(0)

    assert len(get_head(1)) == 1
    assert len(get_head(5)) == 5

def test_query_hosts():
    """ test for sorting hosts
    """
    from pingpong.query import get_urls

    expected = list([
        "http://www.test.com.br/bar/",
        "http://www.test.com.br/foo/"
    ])
    hosts = get_urls()
    assert isinstance(hosts, list)
    assert len(hosts) == 2
    assert hosts == expected

def test_ag_selectedor():
    """ test query construction based on regex via ag
    """
    from pingpong.query import get_ag_selector

    date1 = datetime(2017, 1, 1, 0, 0, 0)
    date2 = datetime(2017, 1, 1, 17, 30, 15)

    # minutes
    tmp = 'http://www.test.com.br/foo/'
    assert get_ag_selector(date1 - timedelta(seconds=1), date1) == "^(2016-12-31_23:59|2017-01-01_00:00)"
    assert get_ag_selector(date1 - timedelta(seconds=1), date1, tmp) == "^(2016-12-31_23:59|2017-01-01_00:00).+{0}".format(tmp)

    assert get_ag_selector(date1 - timedelta(seconds=5), date1) == "^(2016-12-31_23:59|2017-01-01_00:00)"
    assert get_ag_selector(date1 - timedelta(seconds=5), date1, tmp) == "^(2016-12-31_23:59|2017-01-01_00:00).+{0}".format(tmp)

    assert get_ag_selector(date1 - timedelta(seconds=59), date1) == "^(2016-12-31_23:59|2017-01-01_00:00)"
    assert get_ag_selector(date1 - timedelta(seconds=59), date1, tmp) == "^(2016-12-31_23:59|2017-01-01_00:00).+{0}".format(tmp)

    assert get_ag_selector(date2 - timedelta(seconds=1), date2) == "^(2017-01-01_17:30)"
    assert get_ag_selector(date2 - timedelta(seconds=1), date2, tmp) == "^(2017-01-01_17:30).+{0}".format(tmp)

    assert get_ag_selector(date2 - timedelta(seconds=16), date2) == "^(2017-01-01_17:29|2017-01-01_17:30)"
    assert get_ag_selector(date2 - timedelta(seconds=16), date2, tmp) == "^(2017-01-01_17:29|2017-01-01_17:30).+{0}".format(tmp)

    assert get_ag_selector(date1 - timedelta(seconds=60), date1) == "^(2016-12-31_23|2017-01-01_00)"
    assert get_ag_selector(date1 - timedelta(seconds=60), date1, tmp) == "^(2016-12-31_23|2017-01-01_00).+{0}".format(tmp)

    assert get_ag_selector(date1 - timedelta(seconds=60 * 59), date1) == "^(2016-12-31_23|2017-01-01_00)"
    assert get_ag_selector(date1 - timedelta(seconds=60 * 59), date1, tmp) == "^(2016-12-31_23|2017-01-01_00).+{0}".format(tmp)

    assert get_ag_selector(date2 - timedelta(seconds=60), date2) == "^(2017-01-01_17)"
    assert get_ag_selector(date2 - timedelta(seconds=60), date2, tmp) == "^(2017-01-01_17).+{0}".format(tmp)

    assert get_ag_selector(date2 - timedelta(seconds=60 * 60 - 1), date2) == "^(2017-01-01_16|2017-01-01_17)"
    assert get_ag_selector(date2 - timedelta(seconds=60 * 60 - 1), date2, tmp) == "^(2017-01-01_16|2017-01-01_17).+{0}".format(tmp)

    assert get_ag_selector(date1 - timedelta(days=2), date1) == "^(2016-12|2017-01)"
    assert get_ag_selector(date1 - timedelta(days=2), date1, tmp) == "^(2016-12|2017-01).+{0}".format(tmp)

    assert get_ag_selector(date1 - timedelta(days=100), date1) == "^(2016-09|2016-10|2016-11|2016-12|2017-01)"
    assert get_ag_selector(date1 - timedelta(days=100), date1, tmp) == "^(2016-09|2016-10|2016-11|2016-12|2017-01).+{0}".format(tmp)

    assert get_ag_selector(date1 - timedelta(days=366), date1) == "^(2016|2017)"
    assert get_ag_selector(date1 - timedelta(days=366), date1, tmp) == "^(2016|2017).+{0}".format(tmp)

def test_grep_data():
    """ test query construction based on regex via ag
    """
    from pingpong.query import grep_data
    now = datetime(2017, 7, 15, 15, 0, 0)

    # 2 hosts every minute
    url = 'http://www.test.com.br/foo/'

    assert len(grep_data(now - timedelta(seconds=60), now)) == 2
    assert len(grep_data(now - timedelta(seconds=60), now, url=url)) == 1

    assert len(grep_data(now - timedelta(seconds=60 * 60), now)) == 60 * 2
    assert len(grep_data(now - timedelta(seconds=60 * 60), now, url=url)) == 60

    assert len(grep_data(now - timedelta(seconds=60 * 60 * 6), now)) == 60 * 6 * 2
    assert len(grep_data(now - timedelta(seconds=60 * 60 * 6), now, url=url)) == 60 * 6
