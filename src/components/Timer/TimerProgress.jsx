import React from "react";
import { Progress } from "antd";

import { useStore } from "../../StateStore";
import { formatDuration, getPercent } from "../../utils/sessions";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
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

const TimerProgress = () => {
  let { timeRemaining, isBreak } = useStore();

  return (
    <div style={styles.container}>
      <Progress
        trailColor="#555"
        strokeColor={!isBreak ? "#04EB8B" : "red"}
        strokeWidth="5"
        type="circle"
        percent={getPercent(timeRemaining, "work")}
        width={170}
        format={(percent) => (
          <div style={{ color: "#EEE" }}>{formatDuration(timeRemaining)}</div>
        )}
      />
    </div>
  );
};

export default TimerProgress;
