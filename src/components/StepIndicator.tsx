import { Box, BoxProps, chakra } from "@chakra-ui/react";

export function StepIndicator({
  bgColor,
  borderColor = "red",
  index,
  withIndex,
  withMiddleBar,
  ...props
}: BoxProps & { index: number; withIndex?: boolean; withMiddleBar?: boolean }) {
  return (
    <Box
      padding="10px"
      pos="relative"
      h="30px"
      borderWidth={1}
      borderColor={borderColor}
      boxSizing="content-box"
      // opacity={0.1}
      // transition="opacity 0.2s"
      userSelect="none"
      {...props}
      top="calc(50% - 15px - 10px)" //-15px from height/2 -10px from padding
    >
      {withMiddleBar && (
        <Box
          bgColor={bgColor}
          width="2px"
          h="100%"
          border="1px solid blue"
          m="auto"
        />
      )}
      {withIndex && (
        <chakra.span
          pos="absolute"
          top="calc(100% + 5px)"
          left="50%"
          transform="translateX(-50%)"
        >
          {index}
        </chakra.span>
      )}
    </Box>
  );
}
