import {
  chakra,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { volumeAtom } from "../atoms";

export const VolumeSlider = (props: StackProps) => {
  const [volume, setVolume] = useAtom(volumeAtom);

  const onChange = (value: number) => setVolume(value / 100);

  return (
    <Stack {...props} alignItems="center">
      <chakra.span>Volume {`(${Math.round(volume * 100)}/100)`}</chakra.span>
      <Slider defaultValue={volume * 100} onChange={onChange} maxW="200px">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Stack>
  );
};
