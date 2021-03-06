import { Box, BoxProps, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { BipItem } from "../types";
import bipSound from "/bip.mp3";

export const MotionBox = motion<BoxProps>(Box);

const audio = new Audio(bipSound);
audio.load();

export const playSound = async (sound: string, volume: number) => {
  audio.currentTime = 0;
  audio.volume = volume;

  try {
    audio.play();
    console.log("play");
  } catch (error) {
    console.log(error);
  }
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

export const useIsMobile = () => {
  const [isMobile] = useMediaQuery("(max-width: 1030px)");
  return isMobile;
};

export const playBip = () =>
  playSound(bipSound, Number(localStorage.getItem("bip/volume") || 0.5));
