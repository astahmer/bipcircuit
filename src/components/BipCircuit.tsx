import {
  Box,
  BoxProps,
  Button,
  Center,
  chakra,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useMachine } from "@xstate/react";
import { useAnimation } from "framer-motion";
import { useAtomValue } from "jotai/utils";
import { useEffect, useRef, useState } from "react";
import {
  defaultLoopCountAtom,
  defaultStepValueAtom,
  selectionAtom,
  volumeAtom,
} from "../atoms";
import { BipInfos, useBipInfos } from "../functions/useBipInfos";
import { useSelectionAtom } from "../functions/useSelectionAtom";
import { getId, makeDelay, playBip, useIsMobile } from "../functions/utils";
import { createTimelineMachine } from "../timelineMachine";
import { BipItem } from "../types";
import { StepInput } from "./StepInput";
import { Timeline } from "./Timeline";
import Sound from "react-sound";
import useSound from "use-sound";
import { on } from "@pastable/core";
import buzz from "buzz";

const audio = new Audio("/bip.mp3");
var sound = new buzz.sound("/bip.mp3");

export const BipCircuit = (props: BoxProps) => {
  return (
    <Box pos="relative" borderWidth="4px" boxSize="100%" p="8" {...props}>
      <Center>
        <BipForm />
      </Center>
    </Box>
  );
};

const BipForm = () => {
  console.log("ONCLICK");
  const defaultStepValue = useAtomValue(defaultStepValueAtom);
  const [items, actions] = useSelectionAtom<BipItem>(selectionAtom, { getId });
  const append = () => actions.add(makeDelay(defaultStepValue));

  const stopWatchRef = useRef<HTMLElement>();
  const totalRef = useRef<HTMLElement>();
  const loopTo = useAtomValue(defaultLoopCountAtom);

  const controls = useAnimation();
  const ctxRef = useRef<BipInfos>();
  const { duration, percentItems } = useBipInfos(ctxRef);
  const volume = useAtomValue(volumeAtom);

  const onClick = async () => {
    try {
      audio.volume = volume;
      audio.currentTime = 0;
      await audio.play();
      console.log("TOUCHSTART");
    } catch (error) {
      console.error(error);
    }
  };

  const onReachStep = () => {
    onClick();
  };
  // const onReachStepRef = useRef(() => playBip())

  const [state, send] = useMachine(() =>
    createTimelineMachine({
      interval: 10,
      loopTo,
      controls,
      onReachStep,
      onUpdateTime: (ctx) => {
        const ms = ctx.current.elapsedTime;
        const loop = ctx.current.loopCount;
        const duration = ctx.ref.current.duration;

        stopWatchRef.current.textContent = ms / 1000 + "s";
        totalRef.current.textContent = (ms / 1000 + loop * duration).toFixed(2);
      },
      ref: ctxRef,
    })
  );

  // Reset stopWatch + total texts
  useEffect(() => {
    if (!state.matches("stop")) return;
    stopWatchRef.current.textContent = "0s";
    totalRef.current.textContent = "0";
  }, [state.value]);

  // Auto-update loopTo from Controls atom
  useEffect(
    () =>
      (send as any)({
        type: "UPDATE",
        key: "settings",
        data: (settings) => ({ ...settings, loopTo }),
      }),
    [loopTo]
  );

  console.log(state.toStrings().slice(-1)[0]);
  console.log(state.context);

  const play = () => send("START");
  const stop = () => send("STOP");
  const pause = () => send("PAUSE");
  const playOrPause = () => {
    audio.src = "/bip.mp3";
    if (state.matches("stop")) {
      audio.load();
      audio.play();
    }
    state.matches("started.playing") ? pause() : play();
  };

  const isMobile = useIsMobile();

  const startBtnRef = useRef();
  useEffect(() => {
    console.log(startBtnRef.current);
    audio.volume = volume;
    audio.load();
    // return on(startBtnRef.current, "touchstart", (e) => {
    //   console.log("PLAY AUDIO TOUCHSYART");
    //   const audio = new Audio("/bip.ogg");
    //   audio.volume = volume;
    //   audio.load();
    //   audio.play();
    // });
  }, []);

  return (
    <Stack w="100%" maxW={["100%", "700px"]}>
      <SimpleGrid
        columns={[2, 4]}
        spacing="20px"
        spacingY={["40px", "80px"]}
        alignItems="center"
      >
        {items.map((item) => (
          <StepInput
            key={item.id}
            update={(delay) => actions.update({ ...item, delay })}
            remove={() => actions.remove(item)}
            value={item.delay}
          />
        ))}
        <Button
          colorScheme="twitter"
          variant="solid"
          onClick={() => append()}
          justifySelf="center"
        >
          Ajouter une étape
        </Button>
      </SimpleGrid>
      <Box>
        <Box my="50px">
          <Timeline
            width={isMobile ? "100%" : "700px"}
            actions={actions}
            percents={percentItems}
            duration={duration}
            controls={controls}
          />
        </Box>
      </Box>
      <Stack mt="40px">
        <Stack direction="row" w="100%">
          <Button
            colorScheme="twitter"
            w="100%"
            onClick={playOrPause}
            isDisabled={!percentItems.length}
            ref={startBtnRef}
          >
            {state.matches("started.playing")
              ? "Pause"
              : state.matches("end")
              ? "Restart"
              : state.matches("started.paused")
              ? "Continue"
              : "Start"}
          </Button>
          <Button
            colorScheme="twitter"
            w="100%"
            onClick={stop}
            disabled={state.matches("stop")}
          >
            Stop
          </Button>
        </Stack>
        <Stack direction="row">
          <chakra.span>state: {state.toStrings().slice(-1)[0]}</chakra.span>
          <chakra.span>loop: {state.context.current.loopCount}</chakra.span>
        </Stack>
        <Stack direction="row">
          <chakra.span>{items.length} items</chakra.span>
          <chakra.span>/</chakra.span>
          <chakra.span>
            sections de {(100 / (items.length || 1)).toFixed(2)}%
          </chakra.span>
          <chakra.span>/</chakra.span>
          <chakra.span>{duration}s</chakra.span>
          <chakra.span>/</chakra.span>
          <chakra.span>{Math.ceil(duration) + 1} steps</chakra.span>
        </Stack>
        <Stack direction="row">
          <chakra.span w="50px" ref={stopWatchRef} />
          <chakra.span>- </chakra.span>
          <chakra.span w="100px">
            <chakra.span ref={totalRef} />
            <chakra.span ml="5px">
              / {duration * state.context.settings.loopTo}s
            </chakra.span>
          </chakra.span>
        </Stack>
      </Stack>
    </Stack>
  );
};
