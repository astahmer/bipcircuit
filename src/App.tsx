import { Center, ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import "./App.css";
import { isPlayingAtom } from "./atoms";
import { BipCircuit } from "./components/BipCircuit";
import { BipSound } from "./components/BipSound";
import { Controls } from "./components/Controls";

// prevent react-sound to YELL in the console
// (window as any).soundManager.setup({ debugMode: false });

const theme = extendTheme({ config: { initialColorMode: "light" } });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" boxSize="100%">
        <Center mt="40px" mb="40px" px="4" maxW="1200px" alignSelf="center">
          <Controls />
        </Center>
        <Center p="8" pt="0" h="100%">
          <BipCircuit />
        </Center>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
