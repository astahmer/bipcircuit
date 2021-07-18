import { Selection, useSelection, UseSelectionProps } from "@pastable/core";
import { WritableAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";

export const useSelectionAtom = <T = any>(
  atom: WritableAtom<Array<T>, Array<T>>,
  props: UseSelectionProps<T>
) => {
  const updateAtom = useUpdateAtom(atom);
  const [selection, actions] = useSelection({
    ...props,
    onUpdate: (value) => updateAtom(value as any),
  });

  return [selection, actions] as Selection<T>;
};
