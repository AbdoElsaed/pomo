import React from "react";
import { Button } from "antd";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { useStore } from "../../StateStore";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    background: "none",
    color: "#CCC",
    marginTop: "20px",
    border: "2px solid #999",
    width: "40px",
    height: "40px",
  },
};

const TimerControllers = () => {
  let {
    isRunning,
    runningSession,
    resumeCurrentTimer,
    pauseCurrentTimer
  } = useStore();

  const handleStartTimer = () => {
    resumeCurrentTimer();
  };

  const handlePauseTimer = () => {
    pauseCurrentTimer()
  };

  return runningSession ? (
    <div style={styles.container}>
      {!isRunning ? (
        <Button
          title="Start"
          style={styles.btn}
          shape="circle"
          icon={<CaretRightOutlined style={{ fontSize: "20px" }} />}
          onClick={handleStartTimer}
        />
      ) : (
        <Button
          title="Pause"
          style={styles.btn}
          shape="circle"
          icon={<PauseOutlined style={{ fontSize: "20px" }} />}
          onClick={handlePauseTimer}
        />
      )}
    </div>
  ) : null;
};

export default TimerControllers;
