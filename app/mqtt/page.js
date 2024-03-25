"use client";
import MQTTSpeechToText from "@/components/MQTTSpeechToText";
import { useEffect, useState } from "react";

export default function MQTTSend() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8EC5FC",
        backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
      }}
    >
      <div>{show && <MQTTSpeechToText />}</div>
    </main>
  );
}
