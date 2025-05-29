// src/components/DirectionSetter.tsx
"use client";
import i18n from "@/lib/i18n";
import { useEffect } from "react";

export default function DirectionSetter() {

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return null;
}
