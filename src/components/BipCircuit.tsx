import {
  Box,
  BoxProps,
  Button,
  Center,
  chakra,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  StackProps,
  useColorMode,
  useDisclosure,
  usePrevious,
} from "@chakra-ui/react";
import { useSelection } from "@pastable/core";
import { atom, useAtom } from "jotai";
import { atomWithStorage, useAtomValue, useUpdateAtom } from "jotai/utils";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  defaultLoopCountAtom,
  defaultStepValueAtom,
  isPlayingAtom,
  selectionAtom,
  volumeAtom,
} from "../atoms";
import { TextInput } from "./TextInput";
import {
  LazyMotion,
  domAnimation,
  m,
  useAnimation,
  CustomDomComponent,
  PanInfo,
  animate,
  TargetAndTransition,
} from "framer-motion";
import { createMachine } from "xstate";
import { assign } from "xstate";
import { useMachine } from "@xstate/react";
import { createTimelineMachine } from "../timelineMachine";
import { useSelectionAtom } from "../functions/useSelectionAtom";
import { StepInput } from "./StepInput";
import { useBip } from "../functions/useBip";
import { Timeline } from "./Timeline";
import { makeDelay, getSum, getId } from "../functions/utils";
import { BipItem } from "../types";
import { BipInfos, useBipInfos } from "../functions/useBipInfos";
import { useEffect } from "react";

export const BipCircuit = (props: BoxProps) => {
  const [shouldPlay, setShouldPlay] = useState(false);
  //   console.log({ shouldPlay });

  return (
    <Box pos="relative" borderWidth="4px" boxSize="100%" p="8" {...props}>
      <Center>
        <BipForm />
      </Center>
    </Box>
  );
};

// const initial = [makeDelay()];

const BipForm = () => {
  //   const [items, actions] = useSelection<BipItem>({ getId, initial });
  const defaultStepValue = useAtomValue(defaultStepValueAtom);
  const [items, actions] = useSelectionAtom<BipItem>(selectionAtom, { getId });
  const append = () => actions.add(makeDelay(defaultStepValue));
  const ctxRef = useRef<BipInfos>();
  const { duration, percentItems } = useBipInfos(ctxRef);

  const controls = useAnimation();

  const bip = useBip();
  const onReachStep = () => bip();

  const stopWatchRef = useRef<HTMLElement>();
  const totalRef = useRef<HTMLElement>();
  const loopTo = useAtomValue(defaultLoopCountAtom);

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
  //   console.log({
  //     items,
  //     points,
  //     percents,
  //     duration,
  //     elapsedTime: state.context.elapsedTime,
  //     state,
  //   });
  //   console.log({
  //     value: state.value,
  //     ctx: state.context,
  //     reftime: state.context.ref.elapsedTime,
  //   });
  const play = () => send("START");
  const stop = () => send("STOP");
  const pause = () => send("PAUSE");
  const playOrPause = () =>
    state.matches("started.playing") ? pause() : play();

  return (
    <Stack w="100%" maxW="700px">
      <SimpleGrid
        columns={4}
        spacing="20px"
        spacingY="80px"
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
            actions={actions}
            percents={percentItems}
            duration={duration}
            controls={controls}
            // onAnimationComplete={(def: any) => console.log(def) && def.transition.duration > 0 && send("END")}
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
