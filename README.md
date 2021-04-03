<p align="center">
  <a href="https://triviawithfriends.fun">
    <img alt="Trivia with Friends logo" src="https://raw.githubusercontent.com/caitlinelfring/trivia/main/src/static/logo.svg" height="100" />
  </a>
</p>

---
<br />
A group trivia game played remotely in your browser or on your phone!

Play now at <https://triviawithfriends.fun>

There are no guarantees around this project. I am not a React developer, and there are plenty of bugs. Feel free to fork and fix them if you're interested.

## Acknowledgments

* Trivia Database: <https://opentdb.com/>
* PeerJS for WebRTC: <https://peerjs.com/>

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [`LICENSE`](./LICENSE) file for details.

## Run locally

### Docker-compose

[Install docker-compose](https://docs.docker.com/compose/install/)

Then run `docker-compose up` to start trivia and a local PeerJS server. Access via <http://localhost:3000>

### Without docker

*Not recommended, please use docker*

Requirements: Node 14

```bash
npm install

npm start
```

and access via `http://localhost:3000`

See [here](https://github.com/peers/peerjs-server#natively) for documentation for running a PeerJS server locally.

## TODO

* [ ] Stylize winner page
* [ ] Give next button to host
* [ ] Show answers after each round
* [ ] Require unique names
* [ ] Show player submitted status for round
* [ ] Toast when new user joins
* [ ] Avatars / colors
* [ ] Round timer
