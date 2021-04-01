import React, { useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import NoSleep from "nosleep.js";

import Join from "./components/Join";
import Host from "./components/Host";
import JoinInput from "./components/JoinInput";
import { cleanUri, roomIdNumChars } from "./utils/helpers";
import { randStringToUpperCase } from "./utils/random";
import Logo from "./components/Logo.js";
import { SET_HOST } from "./redux/constants";
import { setHost, setPlayer } from "./redux/actions";

const addAlertUserListener = () => {
  if (process.env.NODE_ENV === "production") {
    const alertUser = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }
};

const stopSleep = () => {
  // Stop the screen from going to sleep
  const noSleep = new NoSleep();
  document.addEventListener("click", function enableNoSleep() {
    document.removeEventListener("click", enableNoSleep, false);
    noSleep.enable();
  }, false);
};

const App = () => {
  const dispatch = useDispatch();

  // Clean the url in the browser bar.
  // This might need to go away if I ever want to auto-join from a fragment in the url
  window.history.replaceState({}, document.title, cleanUri());

  useEffect(addAlertUserListener, []);

  const player = useSelector(state => state.user.player);
  console.log(`player: ${JSON.stringify(player)}`);
  const host = useSelector(state => state.user.host);
  console.log(`host: ${JSON.stringify(host)}`);
  const userType = useSelector(state => state.user.type);
  console.log(`userType: ${JSON.stringify(userType)}`);

  // const newGame = () => {
  //   const roomId = sessionStorage.getItem("host_info") || randStringToUpperCase(roomIdNumChars);
  //   sessionStorage.setItem("host_info", roomId);
  //   dispatch(setHost(roomId));
  // };

  // useEffect(() => {
  //   const p = JSON.parse(sessionStorage.getItem("player_info"));
  //   console.log(p);
  //   if (p) {
  //     dispatch(setPlayer(p));
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   const roomId = sessionStorage.getItem("host_info");
  //   if (roomId) {
  //     dispatch(setHost(roomId));
  //   }
  // }, [dispatch]);

  let ui;
  if (player) {
    stopSleep();
    ui = <Join {...player}/>;
  } else if (host) {
    stopSleep();
    ui = <Host roomId={host.roomId}/>;
  } else {
    ui = <>
      <h4>Start a new trivia game with friends!</h4>
      <Button size="lg" variant="primary" onClick={() => dispatch(setHost())}>Start</Button>
      <h4 className="pt-5">Join someone else's game</h4>
      <JoinInput />
    </>;
  }

  return (
    <Container fluid="md" className={"pt-4"}>
      <Row>
        <Col>
          <div className="logo mx-auto p-5">
            <Logo />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Body>
              {ui}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
