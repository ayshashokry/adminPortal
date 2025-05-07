"use client"
import useAuthStore from "@/store/authStore";
import { useCallback, useEffect, useState } from "react";

const InactivityTimer = () => {
  const { logout } = useAuthStore();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      logout();
    }, 3600000);
    setTimer(newTimer);
  }, [timer,logout]);

  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "click"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
};

export default InactivityTimer;
