import { type ObjectValues } from '../types';

export const NODE_ENV = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
	TESTING: 'testing',
} as const;

export type NODE_ENV = ObjectValues<typeof NODE_ENV>;
