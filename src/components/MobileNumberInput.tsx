import {
  Button,
  HStack,
  Input,
  useNumberInput,
  UseNumberInputProps,
} from "@chakra-ui/react";

export function MobileNumberInput(props: UseNumberInputProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput(props);

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Button size="sm" {...dec}>
        -
      </Button>
      <Input maxW="65px" {...input} />

      <Button size="sm" {...inc}>
        +
      </Button>
    </HStack>
  );
}
