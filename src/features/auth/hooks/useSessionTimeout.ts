"use client";

import { useEffect, useRef, useState } from "react";
import { logoutAction } from "../actions/loginAction";

export function useSessionTimeout(
  timeoutMs: number = 10 * 60 * 1000,
  warnMs: number = 2 * 60 * 1000
) {
  const [isWarning, setIsWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(warnMs);
  const timeoutTimer = useRef<NodeJS.Timeout | null>(null);
  const warningTimer = useRef<NodeJS.Timeout | null>(null);
  const intervalTimer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    setIsWarning(false);
    setTimeRemaining(warnMs);

    if (timeoutTimer.current) clearTimeout(timeoutTimer.current);
    if (warningTimer.current) clearTimeout(warningTimer.current);
    if (intervalTimer.current) clearInterval(intervalTimer.current);

    warningTimer.current = setTimeout(() => {
      setIsWarning(true);
      intervalTimer.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1000) {
            handleLogout();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }, timeoutMs - warnMs);

    timeoutTimer.current = setTimeout(() => {
      handleLogout();
    }, timeoutMs);
  };

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/login?timeout=true";
  };

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    const handleActivity = () => resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (timeoutTimer.current) clearTimeout(timeoutTimer.current);
      if (warningTimer.current) clearTimeout(warningTimer.current);
      if (intervalTimer.current) clearInterval(intervalTimer.current);
    };
  }, [timeoutMs, warnMs]);

  return { isWarning, timeRemaining, resetTimer };
}
