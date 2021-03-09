// import { useLocation } from 'react-router-dom';
// // import { Container } from '@material-ui/core';
// import Box from '@material-ui/core/Box';

// import Home from "./Home";

// function App() {
//   const location = useLocation();
//   const id = location.hash.substring(1);

//   return (
//     <Box color="text.primary">
//     <Home id={id === "" ? null : id} />
//     </Box>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  // BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {
  Button,
  Tooltip,
  Grid,
  Paper,
  Input,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import Peer from 'peerjs';

import { randString } from "./random";

export default function App() {
  return (
    <HashRouter
      hashType={"noslash"}
    >
      <div>
        <Switch>
          <Route path="/new">
            <Create />
          </Route>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </HashRouter >
  );
}

function Home() {
  let match = useRouteMatch();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}><Link to={`${match.url}/new`}>New</Link></Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}><Link to={`${match.url}/join`}>Join</Link></Paper>
      </Grid>
    </Grid>
  );
}

function Create() {
  const id = randString(4).toUpperCase();
  const link = `${window.location.origin}/#join/${id}`;
  return (
    <div>
      <p>Share this link with others</p>
      <Tooltip title="Copy" arrow>
        <Button
          variant="contained"
          color="default"
          style={{ textTransform: "none" }}
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}
          startIcon={<FontAwesomeIcon icon={faCopy} />}
        >
          {link}
        </Button>
      </Tooltip>
    </div>
  );
}

function Join() {
  let match = useRouteMatch();
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      '& input': {
        borderColor: 'green',
        borderWidth: 2,
        textTransform: "uppercase",
      },
    },
  }));
  const classes = useStyles();

  const [input, setInput] = useState(null);
  const [submitButton, setSubmitButton] = useState(false);

  const button = submitButton ? <Link to={`${match.url}/${input}`}><Button
    variant="contained"
    color="default"
    onClick={() => {

    }}
    startIcon={<FontAwesomeIcon icon={faCopy} />}
  >
    Join
  </Button></Link> : undefined
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:join`}>
          <JoinID />
        </Route>
        <Route path={match.path}>
          <h3>Please supply your Join ID</h3>
          <form className={classes.root} noValidate>

            <Input
              id="outlined-basic"
              inputProps={{'maxLength': '4'}}
              className={classes.margin}
              label="Outlined"
              variant="outlined"
              placeholder="XXXX"
              onChange={(e) => {
                const text = e.target.value;
                setInput(text.toUpperCase());
                setSubmitButton(text.length === 4);
              }}
          />
          {button}
          </form>
        </Route>
      </Switch>
    </div>
  );
}

function JoinID() {
  let { join } = useParams();
  const peer = new Peer(join, {
    host: 'localhost',
    port: 9000,
    path: '/myapp'
  });

  peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    console.log(peer.connections);
      peer.listAllPeers((ids) => {
    console.log(ids);
  });
  });

  const conn = peer.connect(join);
  conn.on('open', function () {
    // Receive messages
    conn.on('data', function (data) {
      console.log('Received', data);
    });

    // Send messages
    conn.send('Hello!');
  });
  return <h3>Requested join: {join}</h3>;
}
