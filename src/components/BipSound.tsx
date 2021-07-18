import { Button } from "@chakra-ui/react";
import { AnyFunction } from "@pastable/core";
import { useAtomValue } from "jotai/utils";
import { useState } from "react";
import Sound from "react-sound";
import { volumeAtom } from "../atoms";
import bipSound from "/bip.mp3";

export function BipSound({
  isPlaying: isPlayingProp,
  onFinishedPlaying,
}: {
  isPlaying?: boolean;
  onFinishedPlaying?: AnyFunction;
}) {
  const [localPlaying, setLocalPlaying] = useState(false);
  const isControlled = typeof isPlayingProp !== "undefined";
  const isPlaying = isControlled ? isPlayingProp : localPlaying;
  const volume = useAtomValue(volumeAtom);
  console.log({ shouldPlay: isPlaying, isPlayingProp, localPlaying });

  return (
    <>
      <Sound
        volume={volume * 100}
        url={bipSound}
        playStatus={isPlaying ? "PLAYING" : "STOPPED"}
        onFinishedPlaying={() => {
          setLocalPlaying(false);
          onFinishedPlaying?.();
        }}
        autoLoad
      />
      {!isControlled && (
        <Button onClick={() => setLocalPlaying((current) => !current)}>
          {isPlaying ? "stop" : "play"}
        </Button>
      )}
    </>
  );
}
