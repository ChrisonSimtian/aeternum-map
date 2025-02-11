import type { Double } from 'mongodb';

export type MarkerRouteDTO = {
  name: string;
  userId: string;
  username: string;
  isPublic: boolean;
  positions: [Double, Double][];
  markersByType: {
    [type: string]: number;
  };
  createdAt: Date;
  updatedAt: Date;
};
