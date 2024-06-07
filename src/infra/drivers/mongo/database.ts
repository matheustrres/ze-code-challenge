import { type Mongoose, connect } from 'mongoose';

import { dbConfig } from '@/shared/config/database';
import { Logger } from '@/shared/utils/logger';

export class Database {
	static readonly logger = new Logger('DATABASE');

	static #instance: Mongoose | null = null;

	private constructor() {}

	static async connect() {
		return this.#getConnection() ?? this.#createConnection();
	}

	static async disconnect(): Promise<void> {
		if (Database.#instance) {
			try {
				await Database.#instance.connection.close();
				Database.#resetConnection();

				Database.logger.info('MongoDB connection closed.');
			} catch (error) {
				Database.logger.error(
					`Error closing the database connection: ${error}`,
				);

				throw error;
			}
		} else {
			Database.logger.info('MongoDB connection closed.');
		}
	}

	static #getConnection(): Mongoose | null {
		return Database.#instance;
	}

	static async #createConnection() {
		try {
			Database.#instance = await connect(dbConfig.URI, {
				serverSelectionTimeoutMS: 30_000,
				socketTimeoutMS: 45_000,
				connectTimeoutMS: 30_000,
			});

			Database.logger.info('Connection established.');

			this.#addConnectionHandlers(Database.#instance);

			return Database.#instance;
		} catch (error) {
			Database.logger.error(`Error connection to MongoDB: ${error}`);

			throw error;
		}
	}

	static #addConnectionHandlers(mongoose: Mongoose): void {
		mongoose.connection.on('open', () =>
			Database.logger.info('MongoDB connection opened.'),
		);

		mongoose.connection.on('error', (err) =>
			Database.logger.error(`MongoDB connection error: ${err}`),
		);

		mongoose.connection.on('disconnected', () =>
			Database.logger.warn('MongoDB connection disconnected.'),
		);
	}

	static #resetConnection(): void {
		Database.#instance = null;
	}
}
