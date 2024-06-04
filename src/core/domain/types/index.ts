export type ObjectValues<T> = T[keyof T];

export type Position = number[];

export type Point = {
	type: 'Point';
	coordinates: Position;
};

export type MultiPolygon = {
	type: 'MultiPolygon';
	coordinates: Position[][][];
};
