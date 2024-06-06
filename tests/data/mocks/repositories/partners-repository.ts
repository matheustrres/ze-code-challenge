import { mock, type Mock } from 'node:test';

import { type MockedCoreRepository } from './repository';

import { type PartnersRepository } from '@/application/partners-repository';

import { type Partner } from '@/domain/entities/partner';

export type MockedPartnersRepository = MockedCoreRepository<Partner> & {
	findByDocument: Mock<PartnersRepository['findByDocument']>;
	findNearestByLocation: Mock<PartnersRepository['findNearestByLocation']>;
};

export function makeMockedPartnersRepository(): MockedPartnersRepository {
	return {
		delete: mock.fn(),
		find: mock.fn(),
		findByDocument: mock.fn(),
		findById: mock.fn(),
		findNearestByLocation: mock.fn(),
		upsert: mock.fn(),
	};
}
