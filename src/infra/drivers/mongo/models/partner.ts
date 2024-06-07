import mongoose from 'mongoose';

import { type MultiPolygon, type Point } from '@/@core/domain/types';

export type PartnerWithId = {
	id: number;
	ownerName: string;
	tradingName: string;
	document: string;
	coverageArea: MultiPolygon;
	address: Point;
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

export const partnerSchema = new mongoose.Schema<PartnerWithId>(
	{
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
		},
		address: {
			type: pointSchema,
			required: true,
		},
	},
	{
		_id: false,
	},
);

export const PartnerModel = mongoose.model('partners', partnerSchema);
