#!/usr/bin/env python

""" project setup
base config from https://github.com/jeffknupp/sandman/
"""

from __future__ import print_function
import sys
from setuptools import setup
from setuptools.command.test import test as TestCommand

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
    name='pingpong-api',
    version='0.1.0',
    url='http://github.com/hankpillow/pingpong-api/',
    license='MIT',
    author='igor almeida',
    install_requires=['falcon>=1.3.0,<=2', 'gunicorn>=19,<20', 'Cython>=0.26,<=1'],
    tests_require=['pytest'],
    test_suite="tests",
    cmdclass={'test': PyTest},
    packages=['pingpong'],
    package_dir={'pingpong': './pingpong'},
    include_package_data=True
)
