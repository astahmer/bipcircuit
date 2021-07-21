import { Box, BoxProps, usePrevious } from "@chakra-ui/react";
import { last, makeArrayOf, SelectionActions, SetState } from "@pastable/core";
import { useAtomValue } from "jotai/utils";
import { useRef } from "react";
import { useMotionValue, useTransform, useDragControls } from "framer-motion";
import { useEffect } from "react";
import { MutableRefObject } from "react";
import { selectionAtom } from "../atoms";
import {
  MotionBox,
  areRectsIntersecting,
  getClosestIn,
} from "../functions/utils";
import { BipItemWithPercent, BipItem } from "../types";

// TODO mauvais initialX, correspond à des sections avec tjrs la même distance, en % actuellement
// devrait être  1 1 3 2 1 4 1 par ex donc 1 1 + rapproché que 1 3

// même chose pour les stepindicator
// TODO animation clignotement/scale quand modif valeur de l'input sur le marker correspondant
// et TODO "focus ring" / border sur l'item correspondant quand on drag le marker associé

const padding = 10;
const height = 20;
const borderWidth = 1;
const scaleWhileHover = 1.6;

//   TODO drag vers le bas pour delete le marker
export function Marker({
  duration,
  trackRef,
  constraintsRef,
  stepsWrapperRef,
  percent,
  id,
  width,
  bgColor,
  actions,
}: Pick<BipItemWithPercent, "id" | "percent"> &
  Pick<BoxProps, "width" | "bgColor"> & {
    duration: number;
    constraintsRef: MutableRefObject<HTMLDivElement>;
    trackRef: MutableRefObject<HTMLDivElement>;
    stepsWrapperRef: MutableRefObject<HTMLDivElement>;
    width: BoxProps["width"];
    actions: SelectionActions<BipItem>;
  }) {
  const trackWidth = trackRef.current.getBoundingClientRect().width;
  const offset = Number(width) * 2;
  const initialX = trackWidth * (percent / 100) - offset;

  // Position self at initialX
  useEffect(() => {
    x.set(initialX);
    console.log({ percent, trackWidth, initialX }, items.length);
  }, [initialX]);

  const x = useMotionValue(initialX);
  // console.log({ percent, initialX });

  const ref = useRef<HTMLDivElement>();
  const items = useAtomValue(selectionAtom);
  const lastItem = last(items);
  const isLast = lastItem.id === id;
  const canDrag = items.length > 1 && !isLast;

  const hoveredStep = useRef<HTMLDivElement>();

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top={`calc(50% - ${height / 2}px - ${padding}px)`}
      padding={`${padding}px`}
      borderWidth={borderWidth}
      // borderColor="red"
      cursor={canDrag ? "pointer" : undefined}
      boxSizing="content-box"
      pointerEvents={isLast ? "none" : undefined}
      style={{ x }}
      drag={canDrag ? "x" : false}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{
        bounceStiffness: 10,
        timeConstant: 100,
        modifyTarget: (target) => {
          // const section = trackWidth / 10;
          // const update = Math.round(target / section) * section - 15;
          // const sectionPercentage = 100 / (items.length + 1) / 100;
          // const section = trackWidth * sectionPercentage;
          // const update =
          //   Math.round(target / section) * section -
          //   section / 2 -
          //   Number(width) * 2;
          const sectionPercentage = 100 / duration / 100;
          const section = trackWidth * sectionPercentage;
          const sectionList = makeArrayOf(Math.ceil(duration) + 1).map((_, i) =>
            Math.round(i * section)
          );

          const halfsSections = sectionList.flatMap((item) => [
            item,
            item + section / 2,
          ]);
          const current = {
            get: x.get(),
            previous: x.getPrevious(),
            v: x.getVelocity(),
          };
          const targetCenter = target + offset;

          // console.log(sectionList, {
          //   current,
          //   targetCenter,
          //   closest: getClosestIn(sectionList, targetCenter),
          //   section,
          //   sectionPercentage,
          //   offset,
          //   halfsSections,
          // });
          // const update =
          //   sectionList.find((value) => value > target) - section / 2 - offset;
          const update = getClosestIn(sectionList, targetCenter) - offset;
          // console.log(target, update);
          // console.log("modifyTargetmodifyTargetmodifyTargetmodifyTarget");
          return update;
        },
      }}
      onDrag={
        ((event, info) => {
          const markerRect = ref.current.getBoundingClientRect();
          markerRect.width =
            markerRect.width -
            (padding * scaleWhileHover) / 2 -
            (borderWidth * scaleWhileHover) / 2;

          const intersectingStepIndex = [
            ...stepsWrapperRef.current.children,
          ].findIndex((el) =>
            areRectsIntersecting(el.getBoundingClientRect(), markerRect)
          );
          const intersectingStep = stepsWrapperRef.current.children.item(
            intersectingStepIndex
          ) as HTMLDivElement;
          if (hoveredStep.current) {
            hoveredStep.current.style.opacity = String(0.1);
          }
          hoveredStep.current = intersectingStep;
          if (intersectingStep) {
            intersectingStep.style.opacity = String(1);
          }

          // console.log(
          //     stepsRects.some((rect) => areRectsIntersecting(rect, markerRect)),
          //     // markerRect,
          // //   stepsWrapperRef.current,
          // //   stepsRects
          // );
          // stepsWrapperRef
        }) as any
      }
      // onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        if (hoveredStep.current) {
          hoveredStep.current.style.opacity = String(0.1);
        }
        //     const durationMap = trackRef.current
        // ? makeArrayOf(Math.ceil(duration) + 1).map((_, i) => i)
        // : [];
        // check collision avec ref puis set duration à durationMap[index]
      }}
      // onDragTransitionEnd={() => console.log(x.get())}
      // backgroundColor: "blue",
      //   whileDrag={{ scale: 1.6, zIndex: 10 }}
      whileDrag={{ scale: scaleWhileHover, zIndex: 1 }}
    >
      <Box
        // w="100%"
        width={`${width}px`}
        h={`${height}px`}
        bgColor={bgColor}
        // bgColor={isDragging ? "twitter.500" : bgColor}
        // zIndex={isDragging ? 10 : undefined}
      />
    </MotionBox>
  );
}
