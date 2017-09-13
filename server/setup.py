""" project setup
base config from https://github.com/jeffknupp/sandman/
"""
from __future__ import print_function

import codecs
import os
import sys

from setuptools import setup
from setuptools.command.test import test as TestCommand

HERE = os.path.abspath(os.path.dirname(__file__))

def read(*parts):
    """intentionally *not* adding an encoding option to open"""
    return codecs.open(os.path.join(HERE, *parts), 'r').read()

class PyTest(TestCommand):
    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = ['--strict', '--verbose', '--tb=long', 'tests']
        self.test_suite = True

    def run_tests(self):
        import pytest
        errno = pytest.main(self.test_args)
        sys.exit(errno)

setup(
    name='pingpong api',
    url='http://github.com/hankpillow/pingpong-api/',
    license='MIT',
    author='igor almeida',
    tests_require=['pytest'],
    install_requires=['falcon'],
    cmdclass={'test': PyTest},
    packages=['pingpong'],
    include_package_data=True,
    platforms='any',
    zip_safe=False,
    extras_require={
        'testing': ['pytest'],
      }
)
