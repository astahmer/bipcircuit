import { useAtomValue } from "jotai/utils";
import { volumeAtom } from "../atoms";
import { playSound } from "./utils";

import bipSound from "/bip.mp3";

export const useBip = () => {
  const volume = useAtomValue(volumeAtom);
  return () => playSound(bipSound, volume);
};
