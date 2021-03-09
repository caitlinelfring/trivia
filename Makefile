run:
	docker run --rm -it -p 3000:3000 -v $$(pwd):/app -w /app node:14 bash

peerserver:
	docker run -p 9000:9000 -d peerjs/peerjs-server
