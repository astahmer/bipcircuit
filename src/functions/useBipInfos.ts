import { useAtomValue } from "jotai/utils";
import { MutableRefObject } from "react";
import { selectionAtom } from "../atoms";
import { BipItem } from "../types";
import { getSum } from "./utils";

export const useBipInfos = (ctxRef: MutableRefObject<any>) => {
  const items = useAtomValue(selectionAtom);

  const delays = items.map((item) => item.delay);
  const timePoints: number[] = delays.reduce(
    (acc, value) =>
      acc.length ? [...acc, getSum(acc.slice(-1)) + value] : [value],
    []
  );
  const duration = timePoints[timePoints.length - 1] || 0;
  const percents = timePoints.map((value) => (value / duration) * 100);
  const percentItems = percents.map((percent, index) => ({
    ...items[index],
    percent,
  }));

  const ctx = { items, duration, percentItems, delays, timePoints };
  ctxRef.current = ctx;
  // console.log(ctx);
  return ctx;
};

export interface BipInfos {
  items: BipItem[];
  duration: any;
  percentItems: any;
  delays: number[];
  timePoints: number[];
}
