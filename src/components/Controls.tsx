import {
  Button,
  chakra,
  SimpleGrid,
  Stack,
  useColorMode,
  UseNumberInputProps,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
  defaultLoopCountAtom,
  defaultStepUpdateAtom,
  defaultStepValueAtom,
} from "../atoms";
import { useIsMobile } from "../functions/utils";
import { MobileNumberInput } from "./MobileNumberInput";
import { VolumeSlider } from "./VolumeSlider";

export function Controls() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [defaultStepValue, setDefaultStepValue] = useAtom(defaultStepValueAtom);
  const [defaultStepUpdate, setDefaultStepUpdate] = useAtom(
    defaultStepUpdateAtom
  );
  const [defaulLoopCount, setDefaulLoopCount] = useAtom(defaultLoopCountAtom);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Stack>
        <Button onClick={toggleColorMode}>Color mode: {colorMode}</Button>
        <SimpleGrid columns={2} alignItems="center" spacingX="20px">
          <NumberInputWithLabel
            label="Délai d'étape"
            min={0}
            defaultValue={defaultStepValue}
            onChange={(_, nb) => setDefaultStepValue(nb)}
          />
          <NumberInputWithLabel
            label="Augmente de X"
            min={1}
            defaultValue={defaultStepUpdate}
            onChange={(_, nb) => setDefaultStepUpdate(nb)}
          />
          <NumberInputWithLabel
            label="Nb de boucles"
            min={1}
            defaultValue={defaulLoopCount}
            onChange={(_, nb) => setDefaulLoopCount(nb)}
          />
          <VolumeSlider />
        </SimpleGrid>
      </Stack>
    );
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      spacing="60px"
    >
      <Button onClick={toggleColorMode}>Color mode: {colorMode}</Button>
      <NumberInputWithLabel
        label="Délai d'étape par défaut"
        min={0}
        defaultValue={defaultStepValue}
        onChange={(_, nb) => setDefaultStepValue(nb)}
      />
      <NumberInputWithLabel
        label="Augmente de X"
        min={1}
        defaultValue={defaultStepUpdate}
        onChange={(_, nb) => setDefaultStepUpdate(nb)}
      />
      <NumberInputWithLabel
        label="Nb de boucles"
        min={1}
        defaultValue={defaulLoopCount}
        onChange={(_, nb) => setDefaulLoopCount(nb)}
      />
      <VolumeSlider />
    </Stack>
  );
}

const NumberInputWithLabel = ({
  label,
  ...props
}: UseNumberInputProps & { label: string }) => (
  <Stack>
    <chakra.span>{label}</chakra.span>
    <MobileNumberInput {...props} />
  </Stack>
);
