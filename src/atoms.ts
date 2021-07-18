import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { BipItem } from "./types";

// TODO rm
export const isPlayingAtom = atom(false);

export const volumeAtom = atomWithStorage("bip/volume", 0.2);
export const selectionAtom = atom([] as BipItem[]);

export const defaultStepUpdateAtom = atomWithStorage(
  "bip/defaultStepUpdate",
  1
);
export const defaultStepValueAtom = atomWithStorage("bip/defaultStepValue", 2);
export const defaultLoopCountAtom = atomWithStorage("bip/defaultLoopCount", 5);
