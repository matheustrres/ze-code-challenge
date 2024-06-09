import mongoose from 'mongoose';

import { type MultiPolygon, type Point } from '@/@core/domain/types';

export type PartnerModel = {
	id: number;
	ownerName: string;
	tradingName: string;
	document: string;
	coverageArea: MultiPolygon;
	address: Point;
	createdAt: Date;
};

const pointSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['Point'],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	{ _id: false },
);

const multiPolygonSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['MultiPolygon'],
			required: true,
		},
		coordinates: {
			type: [[[[Number]]]],
			required: true,
		},
	},
	{ _id: false },
);

export const partnerSchema = new mongoose.Schema<PartnerModel>({
	id: {
		type: Number,
		required: true,
		unique: true,
		index: {
			unique: true,
		},
	},
	ownerName: {
		type: String,
		required: true,
	},
	tradingName: {
		type: String,
		required: true,
	},
	document: {
		type: String,
		required: true,
		unique: true,
		index: {
			unique: true,
		},
	},
	coverageArea: {
		type: multiPolygonSchema,
		required: true,
		index: '2dsphere',
	},
	address: {
		type: pointSchema,
		required: true,
	},
});

export const PartnerModel = mongoose.model('partners', partnerSchema);
