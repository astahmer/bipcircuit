import { Box, chakra, Flex, useColorModeValue } from "@chakra-ui/react";
import { chunk, makeArrayOf, SelectionActions } from "@pastable/core";
import { useRef, useState } from "react";
import { AnimationControls, VisualElementLifecycles } from "framer-motion";
import { Marker } from "./Marker";
import { StepIndicator } from "./StepIndicator";
import { BipItem, BipItemWithPercent } from "../types";
import { ProgressIndicator } from "./ProgressIndicator";

const timelineWidth = 700;
export function Timeline({
  percents,
  controls,
  duration,
  actions,
}: {
  percents: Array<BipItemWithPercent>;
  controls: AnimationControls;
  duration: number;
  actions: SelectionActions<BipItem>;
}) {
  const constraintsRef = useRef(null);
  const trackRef = useRef(null);
  const bgColor = useColorModeValue("orange", "yellow");
  const stepsWrapperRef = useRef<HTMLDivElement>();
  const oui = makeArrayOf(Math.ceil(duration)).map((_, i) => i);
  const halves = makeArrayOf(Math.ceil(duration * 2)).map((_, index) => index);
  const chunks = [
    halves.slice(0, 1),
    ...chunk(halves.slice(1), 2),
    halves.length > 2 ? halves.slice(-2, 1) : [],
  ].filter((chunk) => chunk.length);
  console.log(halves, chunks);

  return (
    <Box w={timelineWidth + "px"} pos="relative" ref={trackRef}>
      <Box
        pos="absolute"
        w={timelineWidth + 30 + "px"}
        ref={constraintsRef}
        top="0"
        left="-15px"
        h="100%"
      />
      <Box bgColor="twitter.100" h="2px" w="100%" />
      {/* <Flex
        ref={stepsWrapperRef}
        pos="absolute"
        top="50%"
        transform="translateY(-50%)"
        w="100%"
      >
        {makeArrayOf(Math.ceil(duration + 1)).map((_, index, arr) => (
          <StepIndicator
            key={index}
            bgColor={bgColor}
            index={index}
            withIndex
            w={index === 0 || index === duration ? "50%" : "100%"}
          />
        ))}
      </Flex> */}
      {/* {duration && (
          <chakra.span pos="absolute" top="100%" right="0" userSelect="none">
            {duration}
          </chakra.span>
        )} */}
      <Flex
        ref={stepsWrapperRef}
        pos="absolute"
        top="50%"
        transform="translateY(-50%)"
        w="100%"
      >
        {chunks.map((chunk, chunkIndex) => (
          <Flex
            key={chunkIndex}
            w={chunk.length > 1 ? "100%" : "50%"}
            opacity={0}
            transition="opacity 0.2s"
            pos="relative"
          >
            {chunk.map((step, index) => (
              <StepIndicator
                key={step}
                bgColor={"green"}
                borderColor={"green"}
                borderLeftWidth={index === 0 ? 1 : 0}
                borderRightWidth={index === 1 || chunk.length === 1 ? 1 : 0}
                // withMiddleBar
                index={oui[step / 2]}
                // withIndex={!Boolean(index % 2)}
                withIndex={false}
                // withIndex
                w="100%"
              />
            ))}
            <chakra.span
              pos="absolute"
              top="calc(100% + 5px)"
              left="50%"
              transform="translateX(-50%)"
            >
              {chunkIndex}
            </chakra.span>
          </Flex>
        ))}
      </Flex>
      {/* <Flex
        // ref={stepsWrapperRef}
        pos="absolute"
        top="100%"
        // transform="translateY(-50%)"
        w="100%"
      >
        {makeArrayOf(Math.ceil(duration * 2)).map((_, index) => (
          <StepIndicator
            key={index}
            bgColor={"green"}
            borderColor={"green"}
            // withMiddleBar
            index={oui[index / 2]}
            // withIndex={!Boolean(index % 2)}
            withIndex={false}
            w="100%"
          />
        ))}
      </Flex> */}
      {trackRef.current &&
        percents.map((item) => (
          <Marker
            key={item.id}
            id={item.id}
            percent={item.percent}
            width={8}
            bgColor={bgColor}
            constraintsRef={constraintsRef}
            trackRef={trackRef}
            actions={actions}
            duration={duration}
            stepsWrapperRef={stepsWrapperRef}
          />
        ))}
      <ProgressIndicator
        controls={controls}
        duration={duration}
        // onAnimationComplete={onAnimationComplete}
      />
    </Box>
  );
}
