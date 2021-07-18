import { Box, IconButton } from "@chakra-ui/react";
import { useAtomValue } from "jotai/utils";
import { ImCross } from "react-icons/im";
import { defaultStepUpdateAtom, defaultStepValueAtom } from "../atoms";
import { MobileNumberInput } from "./MobileNumberInput";

export function StepInput({
  update,
  remove,
  value,
}: {
  update: (nb: number) => void;
  remove: () => void;
  value: number;
}) {
  const defaultStepValue = useAtomValue(defaultStepValueAtom);
  const defaultStepUpdate = useAtomValue(defaultStepUpdateAtom);
  const numberInputProps = {
    min: 0,
    precision: 1,
    step: defaultStepUpdate,
    defaultValue: defaultStepValue,
    onChange: (value: string) => update(Number(value)),
  };
  // console.log({ value });
  // TODO virer value et use react-hook-form setValue

  return (
    <Box pos="relative">
      <MobileNumberInput {...numberInputProps} value={value} />
      <Box pos="absolute" left="50%" transform="translateX(-50%)" top="100%">
        <IconButton
          size="xs"
          colorScheme="red"
          aria-label="Delete"
          w="100%"
          icon={<ImCross />}
          onClick={() => remove()}
        />
      </Box>
    </Box>
  );
}
