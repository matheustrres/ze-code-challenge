import { rejects } from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { PartnerFoundError } from '@/application/errors/partner-found';
import { CreatePartnerUseCase } from '@/application/use-cases/create-partner';

import { DocumentError } from '@/domain/errors/document';

import { PartnerBuilder } from '#/data/builders/entities/partner';
import {
	type InMemoryPartnersRepository,
	makeInMemoryPartnersRepository,
} from '#/data/repositories/in-memory/partners-repository';

type SUT = {
	partnersRepository: InMemoryPartnersRepository;
	useCase: CreatePartnerUseCase;
};

function makeSUT(): SUT {
	const partnersRepository = makeInMemoryPartnersRepository();

	return {
		partnersRepository,
		useCase: new CreatePartnerUseCase(partnersRepository),
	};
}

describe('CreatePartner use case', () => {
	let sut: SUT;

	beforeEach(() => {
		sut = makeSUT();
	});

	it('should throw if entered document is already in use by another partner', async () => {
		const partner = new PartnerBuilder().build();

		await sut.partnersRepository.upsert(partner);

		const document = partner.getProps().document.props.value;

		rejects(
			() =>
				sut.useCase.exec({
					ownerName: 'John Doe',
					tradingName: 'Zé Delivery',
					address: [30, 30],
					coverageArea: [],
					document,
				}),
			PartnerFoundError.byDocument(document),
		);
	});

	it('should throw if entered document is invalid', async () => {
		rejects(
			() =>
				sut.useCase.exec({
					ownerName: 'John Doe',
					tradingName: 'Zé Delivery',
					address: [30, 30],
					coverageArea: [],
					document: '11257245286',
				}),
			new DocumentError('Invalid CPF value.'),
		);
	});
});
