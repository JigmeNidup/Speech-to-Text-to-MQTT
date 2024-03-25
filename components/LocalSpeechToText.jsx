"use client";
import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, Card, Col, Row } from "antd";

const LocalSpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  return (
    <Card hoverable style={{ height: 400, width: 350 }}>
      <center>
        <h3>Speech To Text</h3>
      </center>
      <Row gutter={[16, 16]} justify="space-evenly">
        <Col>
          {listening ? (
            <Button type="primary" onClick={SpeechRecognition.stopListening}>
              Stop
            </Button>
          ) : (
            <Button type="primary" onClick={SpeechRecognition.startListening}>
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
        <p>{transcript}</p>
      </div>
    </Card>
  );
};

export default LocalSpeechToText;
