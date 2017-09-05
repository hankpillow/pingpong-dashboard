"""
class desgined to do all the interface btw
files and api request
"""

from subprocess import check_output

def get_tail(qtd=10, path='./test/full.log'):
    """return the last $qtd items from $path
    """

    if type(qtd) != int:
        raise Exception("get_tail:: qtd must be an int")

    if qtd < 1:
        return ''

    return check_output(['tail', '-n{0}'.format(qtd), path])

def get_head(qtd=10, path='./test/full.log'):
    """return the first $qtd items from $path
    """

    if type(qtd) != int:
        raise Exception("get_head:: qtd must be an int")

    if qtd < 1:
        return ''

    return check_output(['head', '-{0}'.format(qtd), path])

def get_hosts(path='./test/full.log'):
    """return a list of uniq host name
    """
    from subprocess import CalledProcessError

    # return check_output(["ag", "https?://.+", path, "-o ", "--no-color", "|", "sort", "-u"])
    try:
        cmd = "ag \"https?://.+\" {0} -o --no-color | sort -u".format(path)
        return check_output(cmd.split(' '))
    except CalledProcessError as error:
        raise Exception("get_hosts:: cant run this command")

