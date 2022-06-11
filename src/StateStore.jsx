/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { createSession } from "./utils/sessions";

export const StateContext = createContext();
export const useStore = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [runningSession, setRunningSession] = useState(false);
  const [currentIntervalId, setCurrentIntervalId] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [breakType, setBreakType] = useState("short");
  const [startRound, setStartRound] = useState(false);
  const [showSessionFinished, setShowSessionFinished] = useState(false);

  const currentSessionRef = useRef();

  useEffect(() => {
    setCurrentSession(currentSessionRef.current);
  }, [currentSession, currentSessionRef]);

  useEffect(() => {
    if (startRound) return startNewRound();
  }, [startRound]);

  useEffect(() => {
    if (isBreak) {
      startNewBreak(currentSession.currentRound < 4 ? "short" : "long");
    }
  }, [isBreak, breakType, currentSession]);

  const playAudioSession = () => {
    let aud = new Audio("tracks/session.mp3");
    aud.play();
  };

  const playAudioRound = () => {
    let aud = new Audio("tracks/round.mp3");
    aud.play();
  };

  const startSession = async (sessionName) => {
    playAudioSession();
    let s = await createSession({ name: sessionName });
    currentSessionRef.current = s;
    setShowSessionFinished(false);
    setCurrentSession(s);
    setRunningSession(true);
    startNewRound();
  };

  const stopSession = () => {
    setCurrentSession({});
    currentSessionRef.current = {};
    setRunningSession(false);
    setIsRunning(false);
    clearInterval(currentIntervalId);
    setTimeRemaining(1500);
  };

  const finishSession = () => {
    stopSession();
    setShowSessionFinished(true);
    console.log("finished");
  };

  const startNewRound = () => {
    playAudioRound();
    if (currentSession && currentSession.currentRound >= 4)
      return finishSession();
    let s = currentSessionRef.current;
    s.currentRound = s.currentRound + 1;
    s.remainingRounds = s.remainingRounds - 1;
    currentSessionRef.current = s;
    setCurrentSession(s);
    setTimeRemaining(1500);
    setIsRunning(true);
    let interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          setIsRunning(false);
          clearInterval(interval);
          setIsBreak(true);
          setBreakType("short");
          setStartRound(false);
        }
        return t - 1;
      });
    }, 1000);
    setCurrentIntervalId(interval);
  };

  const startNewBreak = (type) => {
    playAudioRound();
    setTimeRemaining(type === "short" ? 300 : 900);
    setIsRunning(true);
    let interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          setIsRunning(false);
          clearInterval(interval);
          setIsBreak(false);
          setStartRound(true);
        }
        return t - 1;
      });
    }, 1000);
    setCurrentIntervalId(interval);
  };

  const resumeCurrentTimer = () => {
    setIsRunning((v) => !v);
    let interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          setIsRunning(false);
          clearInterval(interval);
          setIsBreak(true);
          setBreakType("short");
        }
        return t - 1;
      });
    }, 1000);
    setCurrentIntervalId(interval);
  };

  const pauseCurrentTimer = () => {
    setIsRunning((v) => !v);
    clearInterval(currentIntervalId);
    setTimeRemaining((t) => t);
  };

  return (
    <StateContext.Provider
      value={{
        currentSession,
        setCurrentSession,
        timeRemaining,
        setTimeRemaining,
        isRunning,
        setIsRunning,
        currentIntervalId,
        setCurrentIntervalId,
        runningSession,
        setRunningSession,
        startSession,
        stopSession,
        startNewBreak,
        resumeCurrentTimer,
        pauseCurrentTimer,
        isBreak,
        showSessionFinished,
        setShowSessionFinished,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
