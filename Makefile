install:
	npm ci && make -C frontend install

build:
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npm run build & make start-backend & make start-frontend

deploy:
	npm ci && cd ./frontend && npm ci && npm run build:deploy

lint-frontend:
	make -C frontend lint
