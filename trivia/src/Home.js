import { Button, TextField, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Join from './Join';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function Home(props) {
  const classes = useStyles();

  const [join, setJoin] = useState(false);
  const [create, setCreate] = useState(false);
  console.log(`join: ${join}`);
  console.log(`create: ${create}`);

if (join) {
    return (
      <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
    );
  } else if (create) {
    const link = `${window.location.origin}#abc`

    return(<div>
      <p>
        Share this link with others:
        <Tooltip title="Copy" arrow>
          <Button
            variant="contained"
            color="default"
            style={{textTransform: "none"}}
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
            startIcon={<FontAwesomeIcon icon={faCopy} />}
          >
            {link}
          </Button>
        </Tooltip>
      </p>
    </div>);
  } else if (props.id) {
    return (
        <Join id={props.id} />
    );
  } else {
    return (
      <div className="Home">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => setCreate(true)}
        >
          New
      </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => setJoin(true)}
        >
          Join
      </Button>
      </div>
    );
  }
}

export default Home;
