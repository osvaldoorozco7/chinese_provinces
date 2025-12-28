import React, { useEffect, useState } from "react";

const Timer = ({isRunning, onFinish}) => {

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
        
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