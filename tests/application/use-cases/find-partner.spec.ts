import { rejects } from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { PartnerNotFoundError } from '@/application/errors/partner-not-found';
import { FindPartnerByIdUseCase } from '@/application/use-cases/find-partner';

import {
	type InMemoryPartnersRepository,
	makeInMemoryPartnersRepository,
} from '#/data/repositories/in-memory/partners-repository';

type SUT = {
	partnersRepository: InMemoryPartnersRepository;
	useCase: FindPartnerByIdUseCase;
};

function makeSUT(): SUT {
	const partnersRepository = makeInMemoryPartnersRepository();

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
		rejects(
			() =>
				sut.useCase.exec({
					id: 'invalid_partner_uuid',
				}),
			PartnerNotFoundError.byId('invalid_partner_uuid'),
		);
	});
});
