"""
testing api queries
"""

from datetime import datetime, timedelta, date
from pytest import raises

def test_query_tail():
    """ test for tail methods
    """
    from query import get_tail

    with raises(Exception):
        get_tail('100')
        get_tail(-100)
        get_tail(True)
        get_tail([True])

    assert get_tail(0) == ''
    assert len(get_tail(0).split('\n')) == 1
    assert len(get_tail(5).split('\n')) == 6

def test_query_head():
    """ test for tail methods
    """
    from query import get_head

    with raises(Exception):
        get_head('100')
        get_head(-100)
        get_head(True)
        get_head([True])

    assert get_head(0) == ''
    assert len(get_head(0).split('\n')) == 1
    assert len(get_head(5).split('\n')) == 6

def test_query_hosts():
    """ test for sorting hosts
    """
    from query import get_hosts

    expected = list(["http://www.test.com.br/bar/","http://www.test.com.br/foo/","http://www.test.com.br/sub/foo/"])
    hosts = get_hosts()
    assert isinstance(hosts, list)
    assert len(hosts) == 3
    assert hosts == expected

def test_query_time():
    """ test query construction based on regex via ag
    """
    from query import get_ag_selector

    d1 = datetime(2017, 1, 1, 0, 0, 0)
    d2 = datetime(2017, 1, 1, 17, 30, 15)

    # minutes
    assert get_ag_selector(d1 - timedelta(seconds=1), d1) == "(2016-12-31_23:59)|(2017-01-01_00:00)"
    assert get_ag_selector(d1 - timedelta(seconds=5), d1) == "(2016-12-31_23:59)|(2017-01-01_00:00)"
    assert get_ag_selector(d1 - timedelta(seconds=59), d1) == "(2016-12-31_23:59)|(2017-01-01_00:00)"
    assert get_ag_selector(d2 - timedelta(seconds=1), d2) == "2017-01-01_17:30"
    assert get_ag_selector(d2 - timedelta(seconds=16), d2) == "(2017-01-01_17:29)|(2017-01-01_17:30)"

    assert get_ag_selector(d1 - timedelta(seconds=60), d1) == "(2016-12-31_23)|(2017-01-01_00)"
    assert get_ag_selector(d1 - timedelta(seconds=60 * 59), d1) == "(2016-12-31_23)|(2017-01-01_00)"
    assert get_ag_selector(d2 - timedelta(seconds=60), d2) == "2017-01-01_17"
    assert get_ag_selector(d2 - timedelta(seconds=60 * 59), d2) == "(2017-01-01_16)|(2017-01-01_17)"

    # assert get_ag_selector(now - timedelta(seconds=1), now) == "2017-08-05_18:50"
    # assert get_ag_selector(now - timedelta(seconds=5), now) == "2017-08-05_18:50"
    # assert get_ag_selector(now - timedelta(seconds=10), now) == "2017-08-05_18:(49|50)"

    # hours
    # print "1m from {0} result in {1}".format(now, get_ag_selector(now - timedelta(seconds=60), now))
    # print "2m from {0} result in {1}".format(now, get_ag_selector(now - timedelta(seconds=60 * 2), now))
    # print "1h from {0} result in {1}".format(now, get_ag_selector(now - timedelta(seconds=60 * 51), now))
    # print "24h from {0} result in {1}".format(now, get_ag_selector(now - timedelta(seconds=60 * 59 * 24), now))
    # assert get_ag_selector(now - timedelta(seconds=10)) == "2017-08-05_18:(49|50)"
    # t10min = now - timedelta(minutes=10)
    # t10hou = now - timedelta(hours=10)
    # t10day = now - timedelta(days=10)
    # t10mon = now - timedelta(days=31 * 10)
    # t1yea = now - timedelta(days=365)

    # print "10min from now {0} => {1}".format(now, get_ag_selector(t10min, now))
    # print get_ag_selector(t10hou, now)
    # print get_ag_selector(t10hou, now)
    # print get_ag_selector(t10day, now)
    # print get_ag_selector(t10mon, now)
    # print get_ag_selector(t1yea, now)


if __name__ == "__main__":
    test_query_time()
