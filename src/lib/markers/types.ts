import type { Double } from 'mongodb';

export type MarkerDTO = {
  type: string;
  position: [Double, Double, Double];
  name?: string;
  level?: number;
  description?: string;
  userId?: string;
  username: string;
  screenshotFilename?: string;
  comments?: number;
  createdAt: Date;
};
