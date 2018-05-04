import { Waypoint } from './waypoint';
export interface Cartesian {
    x: number;
    y: number;
    z: number;
}

export interface Orientation {
    x: number;
    y: number;
    z: number;
    w: number;
}
export interface Geographic {
    lat: number;
    lng: number;
    alt: number;
}
export interface EntityData {
    alt?: number;
    text?: string;
    position?: Cartesian;
    rotation?: number;
    orientation?: Orientation;
    positions?: Cartesian[];
    geographic?: Geographic;
    show?: boolean;
    squawk?: string;
    gs?: number;
    orig?: string;
    dest?: string;
    waypoints?: Waypoint;
}

