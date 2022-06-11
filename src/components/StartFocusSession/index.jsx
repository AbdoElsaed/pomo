import React from "react";
import { useState } from "react";
import { Button, Input } from "antd";
import { AimOutlined } from "@ant-design/icons";

import { useStore } from "../../StateStore";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sessionInput: {
    backgroundColor: "#333",
    maxWidth: "250px",
    color: "#EEE",
    border: "1px solid #555",
    padding: "5px 10px",
    outline: "none",
  },
  btn: {
    maxWidth: "250px",
    marginTop: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
};

const StartFocusSession = () => {
  const [sessionName, setSessionName] = useState("");

  const {
    currentSession,
    runningSession,
    startSession,
    stopSession,
    showSessionFinished,
  } = useStore();

  const handleStart = () => {
    startSession(sessionName);
    console.log("start new session");
    console.log({ sessionName });
    setSessionName("");
  };

  const handleStop = () => {
    stopSession();
  };

  return (
    <div style={styles.container}>
      {showSessionFinished ? (
        <p
          style={{
            color: "#2c8042",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Congrats, u just finished a focus session! <span role="img" aria-label="emojis">&#128079; &#128640;</span>
        </p>
      ) : null}
      {!runningSession ? (
        <Input
          style={styles.sessionInput}
          placeholder="Session Name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
        />
      ) : (
        <span
          style={{ color: "#CCC", fontWeight: "bold", fontFamily: "serif" }}
        >
          Working on {currentSession.name}
        </span>
      )}
      <Button
        style={styles.btn}
        type={runningSession ? "danger" : "primary"}
        icon={<AimOutlined />}
        onClick={runningSession ? handleStop : handleStart}
      >
        {`${runningSession ? "Stop" : "Start"} Focus Session`}
      </Button>
      <p style={{ color: "#EEE" }}>
        {runningSession ? `${currentSession.currentRound} / 4` : null}
      </p>
    </div>
  );
};

export default StartFocusSession;
