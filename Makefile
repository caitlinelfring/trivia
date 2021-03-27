run: peerserver
	docker run --rm -it -p 3000:3000 -v $$(pwd):/app -w /app node:14 bash

start: peerserver
	docker run --rm -it -p 3000:3000 -v $$(pwd):/app -w /app node:14 sh -c "npm install && npm start"

peerserver:
	docker run --rm -p 9000:9000 -d peerjs/peerjs-server
