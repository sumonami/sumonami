IMAGE=ggj-pfpt
TAG=0.1

run:
	docker-compose up

production-build:
	docker-compose -f docker-compose-prod.yml up
