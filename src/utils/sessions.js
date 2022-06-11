export const createSession = async ({ name, isNew=true }) => {
    const obj = {
        name,
        allRounds: 4,
        remainingRounds: 4,
        currentRound: 0,
        doneRounds: 0,
        finished: false
    }

    return Promise.resolve(obj);
}

export const formatDuration = (durationInSeconds) => {
    let mins = (durationInSeconds / 60) | 0;
    let secs = (durationInSeconds % 60) | 0;

    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    return `${mins} : ${secs}`;
}

export const getPercent = (durationInSeconds, type) => {
    let percent = 0;
    if (type === 'work') {
        percent = (durationInSeconds / (25*60)) * 100;
    } else if (type === 'rest') {
        percent = (durationInSeconds / (5*60)) * 100;
    }
    return percent;
}

export const startTimerCountDown = () => {

}

export const stopTimerCountDown = () => {
    
}