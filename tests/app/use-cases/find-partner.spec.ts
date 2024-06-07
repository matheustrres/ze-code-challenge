import { deepStrictEqual, rejects } from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { PartnerNotFoundError } from '@/app/errors/partner-not-found';
import { FindPartnerByIdUseCase } from '@/app/use-cases/find-partner';

import { PartnerBuilder } from '#/data/builders/entities/partner';
import {
	type MockedPartnersRepository,
	makeMockedPartnersRepository,
} from '#/data/mocks/repositories/partners-repository';

type SUT = {
	partnersRepository: MockedPartnersRepository;
	useCase: FindPartnerByIdUseCase;
};

function makeSUT(): SUT {
	const partnersRepository = makeMockedPartnersRepository();

	return {
		partnersRepository,
		useCase: new FindPartnerByIdUseCase(partnersRepository),
	};
}

describe('FindPartnerById use case', () => {
	let sut: SUT;

	beforeEach(() => {
		sut = makeSUT();
	});

	it('should throw if no partner is found through given ID', () => {
		sut.partnersRepository.findById.mock.mockImplementationOnce(() => null);

		rejects(
			() =>
				sut.useCase.exec({
					id: 1,
				}),
			PartnerNotFoundError.byId(1),
		);
	});

	it('should find a partner by given ID', async () => {
		const partner = new PartnerBuilder().build();

		sut.partnersRepository.findById.mock.mockImplementationOnce(() => partner);

		const { partner: foundPartner } = await sut.useCase.exec({
			id: partner.id.toNumber(),
		});

		deepStrictEqual(foundPartner, partner);
	});
});
