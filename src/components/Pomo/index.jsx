import React from 'react'
import StartFocusSession from '../StartFocusSession'
import Timer from '../Timer'

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px",
    },
  };

const index = () => {
  return (
    <div style={styles.container}>
        <StartFocusSession />
        <Timer />
    </div>
  )
}

export default index