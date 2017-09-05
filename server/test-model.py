"""
test api models, routes and queries
"""

SAMPLE = '2017-09-04_17:42:01 200 0.004620 0.022010 0.000000 0.022141 0.000000 0.044009 0.044057 0 http://www.foo.com/bar/'
SAMPLE_FAIL = '201-09-4_17:2:01 200 0.004620 0.022010 0.000000 0.022141 0.000000 0.044009 0.044057 0 http://www.foo.com/bar/'

ERROR = '2017-07-12_22:20:01 !6 http://foo.bar/'
ERROR_FAIL = '2017-07-_22:20:01 !6 http://foo.bar/'
ERROR_FAIL2 = '2017-07-12_22:20:01 6 http://foo.bar/'

from pytest import raises

def test_model_sample():
    """test creating sample models
    """
    from model import format_sample

    with raises(Exception):
        format_sample('')
        format_sample(SAMPLE)
        format_sample('a b c d e f g h i j k')
        format_sample(SAMPLE_FAIL.split(' '))

    assert format_sample(SAMPLE.split(' ')) != None
    assert format_sample(SAMPLE.split(' '))['type'] == 'sample'

def test_model_error():
    """test creating error model
    """
    from model import format_error

    with raises(Exception):
        format_error('')
        format_error(ERROR)
        format_error('a b c d e')
        format_error('a b c d e f')
        format_error(ERROR_FAIL.split(' '))
        format_error(ERROR_FAIL2.split(' '))

    assert format_error(ERROR.split(' ')) != None
    assert format_error(ERROR.split(' '))['type'] == 'error'

def test_parse_line():
    """test parse_line to resolve string into models
    """
    from model import parse_line

    with raises(Exception):
        parse_line('')
        parse_line('foo bar')
        parse_line(False)
        parse_line([])

    assert parse_line(SAMPLE)['type'] == 'sample'
    assert parse_line(ERROR)['type'] == 'error'
