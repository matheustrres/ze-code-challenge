import { rejects } from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { PartnerNotFoundError } from '@/application/errors/partner-not-found';
import { SearchNearestPartnerUseCase } from '@/application/use-cases/search-nearest-partner';

import {
	type MockedPartnersRepository,
	makeMockedPartnersRepository,
} from '#/data/builders/mocks/repositories/partners-repository';

type SUT = {
	partnersRepository: MockedPartnersRepository;
	useCase: SearchNearestPartnerUseCase;
};

function makeSUT(): SUT {
	const partnersRepository = makeMockedPartnersRepository();

	return {
		partnersRepository,
		useCase: new SearchNearestPartnerUseCase(partnersRepository),
	};
}

describe('SearchNearestPartner use case', () => {
	let sut: SUT;

	beforeEach(() => {
		sut = makeSUT();
	});

	it('should throw if no partner coverage area covers given location', () => {
		const location = {
			lat: 48.862725,
			lng: 2.287592,
		};

		sut.partnersRepository.findNearestByLocation.mock.mockImplementationOnce(
			() => null,
		);

		rejects(
			() => sut.useCase.exec(location),
			PartnerNotFoundError.byLocation(location),
		);
	});
});
