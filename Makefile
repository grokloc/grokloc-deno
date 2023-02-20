DOCKER       	= docker
DOCKER_COMPOSE 	= docker-compose
COMPOSE_NETWORK = grokloc-deno
DOCKER_RUN   	= $(DOCKER) run --rm -it
DOCKERFILE_BASE = Dockerfile.base
IMG_BASE      	= grokloc/grokloc-deno:base
DOCKERFILE_DEV	= Dockerfile.dev
IMG_DEV      	= grokloc/grokloc-deno:dev
CWD          	= $(shell pwd)
BASE         	= /grokloc
APP_PORTS    	= -p 3000:3000

# mount code and run something
RUN_PORTS    = $(APP_PORTS)
RUN_UNIT     = $(DOCKER_RUN) --env-file env/unit.env --network=$(COMPOSE_NETWORK) -v $(CWD):$(BASE) -v /tmp:/repos -w $(BASE) $(RUN_PORTS) $(IMG_BASE)

.PHONY: docker
docker:
	$(DOCKER) build . -f $(DOCKERFILE_BASE) -t $(IMG_BASE)
	$(DOCKER) build . -f $(DOCKERFILE_DEV) -t $(IMG_DEV)

.PHONY: docker-force
docker-force:
	$(DOCKER) pull denoland/deno:latest
	$(DOCKER) build --no-cache . -f $(DOCKERFILE_BASE) -t $(IMG_BASE)

.PHONY: docker-push
docker-push:
	$(DOCKER) push $(IMG_BASE)
	$(DOCKER) push $(IMG_DEV)

.PHONY: docker-pull
docker-pull:
	$(DOCKER) pull $(IMG_BASE)
	$(DOCKER) system prune -f
	$(DOCKER) system prune -f
	$(DOCKER) system prune -f

.PHONY: up
up:
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d

.PHONY: down
down:
	$(DOCKER_COMPOSE) down -t 2

.PHONY: shell
shell:
	$(RUN_UNIT) /bin/bash

.PHONY: lint
lint:
	$(RUN_UNIT) deno lint

.PHONY: test
test:
	$(RUN_UNIT) deno test

.PHONY: all
all: test lint

.PHONY: local-lint
local-lint:
	deno lint

.PHONY: local-test
local-test:
	GROKLOC_ENV="UNIT" deno test
