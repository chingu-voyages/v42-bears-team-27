// Repurposed from https://github.com/vydimitrov/use-elapsed-time/blob/master/src/useElapsedTime.ts

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useRef, useEffect } from 'react';

type MayBe<T> = T | null;

type ReturnValue = {
  /** Current elapsed time in seconds */
  elapsedTime: number;
};

type Props = {
  /** Indicates if the loop to get the elapsed time is running or it is paused */
  isPlaying: boolean;
  /** Animation duration in seconds */
  duration?: number;
  /** Start the animation at provided time in seconds. Default: 0 */
  startAt?: number;
  /** Update interval in seconds. Determines how often the elapsed time value will change. When set to 0 the value will update on each key frame. Default: 0 */
  updateInterval?: number;
  /** On time update event handler. It receives the current elapsedTime time in seconds */
  onUpdate?: (elapsedTime: number) => void;
};

function useElapsedTime({
  isPlaying,
  duration,
  startAt = 0,
  updateInterval = 0,
  onUpdate,
}: Props): ReturnValue {
  const [displayTime, setDisplayTime] = useState(startAt);
  const elapsedTimeRef = useRef(0);
  const startAtRef = useRef(startAt);
  const totalElapsedTimeRef = useRef(startAt * -1000); // keep in milliseconds to avoid summing up floating point numbers
  const requestRef = useRef<MayBe<number>>(null);
  const previousTimeRef = useRef<MayBe<number>>(null);
  const repeatTimeoutRef = useRef<MayBe<NodeJS.Timeout>>(null);

  const loop = (time: number) => {
    const timeSec = time / 1000;
    if (previousTimeRef.current === null) {
      previousTimeRef.current = timeSec;
      requestRef.current = requestAnimationFrame(loop);
      return;
    }

    // get current elapsed time
    const deltaTime = timeSec - previousTimeRef.current;
    const currentElapsedTime = elapsedTimeRef.current + deltaTime;

    // update refs with the current elapsed time
    previousTimeRef.current = timeSec;
    elapsedTimeRef.current = currentElapsedTime;

    // set current display time by adding the elapsed time on top of the startAt time
    const currentDisplayTime =
      startAtRef.current +
      (updateInterval === 0
        ? currentElapsedTime
        : // eslint-disable-next-line no-bitwise
        ((currentElapsedTime / updateInterval) | 0) * updateInterval);

    const totalTime = startAtRef.current + currentElapsedTime;
    const isCompleted = typeof duration === 'number' && totalTime >= duration;
    setDisplayTime(isCompleted ? duration! : currentDisplayTime);

    // repeat animation if not completed
    if (!isCompleted) {
      requestRef.current = requestAnimationFrame(loop);
    }
  };

  const cleanup = () => {
    requestRef.current && cancelAnimationFrame(requestRef.current);
    repeatTimeoutRef.current && clearTimeout(repeatTimeoutRef.current);
    previousTimeRef.current = null;
  };

  useEffect(() => {
    onUpdate?.(displayTime);

    if (duration && displayTime >= duration) {
      totalElapsedTimeRef.current += duration * 1000;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayTime, duration]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(loop);
    }

    return cleanup;
    // start animation over when duration or updateInterval change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, duration, updateInterval]);

  return { elapsedTime: displayTime };
}

export default useElapsedTime;
