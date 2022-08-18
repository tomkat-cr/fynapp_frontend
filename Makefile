# .DEFAULT_GOAL := local
# .PHONY: tests
SHELL := /bin/bash

# General Commands
help:
	cat Makefile

install:
	npm install

build-dev:
	npm run build

build-prod:
	npm run build-prod

#lockedInstall:
	# npm install --ignore-pipfile

dev:
	npm install --dev

#lockedDev:
#	npm install --dev --ignore-pipfile

# clean:
# 	npm --rm

# fresh: clean install

# Development Commands
tests-dev:
	npm run test-dev

tests:
	npm test

test: tests

eject-dev:
	npm run eject-dev

# lint:
# 	npm run prospector

# types:
# 	npm run mypy .

# coverage:
# 	npm run coverage run -m unittest discover tests;
# 	npm run coverage report

# format:
# 	npm run yapf -i *.py **/*.py **/**/*.py

# format-check:
# 	npm run yapf --diff *.py **/*.py **/**/*.py

# qa: lint types tests format-check

# Application Specific Commands
# requirements:
# 	npm run pip freeze >> requirements.txt

config:
	# npm run chalice_config

# deploy: requirements config
	# npm run chalice deploy --stage api

local: config
	# sh run_fynapp_frontend.sh
	npm run start-dev

server: local
start: local

# api: config
	# ./scripts/run_local.sh

run:
	# sh run_fynapp_frontend.sh
	npm start
