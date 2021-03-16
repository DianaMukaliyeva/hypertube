SCRIPT_VERSION=v1.0

THIS_FILE := $(lastword $(MAKEFILE_LIST))

.PHONY: help build build-prod up up-prod start start-prod down down-prod destroy stop restart restart-prod logs logs-prod logs-api ps ps-prod login-timescale login-api db-shell

HELP_FUN = \
	%help; while(<>){push@{$$help{$$2//'options'}},[$$1,$$3] \
	if/^([\w-_]+)\s*:.*\#\#(?:@(\w+))?\s(.*)$$/}; \
	print"$$_:\n", map"  $$_->[0]".(" "x(20-length($$_->[0])))."$$_->[1]\n",\
	@{$$help{$$_}},"\n" for keys %help; \

help: ##@Miscellaneous  List all commands available for make
	@echo "Usage: make [target] ...\n"
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)
	@echo  "version $(SCRIPT_VERSION)"

build:	##@Development Build all images
	docker-compose -f docker-compose.yml -p hypertube build

up:	##@Development Start all or c=<name> containers in foreground
	docker-compose -f docker-compose.yml -p hypertube up

start:	##@Development Start all or c=<name> containers in background
	docker-compose -f docker-compose.yml -p hypertube up $(c) -d

stop:	##@Development Stop all or c=<name> containers
	docker-compose -f docker-compose.yml -p hypertube stop $(c)

down:	##@Development Stop and delete all containers
	docker-compose -f docker-compose.yml -p hypertube down $(c)

destroy:	##@Development Stop and delete all containers, their volumes and network
	docker-compose -f docker-compose.yml -p hypertube down -v $(c)

destroy-all:	##@Development Stop and delete all containers, their images, network and volumes
	docker-compose -f docker-compose.yml -p hypertube down -v --rmi all $(c)

logs:	##@Development Show logs for all or c=<name> containers
	docker-compose -f docker-compose.yml -p hypertube logs --tail=100 -f $(c)

logs-backend:	##@Development Show logs for all or c=<name> containers
	docker-compose -f docker-compose.yml -p hypertube logs --tail=100 -f backend_hyper

build-prod:	##@Production Build all the project in production mode
	docker-compose -f docker-compose.prod.yml -p hypertube-prod build $(c)

up-prod:	##@Production Build and start all the project in production mode in foreground
	docker-compose -f docker-compose.prod.yml -p hypertube-prod up

start-prod:	##@Production Start all the project in production mode in background
	docker-compose -f docker-compose.prod.yml -p hypertube-prod up -d $(c)

down-prod:	##@Production Stop and delete all containers in production
	docker-compose -f docker-compose.prod.yml -p hypertube-prod down $(c)

stop-prod:	##@Production Stop all or c=<name> containers in production
	docker-compose -f docker-compose.prod.yml -p hypertube-prod stop $(c)

npm-back:	##@Development Install package on backend
	docker-compose -f docker-compose.yml -p hypertube exec backend_hyper /bin/sh -c "npm install $(i)"

npm-front:	##@Development Install package on frontend
	docker-compose -f docker-compose.yml -p hypertube exec frontend_hyper /bin/sh -c "npm install $(i)"

test-back:	##@Development Install package on backend
	docker-compose -f docker-compose.yml -p hypertube exec backend_hyper /bin/sh -c "npm test"

test-front:	##@Development Install package on frontend
	docker-compose -f docker-compose.yml -p hypertube exec frontend_hyper /bin/sh -c "npm test $(t)"

lint-back:
	cd backend && npm run lint

lint-front:
	cd frontend && npm run lint

lint: lint-back lint-front ## run make -j lint

lint-back-fix:
	cd backend && npm run lint:fix

lint-front-fix:
	cd frontend && npm run lint:fix

lint-fix: lint-back-fix lint-front-fix ## run make -j lint
