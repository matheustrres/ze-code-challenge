import { type DatabaseConfig } from '@/core/domain/types';

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DATABASE, MONGODB_PORT } =
	process.env;

export const dbConfig: DatabaseConfig = {
	auth: {
		user: MONGODB_USER as string,
		pwd: MONGODB_PASSWORD as string,
	},
	name: MONGODB_DATABASE as string,
	port: Number(MONGODB_PORT as string),
	URI: `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@localhost:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=admin`,
};
