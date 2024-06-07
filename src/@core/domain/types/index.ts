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

export type Location = {
	lat: number;
	lng: number;
};

export type DatabaseConfig = {
	auth: {
		user: string;
		pwd: string;
	};
	name: string;
	port: number;
	URI: string;
};
