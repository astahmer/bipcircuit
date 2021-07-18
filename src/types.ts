export type BipItemWithPercent = BipItem & { percent: number };
export interface BipItem {
  id: string;
  delay: number;
}
