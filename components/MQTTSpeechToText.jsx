"use client";
import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useDashboardDataStore } from "@/context/MQTTContext";
import { Button, Card, Col, Row, Select } from "antd";

import { languages } from "./languages";

const MQTTSpeechToText = () => {
  const [start, setStart] = useState(false);
  const [msg, setMsg] = useState("");
  const [lang, setLang] = useState("en-US");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { mqttPublish } = useDashboardDataStore();

  useEffect(() => {
    if (transcript) {
      setMsg(transcript);
      mqttPublish({
        topic: "oled_display",
        payload: transcript,
      });
    }

    if (start || !listening) {
      setTimeout(() => {
        SpeechRecognition.startListening({ language: lang });
      }, 100);
    } else {
      SpeechRecognition.stopListening();
    }
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  //search
  const onChange = (value) => {
    setLang(value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Card hoverable style={{ height: 450, width: 350 }}>
      <center>
        <h3>Speech To Text To MQTT</h3>
      </center>
      <center>
        <Select
          showSearch
          placeholder="Select a Language"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={filterOption}
          options={languages}
        />
      </center>
      <br />
      <Row gutter={[16, 16]} justify="space-evenly">
        <Col>
          {start ? (
            <Button
              type="primary"
              onClick={() => {
                setStart(false);
                SpeechRecognition.stopListening();
              }}
            >
              Stop
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                
                SpeechRecognition.startListening();
                setStart(true);
              }}
            >
              Start
            </Button>
          )}
        </Col>
        <Col>
          <Button danger onClick={resetTranscript}>
            Reset
          </Button>
        </Col>
      </Row>

      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
          padding: 20,
          border: "1px solid black",
          height: 200,
          borderRadius: 5,
        }}
      >
        <p>{msg}</p>
      </div>
    </Card>
  );
};

export default MQTTSpeechToText;
