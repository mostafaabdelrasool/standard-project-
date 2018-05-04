import { Position } from './position';
import { Cartesian } from './ac-entity';

export interface Waypoint {
  longitude: number;
  latitude: number;
  clock?: number;
  alt?: number;
  name: string;
  groundspeed?: number;
  position?: Cartesian[];
}
