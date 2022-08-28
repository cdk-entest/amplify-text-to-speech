import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Amplify, Auth, Predictions } from "aws-amplify";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";

import awsconfig from "./../src/aws-exports";

try {
  Amplify.configure(awsconfig);
  Amplify.register(Auth);
  Amplify.register(Predictions);
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

export default MyApp;
