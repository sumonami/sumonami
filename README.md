# Sumo-Nami

Created For Global Game Jam 2017

Tested on MacOS(10.11.6) and Fedora 25.
## Dependencies
 - Docker

## Deployment

- Makefiles are provided to spin up a docker image running a simple HTTP server on 8080 (both loopback and eth0, beware!).
- All you should need to do is `make`.
- To configure the connection settings edit docker-compose.yaml