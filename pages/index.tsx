import { Box, Button, Textarea } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { Predictions } from "aws-amplify";

const Home: NextPage = () => {
  const [text, setText] = useState("hello");

  const convert = () =>
    Predictions.convert({
      textToSpeech: {
        source: {
          text: text,
        },
        voiceId: "Kimberly",
      },
    }).then((result) => {
      const audioCtx = new AudioContext();
      const source = audioCtx.createBufferSource();
      audioCtx.decodeAudioData(
        result.audioStream,
        (buffer) => {
          source.buffer = buffer;
          source.connect(audioCtx.destination);
          source.start(0);
        },
        (error) => {
          console.log(error);
        }
      );
    });

  return (
    <Box maxW={"1000px"} margin={"auto"} marginTop={"100px"}>
      <Textarea
        placeholder={text}
        height={"300px"}
        overflowY={"auto"}
        marginBottom={"20px"}
        value={text}
        backgroundColor={"gray.100"}
        onChange={(event) => {
          let inputText = event.target.value;
          setText(inputText);
        }}
      ></Textarea>
      <Button
        colorScheme={"green"}
        onClick={() => {
          convert();
        }}
      >
        ToSpeech
      </Button>
    </Box>
  );
};

export default Home;
