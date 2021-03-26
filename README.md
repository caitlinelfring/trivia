# Trivia with Friends

A group trivia game played remotely in your browser or on your phone!

Play now at <https://triviawithfriends.fun>

There are no guarantees around this project. I am not a React developer, and there are plenty of bugs. Feel free to fork and fix them if you're interested.

## Acknowledgments

* Trivia Database: <https://opentdb.com/>
* PeerJS for WebRTC: <https://peerjs.com/>

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [`LICENSE`](./LICENSE) file for details.

## Run locally

```bash

npm install

npm start
```
and access via `http://localhost:3000`

**To run a local PeerServer**

```bash
docker run -p 9000:9000 -d peerjs/peerjs-server
```

## TODO

* [ ] Stylize winner page
* [ ] Give next button to host
* [ ] Show answers afer each round
* [ ] Require unique names
* [ ] Player doesn't lose points if refreshing mid-game
* [ ] Show player submitted status for round
* [ ] Toast when new user joins
* [ ] Avatars / colors
* [ ] Round timer
* [ ] Use bootstrap alert instead of `alert("error")`
