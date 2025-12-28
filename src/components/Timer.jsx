import React, { useEffect, useState } from "react";

const Timer = ({isRunning, onFinish}) => {

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev => prev + 1));
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (totalSeconds) =>  {
        const mins = Math.floor(totalSeconds/60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return(
        <div>
            {formatTime(seconds)}
        </div>
    )
};

export default Timer;