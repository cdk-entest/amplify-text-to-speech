## Introduction

Play with amplify predictions api

- text to speech
- text identification

## Init nextjs project

```bash
npx create-next-app@latest --typescript
```

add chakra-ui

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

add amplify

```bash
npm i aws-amplify
```

## Amplify init

```bash
amplify init
```

add auth and choose default with useremail login

```bash
amplfy add auth
```

add predictions and select text to speech for this example

```bash
amplify add predictions
```

## Amplify configure in react

in \_app.ts configure amplify

```tsx
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Amplify, Auth, Predictions } from "aws-amplify";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import awsconfig from "./../src/aws-exports";
try {
  Amplify.configure(awsconfig);
  Amplify.register(Predictions);
  Amplify.register(Auth);
  Predictions.addPluggable(new AmazonAIPredictionsProvider());
} catch (error) {
  console.log(error);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
```

## Text to speech

the ui

```tsx
import { Text, Box, Input, Textarea, Button } from "@chakra-ui/react";
import { Predictions } from "aws-amplify";
import { useState } from "react";
import { docs } from "data/aws-docs";

const TextToSpeech = () => {
  const [text, setText] = useState(docs.amplify);

  // amplify text to speech api
  const convert = () => {
    return ()
  }

  return (
    <Box maxW={"1000px"} margin="auto" marginTop={"100px"}>
      <Textarea
        placeholder={text}
        height={"300px"}
        marginBottom="20px"
        overflowY="auto"
        value={text}
        backgroundColor={"gray.100"}
        onChange={(event) => {
          let inputText = event.target.value;
          setText(inputText);
        }}
      ></Textarea>

      <Button
        colorScheme="green"
        onClick={() => {
          convert();
        }}
      >
        Convert To Speech
      </Button>
    </Box>
  );
};
```

the amplify text to speech api

```tsx
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
```
