import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { BipItem } from "../types";

export const MotionBox = motion<BoxProps>(Box);

export const playSound = (sound: string, volume: number) => {
  const audio = new Audio(sound);
  audio.volume = volume;
  audio.play();
};

export function areRectsIntersecting(a: DOMRect, b: DOMRect) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}

export const getSum = (arr: number[]) =>
  arr.reduce((acc, item) => acc + item, 0);

export const makeId = (length = 12) => nanoid(length);
export const makeDelay = (delay: number) => ({ id: makeId(), delay });
export const getId = (item: BipItem) => item.id;
export const getClosestIn = (arr: number[], to: number) =>
  arr.reduce((prev, curr) =>
    Math.abs(curr - to) < Math.abs(prev - to) ? curr : prev
  );
