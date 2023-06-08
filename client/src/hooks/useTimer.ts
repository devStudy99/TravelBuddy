import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useTimer = (initialTime: number): [number, () => void, () => void] => {
  const [remainingTime, setRemainingTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isActive && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, remainingTime]);

  const startTimer = () => {
    setIsActive(true);
    setRemainingTime(initialTime);
  };

  const stopTimer = () => {
    setIsActive(false);
    setRemainingTime(initialTime);
  };

  return [remainingTime, startTimer, stopTimer];
};
