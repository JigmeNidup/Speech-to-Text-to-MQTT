"use client";
import LocalSpeechToText from "@/components/LocalSpeechToText";
import { useEffect, useState } from "react";

export default function Home() {
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
      <div>{show && <LocalSpeechToText />}</div>
    </main>
  );
}
